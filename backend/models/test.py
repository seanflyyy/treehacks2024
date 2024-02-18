# The list provided
lst = [
"", "|", "", "|", "", "Workday", "", "Software Engineering Intern (Site Reliability)", "",
"May 2022 – present", "", "• Created automation tooling for development workflow and continuous integration through a Go AWS Lambda bot.",
"• Led the migration of a repository with 100+ developers to integrate the bot by defining and coding requested features.",
"• Improved observability through Cloudwatch metric monitoring and Prometheus alarming, deployed on AWS EKS cluster.",
"• Built AWS, Prometheus, and Kubernetes architecture with infrastructure as code (IaC) tool Terraform.", "", "UC Berkeley Department of EECS", "",
"20-hour Undergraduate Student Instructor (uGSI)", "• Taught weekly discussion and lab sections, review sessions, and office hours for courses totaling 2500+ students.",
"• Created and edited course content to enhance learning (worksheets, video walkthroughs, and study guides).",
"• uGSI/Teaching Assistant for CS 61B (Java/Data Structures) and CS 70 (Discrete Math/Probability).", "", "|", "", "Jan. 2021 – Present", "", "Berkeley Codeology", "",
"Director of Technology", "", "Jan. 2021 – Present", "", "• Coordinated 5 internal and 2 contract projects, providing tech exploration opportunities for 60 students.",
"• Guided and supported a 15-member committee in brainstorming project ideas, developing curriculums, and debugging.",
"• Mentored a team of 5 student developers in FlapPy, a self-created project utilizing Pygame, neural networks, and genetic", "|", "",
"algorithms to train artificial intelligence to play Flappy Bird.", "", "Avanti", "", "Software Developer", "", "Aug. 2021 – Dec. 2021", "",
"• Built a React Native mobile app from scratch that connects K-12 students with local tutors in various subjects.",
"• Led the implementation of various features including user authentication, organizing sessions, and real-time messaging.",
"• Utilized the Sharetribe API and React contexts to manage tutoring sessions and user data.", ""
]

# Initialize an empty list to hold structured data
categorized_data = []

# Initialize temporary storage for current category
current_entry = {}
current_category = None

# Improved logic to handle job descriptions and company/position assignments
for item in lst:
    if item == "" or item == "|":
        continue
    elif "–" in item:  # Date range might indicate a position or education
        current_entry['Dates'] = item
    elif "•" in item:  # Bullet points indicate responsibilities or achievements
        if 'Responsibilities' not in current_entry:
            current_entry['Responsibilities'] = []
        current_entry['Responsibilities'].append(item.strip("• ").replace("\uffff", "ff").replace("\ufb01", "fi").replace("\ufb02", "fl"))
    else:
        if not current_entry:
            current_entry['Company'] = item
        elif 'Company' in current_entry and 'Position' not in current_entry:
            current_entry['Position'] = item
        elif 'Position' in current_entry:
            # Save the previous entry if a new company or position is encountered
            categorized_data.append(current_entry)
            current_entry = {'Company': item}

# Don't forget to add the last entry if the loop ends
if current_entry:
    categorized_data.append(current_entry)

# Show the structured data
for entry in categorized_data:
    print(entry)
