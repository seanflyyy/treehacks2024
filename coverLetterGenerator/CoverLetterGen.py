import together
import json 

# Load JSON data from the file
with open('FilteredData.json', 'r') as file:
    profileloaded = json.load(file)

profile = json.dumps(profileloaded, indent=2)

prompt = "WRITE ME A COVER LETTER BASED ON THE FOLLOWING INFO of Company’s core values, my resume, and job description. Please help me sound natural and relate how my experiences satisfy the requirements for the jobs and resonate with the company’s values. Remember to only talk about the things that are in my resume, don’t lie and do not make up stuff. This is my profile: "
prompt += profile + ". This is the company's core values: "


model = "togethercomputer/StripedHyena-Nous-7B"



together.api_key = "f6ee2e11e1d1633456e1ad4461836612abceb914ecb860a4c4238c40dff04022"
for token in together.Complete.create_streaming(prompt=prompt,model=model,max_tokens=2500):
    print(token, end="", flush=True)
print("\n")
