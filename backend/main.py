import os
from pprint import pprint
from dotenv import load_dotenv
from convex import ConvexClient
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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

#function to create a job with company_id, title, description, score, and url
def create_job(company_id, title, description, score, url):
    client.mutation("JobCreateSchemas/jobPosting:post", dict(company_id=company_id, title=title, description=description,score=score, url=url))


#function to create a job with company_id, title, description, score, and url
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


def query_for_details():
    details = client.query("UserGetDetails/getDetails:get")
    #detail = {}
    filtered_data = [
        {"resume_id": item["resume_id"],"name": item["name"], "email": item["email"], "linkedin": item["linkedin"], 
         "github": item["github"], "phone": item["phone"]}
        for item in details
    ]
    return filtered_data


def query_for_experiences():
    resumes = client.query("UserGetDetails/getExperience:get")
    filtered_data = [
        {"resume_id": item["resume_id"],"company": item["company"], "date": item["date"],"position": item["position"],"responsibilities": item["responsibilities"]}
        for item in resumes
    ]
    return filtered_data


def query_for_education():
    education = client.query("UserGetDetails/getEducation:get")
    filtered_data = [
        {"resume_id": item["resume_id"], "school": item["school"], "field_of_study": item["field_of_study"],"level_of_education": item["level_of_education"],"from_date": item["from_date"], "to_date": item["to_date"], "school_location": item["school_location"]}
        for item in education
    ]
    return filtered_data


def query_for_projects():
    projects = client.query("UserGetDetails/getProjects:get")
    filtered_data = [
        {"resume_id": item["resume_id"], "title": item["title"], "description": item["description"],"technologies": item["technologies"]}
        for item in projects
    ]
    return filtered_data

def query_for_skills():
    skills = client.query("UserGetDetails/getSkills:get")
    filtered_data = [
        {"resume_id": item["resume_id"], "skills": item["skills"]}
        for item in skills
    ]
    return filtered_data



def jsonify_profile():
    # Assuming client.query and other query functions return a list of dictionaries
    resume = client.query("UserGetDetails/getResume:get")
    resume_ids = [item["resume_id"] for item in resume]

    details = query_for_details()
    experiences = query_for_experiences()
    education = query_for_education()
    projects = query_for_projects()
    skills = query_for_skills()

    people = []

    for resume_id in resume_ids:
        person = {
            "details": [],
            "experience": [],
            "education": [],
            "projects": [],
            "skills": []
        }

        # Append items to lists if the resume_id matches
        for detail in details:
            if detail.get("resume_id") == resume_id:  # Use .get to avoid KeyError
                person["details"].append({k: v for k, v in detail.items() if k != "resume_id"})

        for experience in experiences:
            if experience.get("resume_id") == resume_id:
                person["experience"].append({k: v for k, v in experience.items() if k != "resume_id"})

        for edu in education:
            if edu.get("resume_id") == resume_id:
                person["education"].append({k: v for k, v in edu.items() if k != "resume_id"})

        for project in projects:
            if project.get("resume_id") == resume_id:
                person["projects"].append({k: v for k, v in project.items() if k != "resume_id"})

        for skill in skills:
            if skill.get("resume_id") == resume_id:
                person["skills"].append({k: v for k, v in skill.items() if k != "resume_id"})

        people.append(person)

    return people




def CalculateJobScoreForIndividualProfile(ArrayExperiences, ArrayProjects, jobdescription):
    TempArrayExperiences = ArrayExperiences
    TempArrayProjects = ArrayProjects

    Allscores = []

    for experience in TempArrayExperiences:
        score = calculate_relevance_score(jobdescription, ''.join(experience["responsibilities"]))
        experience["score"] = score
        Allscores.append(score)

    for project in TempArrayProjects:
        score = calculate_relevance_score(jobdescription, ''.join(project["description"]))
        project["score"] = score
        Allscores.append(score)

    Allscores = sorted(Allscores, reverse=True)

    if len(Allscores) <= 6:
        SixthHighestScore = Allscores[len(Allscores) - 1]
    else:
        SixthHighestScore = Allscores[5]

    sumScoresTop6 = 0

    for i in TempArrayExperiences:
        if i["score"] >= SixthHighestScore:
            sumScoresTop6 += i["score"]

    for i in TempArrayProjects:
        if i["score"] >= SixthHighestScore:
            sumScoresTop6 += i["score"]

    sum = int(1000*(sumScoresTop6 / (len(TempArrayExperiences) + len(TempArrayProjects))))
    
    if sum > 90:
        sum = 91
    return sum


def calculate_relevance_score(job_description, experience_description):
    # Tokenization and use of TF-IDF Vectorizer
    text_corpus = [job_description, experience_description]
    vectorizer = TfidfVectorizer().fit_transform(text_corpus)

    # Calculate cosine similarity between the two documents
    similarity_matrix = cosine_similarity(vectorizer)

    # The similarity matrix will be a 2x2 matrix, where similarity_matrix[0, 1] represents the similarity between job and experience
    relevance_score = similarity_matrix[0, 1]

    return relevance_score


def RankAllJobs(Profiledata, jobDescriptions):
    Profiledata = json.loads(Profiledata)
    jobDescriptions = json.loads(jobDescriptions)
    experiences = Profiledata.get('experience', [])
    projects = Profiledata.get('projects', [])

    for job in jobDescriptions:
        job_description = job["description"]
        ScoreforJob = CalculateJobScoreForIndividualProfile(experiences, projects, job_description)
        job["score"] = ScoreforJob

    lst = []
    lst.append(jobDescriptions)
    val = {}
    val["data"] = lst
    return json.dumps(val, indent=2)  



#arrays of job entries
job_data = jsonify_job_results()
profile = json.dumps(jsonify_profile()[-1], indent=2)
results = RankAllJobs(profile, job_data)

print(profile)