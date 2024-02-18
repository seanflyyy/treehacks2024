import together
import json

def createCoverLetter(path_to_json):
    #HAVE TO FIRST read in job details in json, users' resume in json, and core values in txt

    # Load JSON data from the file
    with open('./filterOutProjectsAndExperiences/FilteredData.json', 'r') as file:
        profileloaded = json.load(file)

    with open(path_to_json, 'r') as file:
        jobLoaded = json.load(file)
        
    with open('./coverLetterGenerator/values.txt', 'r') as file:
        # Read the entire content of the file into a string
        Values = file.read()

    profile = json.dumps(profileloaded, indent=2)
    job = json.dumps(jobLoaded, indent=2)
    coreValue = Values

        

    prompt = "WRITE ME A COVER LETTER BASED ON THE FOLLOWING INFO of Company’s core values, my resume, and job description. Please help me sound natural and relate how my experiences satisfy the requirements for the jobs and resonate with the company’s values. Remember to only talk about the things that are in my resume, don’t lie and do not make up stuff and don't just list out skills in a robotic manner but rather relate the skills to the job's details. Also dont use any bullet points. This is my profile: "
    prompt = prompt + profile  + ". This is the company' s core value: " +  coreValue + "Now this is the job posting from the company: " + job

    model = "togethercomputer/StripedHyena-Nous-7B"

    together.api_key = "f6ee2e11e1d1633456e1ad4461836612abceb914ecb860a4c4238c40dff04022"

    generated_text = ""  # Initialize an empty string to store the generated text
    for token in together.Complete.create_streaming(prompt=prompt, model=model, max_tokens=2500):
        generated_text += token 

    print(generated_text)

    #Wrote cover letter to txt file, each line = paragraph
    with open('./coverLetterGenerator/CoverLetter.txt', 'w') as file:
        # Write the string into the file
        file.write(generated_text)
    
    
