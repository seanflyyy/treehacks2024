#function to filter out experiences and projects
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json, subprocess
from filterOutProjectsAndExperiences import Filtering
from resumeWriter import json_to_yaml
from coverLetterGenerator import webScraper, CoverLetterGen, txtToPdf

with open('./filterOutProjectsAndExperiences/sampleDataStructure.json', 'r') as file:
    dataStruct = json.load(file)
    
job_descriptionSWE = "Currently pursuing a Degree in Electrical Engineering, Software Engineering, Computer Science / Engineering, or a related field  Strong Matlab or Python programming skills, familiarity with common python packages  Familiarity with machine learning algorithms, familiarity with robotics algorithms such as Kalman Filter, Particle Filter, SLAM. Strong training of math (probability, statistics, linear algebra)  Experience in embedded C/C++ programming, board bring-up, profiling, optimization, simulation, and various levels of testing (SW only, HW/SW integration, etc.)  Very strong mathematical skills in probability, advanced linear algebra and calculus  Good data analysis and data visualization skills would be a huge plus Experience with Ethernet or CAN communication protocols is preferred "
Filtering.ExtractAndUpdateExperiencesAndProjects(dataStruct,job_descriptionSWE)

yaml_string = json_to_yaml.convert('./filterOutProjectsAndExperiences/FilteredData.json')
# Save the YAML data to a file
with open('./resumeWriter/converted_resume.yaml', 'w') as yaml_file:
    yaml_file.write(yaml_string)

rendercv_command = 'rendercv render ./resumeWriter/converted_resume.yaml'
try:
    subprocess.run(rendercv_command, shell=True, check=True)
    print("Conversion completed. Check 'converted_resume.yaml' and the rendered PDF.")
except subprocess.CalledProcessError as e:
    print(f"Error running the rendercv command: {e}")

webScraper.generateValues("https://about.google/intl/ALL_us/commitments/")
CoverLetterGen.createCoverLetter("./coverLetterGenerator/job.json")
txtToPdf.coverLetterPDF()
    
    













