#function to filter out experiences and projects
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

#input = array of vectors
def filterExperiencesAndProjects(ArrayExperiences,ArrayProjects,jobdescription ):
    
    TempArrayExperiences = ArrayExperiences
    TempArrayProjects = ArrayProjects
    
    Allscores = []
    
    #go through each experience and project and find scores with regard to description 
    for experience in TempArrayExperiences:
        score = calculate_relevance_score(jobdescription,''.join(experience["responsibilities"]))
        experience["score"] = score
        Allscores.append(score)
        
        
    for project in TempArrayProjects:
        score = calculate_relevance_score(jobdescription,''.join(project["description"]))
        project["score"] = score
        Allscores.append(score)
        
    
    Allscores = sorted(Allscores,reverse=True)
    
    if len(Allscores) <= 6:
        return [ArrayExperiences,ArrayProjects] #there is no need to filter, they already have six experiences/projects -> just keep everything the same
    else :
        SixthHighestScore = Allscores[5]
        
        
        FilteredExperiences = []
        FilteredProjects = []
            
        for i in TempArrayExperiences:
            if i["score"] >= SixthHighestScore:
                i.pop("score",None)
                FilteredExperiences.append(i)
        
        for i in TempArrayProjects:
            if i["score"] >= SixthHighestScore:
                i.pop("score",None)
                FilteredProjects.append(i)
                
    
        return [FilteredExperiences,FilteredProjects]
        


#function to filter out skills
def calculate_relevance_score(job_description, experience_description):
    # Tokenization
    text_corpus = [job_description, experience_description]

    # Create a bag-of-words model using CountVectorizer
    vectorizer = CountVectorizer().fit_transform(text_corpus)
    
    # Calculate cosine similarity between the two documents
    similarity_matrix = cosine_similarity(vectorizer)

    # The similarity matrix will be a 2x2 matrix, where similarity_matrix[0, 1] represents the similarity between job and experience
    relevance_score = similarity_matrix[0, 1]

    return relevance_score


#extract experiences and projects from data structure, filter them, and then upadte them
def ExtractAndUpdateExperiencesAndProjects(data,jobDescription):
    # Access the "experience" and "projects" sections
    experiences = data.get('experience', [])
    projects = data.get('projects', [])
    
    
    job = jobDescription
    
    FilteredExperienceAndProjects = filterExperiencesAndProjects(experiences,projects,job)
    FilteredExperience = FilteredExperienceAndProjects[0]
    FilteredJob = FilteredExperienceAndProjects[1]
    
    data["experience"] = FilteredExperience
    data["projects"] = FilteredJob
    
    with open('FilteredData.json', 'w') as file:
        json.dump(data, file, indent=2)  # indent for pretty formatting, adjust as needed
        
        

#Example: take in Json file, extract experiences and projects, filter out irrelevant experiences and projects, format into new json

with open('sampleDataStructure.json', 'r') as file:
    dataStruct = json.load(file)
    
job_descriptionSWE = "Currently pursuing a Degree in Electrical Engineering, Software Engineering, Computer Science / Engineering, or a related field  Strong Matlab or Python programming skills, familiarity with common python packages  Familiarity with machine learning algorithms, familiarity with robotics algorithms such as Kalman Filter, Particle Filter, SLAM. Strong training of math (probability, statistics, linear algebra)  Experience in embedded C/C++ programming, board bring-up, profiling, optimization, simulation, and various levels of testing (SW only, HW/SW integration, etc.)  Very strong mathematical skills in probability, advanced linear algebra and calculus  Good data analysis and data visualization skills would be a huge plus Experience with Ethernet or CAN communication protocols is preferred "
ExtractAndUpdateExperiencesAndProjects(dataStruct,job_descriptionSWE)

    
    













