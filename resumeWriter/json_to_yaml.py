import json
import yaml
import subprocess
with open("input.json", 'r') as json_file:
    data = json.load(json_file)
skills = data['skills']['skills']
skill_types = data['skills']['skill_type']
languages = [skills[i] for i, skill_type in enumerate(skill_types) if skill_type == 'languages']
technologies = [skills[i] for i, skill_type in enumerate(skill_types) if skill_type == 'technologies']
study_type_mapping = {
    "bachelor of science": "BS",
    "bachelor of sciences": "BS",
    "bachelor of arts": "BA",
}
study_type = data['education'][0]['level_of_education'].lower()

# Use the mapping or keep the original if not found
study_type_normalized = study_type_mapping.get(study_type, study_type)
# Create the YAML data structure
yaml_data = {
    'cv': {
        'name': data['details']['name'],
        'email': data['details']['email'],
        'website': data['details']['website'],
        'social_networks': [
            {'network': 'GitHub', 'username': data['details']['github']},
            {'network': 'LinkedIn', 'username': data['details']['linkedin']}
        ],
        'education': [
            {
                'institution': data['education'][0]['school'],
                'study_type': study_type_normalized,
                'area': data['education'][0]['field_of_study'],
                'location': data['education'][0]['school_location']
            }
        ],
        'work_experience': [
            {
                'company': exp['company'],
                'position': exp['position'],
                'start_date': exp['dates'].split(' to ')[0],
                'end_date': exp['dates'].split(' to ')[1],
                'highlights': exp['responsibilities']
            }
            for exp in data['experience']
        ],
        'skills': [
            {'name': 'Languages', 'details': ', '.join(languages)},
            {'name': 'Technologies', 'details': ', '.join(technologies)}
        ],
        'projects': [
            {
                'name': project['title'] + " | " + ", ".join(project['technologies']),
                'highlights': project['description'][0:]
            }
            for project in data['projects']
        ]
    }
}

# Convert the YAML data to a YAML-formatted string
yaml_string = yaml.dump(yaml_data, default_flow_style=False)

# Save the YAML data to a file
with open('converted_resume.yaml', 'w') as yaml_file:
    yaml_file.write(yaml_string)

rendercv_command = 'rendercv render converted_resume.yaml'
try:
    subprocess.run(rendercv_command, shell=True, check=True)
    print("Conversion completed. Check 'converted_resume.yaml' and the rendered PDF.")
except subprocess.CalledProcessError as e:
    print(f"Error running the rendercv command: {e}")
