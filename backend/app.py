# import models.tex
from .models.parser.parser import parse_and_categorize_resumes
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS


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

@app.route('/getJobs')
def get_jobs():
    # Call the relevant methods to get the description of the jobs from the database
    pass

@app.route('/resume')
def get_resume():
    # Call the relevant methods to get the resume from the database
    """
        Return me the resume pdf
        Return me the cosine score of the pdf
    """
    pass

@app.route('/coverLetter')
def get_cover_letter():
    """
        Return me the cover letter
    """
    pass

if __name__ == '__main__':
    app.run(port=3001)


