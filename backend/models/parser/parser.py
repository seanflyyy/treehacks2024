from pdfminer.high_level import extract_text
from .utils import normalize_text
import uuid

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

def parse_and_categorize_resumes(pdf_path):
    """
    {
        details: {
            name: str;
            phone: str;
            email: str;
            linkedin: str;
            github: str;
            website: str
        },
        education: {
            level_of_education: str;
            school: str;
            field_of_study: str
            school_location: str
        }[],
        experience: {
            company: str;
            position: str;
            dates: str;
            responsibilities: str[]
        }[],
        skills: {
            skill: str
        }[],
        projects: {
            title: str;
            technologies: str[];
            description: str[]
        }[],
    }
    """

    categories = {
        "details": [],
        "education": [],
        "experience": [],
        "skills": [],
        "projects": [],
        "awards": []
    }
    text = extract_text_from_pdf(pdf_path)
    data = text.split("\n")

    curr_category = "details"
    for i in data:
        match i.lower():
            case "education":
                curr_category = "education"
            case "experience":
                curr_category = "experience"
            case "skills":
                curr_category = "skills"
            case "projects":
                curr_category = "projects"
            case "awards":
                curr_category = "awards"
            case _:
                categories[curr_category].append(i)
    
    categories['details'] = parse_details(categories["details"])
    categories['education'] = parse_education(categories["education"])
    categories['experience'] = parse_experience(categories["experience"])
    categories['skills'] = parse_skills(categories["skills"])
    categories['projects'] = parse_projects(categories["projects"])

    del categories["awards"]

    return categories
    
def parse_details(details: list[str]) -> dict:
    """
    {
        name: str;
        phone: str;
        email: str;
        linkedin: str;
        github: str;
        website: str
    }
    """

    details = [item for item in details if item not in ["", "|"]]
    return {
        "name": details[0],
        "phone": details[1],
        "email": details[2],
        "linkedin": details[3],
        "github": details[4],
        "website": details[5]
    }

def parse_education(education: list[str]) -> list[dict]:
    """
    {
        level_of_education: str;
        school: str;
        field_of_study: str;
        school_location: str;
    }[]
    """


    education = [item for item in education if item not in [""]]
    return {
            "level_of_education": None,
            "school": education[0],
            "field_of_study": education[1],
            "school_location": None,
            # "start_date": education[-1].split("\u")[0].strip(),
            # "end_date": education[-1].split("\u")[1].strip()
        }

def parse_experience(experiences: list[str]) -> list[dict]:

    """
    {
        company: str;
        position: str;
        dates: str;
        responsibilities: str[]
        id: str;
    }[]
    """
        
    # Initialize an empty list to hold structured data
    categorized_data = []

    # Initialize temporary storage for current category
    current_entry = {}
    current_category = None

    # Improved logic to handle job descriptions and company/position assignments
    for item in experiences:
        item = normalize_text(item) 
        
        if item == "" or item == "|":
            continue
        elif "–" in item:  # Date range might indicate a position or education
            current_entry['dates'] = item
        elif "•" in item:  # Bullet points indicate responsibilities or achievements
            if 'responsibilities' not in current_entry:
                current_entry['responsibilities'] = []
            current_entry['responsibilities'].append(item.strip("• ").replace("\uffff", "ff").replace("\ufb01", "fi").replace("\ufb02", "fl"))
        else:
            if not current_entry:
                current_entry['company'] = item
            elif 'company' in current_entry and 'position' not in current_entry:
                current_entry['position'] = item
            elif 'position' in current_entry:
                # Save the previous entry if a new company or position is encountered
                categorized_data.append(current_entry)
                current_entry = {'company': item}

    # Don't forget to add the last entry if the loop ends
    if current_entry:
        categorized_data.append(current_entry)



    for entry in categorized_data:
        entry['id'] = str(uuid.uuid4())
    
    print(categorized_data)

    return categorized_data

def parse_skills(skills_list: list[str]) -> list[str]:
    """
    {
        skill: str
    }
    """
    # Initialize an empty dictionary to hold categorized skills
    categorized_skills = {}

    # Process each item in the skills list
    for skill_str in skills_list:
        # Normalize text to fix any special Unicode characters
        skill_str = normalize_text(skill_str)

        if not skill_str:
            continue  # Skip empty strings

        try:
            # Splitting the string on the first colon found to separate the category from the skills
            category, skills = skill_str.split(":", 1)
        except:
            continue

        # Cleaning up and converting the skills string into a list
        cleaned_skills = [skill.strip() for skill in skills.split(",")]

        # Adding the cleaned and split skills to the categorized_skills dictionary
        categorized_skills[category.strip().lower()] = cleaned_skills

    output = {
        "skills": [],
        "skill_type": []
    }

    for category, skills in categorized_skills.items():
        output["skills"].extend(skills)
        for skill in skills:
            output["skill_type"].append(category)

    return output

def parse_projects(projects: list[str]) -> list[str]:
    """
    {
        title: str;
        technologies: str[];
        description: str[];
        id: str;
    }
    """
    # Parse the list into structured data
    def convert_projects(projects_list):
        projects = []
        current_project = {}

        for item in projects_list:
            item = normalize_text(item)  # Normalize Unicode characters
            if not item or item == "|":  # Skip empty items or dividers
                continue
            elif not current_project.get("title"):  # If the current project has no title, the item is a title
                current_project["title"] = item
            elif not current_project.get("technologies"):  # If the current project has a title but no technologies, the item is technologies
                current_project["technologies"] = item.split(",")
            elif item.startswith("•"):  # Bullet points are project descriptions/key points
                if "description" not in current_project:
                    current_project["description"] = []
                current_project["description"].append(item.strip("• ").strip())
            else:
                # If we encounter a new title while the current project already has a title and technologies,
                # it means we've moved on to a new project.
                projects.append(current_project)
                current_project = {"title": item}

        if current_project:
            projects.append(current_project)

        for project in projects:
            project["id"] = str(uuid.uuid4())

        return projects

    # Categorize the projects information
    categorized_projects = convert_projects(projects_list=projects)

    return categorized_projects