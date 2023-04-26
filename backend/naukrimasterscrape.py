
import pandas as pd 
from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep
import random, csv, re, os
import pyrebase
import json

firebaseConfig=json.load(open('firebase.json', 'r'))
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

def generate_url(job_title, job_location):
    url_template = "https://www.naukri.com/{}-jobs-in-{}"
    url = url_template.format(job_title, job_location)
    return url


def save_record_to_csv(record, filepath, create_new_file=False):
    """Save an individual record to file; set `new_file` flag to `True` to generate new file"""
    header = ['Job Title', 'Company', 'Experience Needed', 'Salary','Vacancy Link']
    if create_new_file:
        with open(filepath, mode='w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(header)
    else:
        with open(filepath, mode='a+', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(record)

def collect_job_cards_from_page(html):
    soup = BeautifulSoup(html, 'html.parser')
    cards = soup.find_all('article', 'jobTuple')
    return cards, soup


def sleep_for_random_interval():
    seconds =  3
    sleep(seconds)

def find_next_page(soup):
    try:
        pagination = soup.find("a", {"class": "fright fs14 btn-secondary br2"}).get("href")
        print(pagination)
        return "https://www.naukri.com" + pagination
    except AttributeError:
        return None
    

def extract_job_card_data(card):
    # atag = card.div.article
    try:
        a_tag = card.find('a', class_='title ellipsis') 
        job_title  = a_tag.text
    except AttributeError:
        job_title = ''
    try:
        company = card.find('a', class_='subTitle ellipsis fleft') 
        company = company.text
    except AttributeError:
        company = ''
    try:
        links = card.find('a','title ellipsis').get('href')
    except AttributeError:
        links = ''
    try:
        experience = card.find('span','ellipsis fleft expwdth').text
    except AttributeError:
        experience = ''
    try:
        salary = card.find('span','ellipsis fleft').text.strip()
    except AttributeError:
        salary = 'NA'
    return job_title,company,experience,salary,links


def save_record_to_firestore(record):

    ref = db.child('jobs-data')
    ref.push({
        'jobTitle': record[0],
        'Company': record[1],
        'Location': "",
        'PostDate': "",
        "Summary":"",
        'Experience_Needed': record[2],
        'Salary': record[3],
        'jobUrl': record[4],
        "aggrigator_Type":"naukri"
    })

def main(job_title, job_location, filepath):
    unique_jobs = set()  # track job urls to avoid collecting duplicate records
    print("Starting to scrape indeed for `{}` in `{}`".format(job_title, job_location))
    url = generate_url(job_title, job_location)
    save_record_to_csv(None, filepath, create_new_file=True)
    driver = webdriver.Firefox()
    try :
        url = generate_url(job_title, job_location)
        while True:
            print(url)
            driver.get(url)
            sleep_for_random_interval()
            html = driver.page_source
            cards, soup = collect_job_cards_from_page(html)
            for card in cards:
                record = extract_job_card_data(card)
                if not record[-1] in unique_jobs:
                    save_record_to_csv(record, filepath)
                    save_record_to_firestore(record)
                    unique_jobs.add(record[-1])
            url = find_next_page(soup)
            if not url:
                break
            sleep_for_random_interval()
    finally:
        driver.quit()
    print('Finished collecting {:,d} job postings.'.format(len(unique_jobs)))



if __name__ == '__main__':
    # job search settings
    title = input("Enter Job Title: ")
    loc = input("Enter Job location: ")
    path = 'naukri_jos.csv'

    # without email settings
    main(title, loc, path)