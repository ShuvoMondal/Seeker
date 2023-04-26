
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
# db.child('jobs-data').child('indeed-scrape-jobs').set({"name":"Tatsumi"})

def generate_url(job_title, job_location):
    url_template = "https://in.indeed.com/jobs?q={}&l={}"
    url = url_template.format(job_title, job_location)
    return url


def save_record_to_csv(record, filepath, create_new_file=False):
    """Save an individual record to file; set `new_file` flag to `True` to generate new file"""
    header = ["JobTitle", "Company", "Location", "Salary", "PostDate", "Summary", "JobUrl"]
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
    cards = soup.find_all('div', 'cardOutline')
    return cards, soup


def sleep_for_random_interval():
    seconds =  3
    sleep(seconds)

def find_next_page(soup):
    try:
        pagination = soup.find("a", {"aria-label": "Next Page"}).get("href")
        print(pagination)
        return "https://in.indeed.com" + pagination
    except AttributeError:
        return None
    

def extract_job_card_data(card):
    atag = card.h2.a
    try:
        a_tag = card.find('a', 'jcs-JobTitle' )
        job_title  = a_tag.find('span').text

    except AttributeError:
        job_title = ''
    try:
        company = card.find('a', class_='turnstileLink companyOverviewLink') or card.find('span','companyName')
        company = company.text
    except AttributeError:
        company = ''
    try:
        location = card.find('div','companyLocation').text
    except AttributeError:
        location = ''
    try:
        salary = card.find('div','salary-snippet-container').text.strip()
    except AttributeError:
        salary = 'NA'
    try:
        post_date = card.find('span', 'date').text.strip()
        post_date = post_date.replace('Posted', '').strip()
        post_date = post_date.replace('EmployerActive', '').strip()
    except AttributeError:
        post_date = ''
    try:
        job_summary = card.find('div', class_='job-snippet').text.strip()
    except AttributeError:
        job_summary = ''
    
    job_url = 'https://in.indeed.com' + atag.get('href')
    return job_title, company, location, salary,post_date,job_summary, job_url


def save_record_to_firestore(record):
    # doc_ref = collection_ref.document()
    ref = db.child('jobs-data')
    ref.push({
        'jobTitle': record[0],
        'Company': record[1],
        'Location': record[2],
        'Salary': record[3],
        'PostDate': record[4],
        'Summary': record[5],
        'jobUrl': record[6],
        "aggrigator_Type":"indeed"
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
            # sleep_for_random_interval()
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
    path = 'indeed_Jobs.csv'

    # without email settings
    main(title, loc, path)