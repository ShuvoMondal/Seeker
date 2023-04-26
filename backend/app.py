from flask import Flask, render_template, request
import os


# Create Flask application
app = Flask(__name__)

# Define route for homepage
@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/scrap', methods=['POST'])
def scrap():
    jobname = request.form['jobname']
    location = request.form['location']
    os.system('python indeedmasterscrape.py')
    os.system(jobname)
    os.system(location)
    return f"Job Name: {jobname}<br>Location: {location}"

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
