import os
from pprint import pprint
from dotenv import load_dotenv
from convex import ConvexClient
import json

load_dotenv(".env.local")
load_dotenv()

# Loading the convex client
client = ConvexClient(os.getenv("CONVEX_URL"))

# methods to insert new values into the database
#function to create a user with user_id and name
def create_user(user_id, name):
    client.mutation("UserCreateSchemas/user:post", dict(user_id=user_id, name=name))

#function to create a resume with user_id and resume_id
def create_resume(user_id, resume_id):
    client.mutation("UserCreateSchemas/resume:resumepost", dict(user_id=user_id, resume_id=resume_id))

#function to cteate a skill with resume_id and skills
def create_skills(resume_id, skills):
    client.mutation("UserCreateSchemas/skills:post", dict(resume_id=resume_id, skills=skills))

#function to create details with resume_id, name, phone, email, linkedin, and github   
def create_details(resume_id, name, phone, email, linkedin, github):
    client.mutation("UserCreateSchemas/details:post", dict(resume_id=resume_id, name=name, phone=phone, email=email, linkedin=linkedin, github=github))

#function to create a experience with resume_id, company, position, date, and responsibilities
def create_experiences(resume_id, company, position, date, responsibilities, from_date, to_date):
    client.mutation("UserCreateSchemas/experiences:post", dict(resume_id=resume_id, company=company, position=position, date=date, responsibilities=responsibilities))

#function to create projects with resume_id, title, description, and technologies
def create_projects(resume_id, title, description, technologies):
    client.mutation("UserCreateSchemas/projects:post", dict(resume_id=resume_id, title=title, description=description, technologies=technologies))

#function to create education with resume_id, level_of_education, school, field_of_study, and school_location
def create_education(resume_id, level_of_education, school, field_of_study, school_location, from_date, to_date):
    client.mutation("UserCreateSchemas/education:post", dict(resume_id=resume_id, level_of_education=level_of_education, school=school, field_of_study=field_of_study, school_location=school_location, from_date=from_date, to_date=to_date))


#functions for calling the company and job posting schemas
#function to create a company with company_id and company_name
def create_company(company_id, company_name):
    client.mutation("JobCreateSchemas/companies:post", dict(company_id=company_id, company_name=company_name))

def create_job(company_id, title, description, score, url):
    client.mutation("JobCreateSchemas/jobPosting:post", dict(company_id=company_id, title=title, description=description,score=score, url=url))


def query_for_jobs():
    jobs = client.query("JobGetNullScores/JobCompanyConnect:get")
    companies = {}
    for item in jobs:
        companies[item["company_id"]] = item["company_name"]
    
    return companies

def jsonify_job_results():
    jobs = client.query("JobGetNullScores/getNull:get")
    companies = query_for_jobs()
    filtered_data = [
        {"company_name": companies[item["company_id"]], "title": item["title"], "description": item["description"], 
         "score": item["score"]}
        for item in jobs
    ]
    json_data = json.dumps(filtered_data, indent=4)
    return json_data



#print(jsonify_job_results())
print(jsonify_job_results())

#jobs = client.query("JobGetNullScores/getNull:get")
#pprint(jobs)

#create_company(5, "Microsoft")
#create_job(5, "AI Research Engineer", """Expertise in state-of-the-art model optimization techniques preferably with publications in top conferences Proficient in Python coding Proficient in PyTorch, TensorFlow, Jax, or other machine learning frameworks Proficient with state-of-the-art model optimization techniques Experience with training and deploying neural networks in a research and/or production setting Understanding of computer systems and architecture""", -1, "https://careers.microsoft.com/us/en/job/1090733/AI-Research-Engineer")

#methods to get values from the database
#function to get user by user_id
#def get_user(user_id):
    #return client.query("user:get", dict(user_id=user_id))


#print(client.query("tasks:get"))