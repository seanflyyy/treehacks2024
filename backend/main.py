import os

from dotenv import load_dotenv
from convex import ConvexClient

load_dotenv(".env.local")
load_dotenv()

# Loading the convex client
client = ConvexClient(os.getenv("CONVEX_URL"))

#function to create a user with user_id and name
def create_user(user_id, name):
    client.mutation("user:post", dict(user_id=user_id, name=name))

#function to create a resume with user_id and resume_id
def create_resume(user_id, resume_id):
    client.mutation("resume:post", dict(user_id=user_id, resume_id=resume_id))

#function to cteate a skill with resume_id and skills
def create_skills(resume_id, skills):
    client.mutation("skills:post", dict(resume_id=resume_id, skills=skills))

#function to create details with resume_id, name, phone, email, linkedin, and github   
def create_details(resume_id, name, phone, email, linkedin, github):
    client.mutation("details:post", dict(resume_id=resume_id, name=name, phone=phone, email=email, linkedin=linkedin, github=github))

#function to create a experience with resume_id, company, position, date, and responsibilities
def create_experiences(resume_id, company, position, date, responsibilities):
    client.mutation("experiences:post", dict(resume_id=resume_id, company=company, position=position, date=date, responsibilities=responsibilities))

#function to create projects with resume_id, title, description, and technologies
def create_projects(resume_id, title, description, technologies):
    client.mutation("projects:post", dict(resume_id=resume_id, title=title, description=description, technologies=technologies))

#function to create education with resume_id, level_of_education, school, field_of_study, and school_location
def create_education(resume_id, level_of_education, school, field_of_study, school_location):
    client.mutation("education:post", dict(resume_id=resume_id, level_of_education=level_of_education, school=school, field_of_study=field_of_study, school_location=school_location))


create_user(2,'Melvin')

#print(client.query("tasks:get"))