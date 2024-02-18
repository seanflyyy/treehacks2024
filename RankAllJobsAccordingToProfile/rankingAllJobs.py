from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

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
    experiences = Profiledata.get('experience', [])
    projects = Profiledata.get('projects', [])

    for job in jobDescriptions:
        job_description = job["description"]
        ScoreforJob = CalculateJobScoreForIndividualProfile(experiences, projects, job_description)
        job["score"] = ScoreforJob

    with open('JobsRanking.json', 'w') as file:
        json.dump(jobDescriptions, file, indent=2)  # indent for pretty formatting, adjust as needed


with open("JobData.json", "r") as file:
    job_data = json.load(file)

with open('Profile.json', 'r') as file:
    profile = json.load(file)

RankAllJobs(profile, job_data)
