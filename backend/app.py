from flask import Flask, jsonify
# import models.tex
from .models.parser.parser import parse_and_categorize_resumes

app = Flask(__name__)

@app.route("/")
def hello_world():
    return jsonify(parse_and_categorize_resumes("data/demo.pdf"))