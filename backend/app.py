# import models.tex
from .models.parser.parser import parse_and_categorize_resumes
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from .models.convex.main import *
import uuid


app = Flask(__name__)
CORS(app, resources={r"/upload/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = './data/uploads'
ALLOWED_EXTENSIONS = {'pdf'}


@app.route("/")
def hello_world():
    return jsonify(parse_and_categorize_resumes("data/demo.pdf"))

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        data = parse_and_categorize_resumes(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        return jsonify({'message': f'{filename} uploaded successfully', 'data' : data}, 200)
    
@app.route('/create_user', methods=['POST'])
def create_user_route():
    data = request.get_json()

    # Insert data into the database
    user_id = uuid.uuid4()
    create_user(user_id, data['details']['name'])
    resume_id = uuid.uuid4()
    create_resume(user_id, resume_id)
    create_details(resume_id, data['details']['name'], data['details']['phone'], data['details']['email'], data['details']['linkedin'], data['details']['github'])
    for education in data['education']:
        create_education(resume_id, education['level_of_education'], education['school'], education['field_of_study'], education['school_location'], education['from_date'], education['to_date'])
    for experience in data['experience']:
        create_experiences(resume_id, experience['company'], experience['position'], experience['date'], experience['responsibilities'], experience['from_date'], experience['to_date'])
    for project in data['projects']:
        create_projects(resume_id, project['title'], project['description'], project['technologies'])
    for skill in data['skills']:
        create_skills(resume_id, skill['skill'])

@app.route('/getJobs')
def get_jobs():
    # Call the relevant methods to get the description of the jobs from the database
    return results

@app.route('/getResume')
def get_resume():
    # Call the relevant methods to get the resume from the database
    return profile
    

@app.route('/coverLetter')
def get_cover_letter():
    """
        Return me the cover letter
    """
    pass

@app.route("/createJSON", methods=['POST'])
def create_json():
    """
        Create a json file
    """
    data = request.get_json()
    print(data)
    # print("data is", data)
    # with open('./data/data.json', 'w') as f:
    #     json.dump(data, f)

    return jsonify({'message': 'File created successfully'}, 200)

if __name__ == '__main__':
    app.run(port=3001)


