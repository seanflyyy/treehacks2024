# import spacy
from pdfminer.high_level import extract_text
# from docx import Document
# import os

# Load the spacy model
# nlp = spacy.load("en_core_web_sm")

# Define categories based on keywords (example)
categories = {
    "Data Science": ["python", "data science", "machine learning", "statistics"],
    "Web Development": ["javascript", "html", "css", "react"],
    "Project Management": ["project management", "scrum", "agile"]
}

# def categorize_resume(text):
#     doc = nlp(text.lower())
#     resume_category = "Uncategorized"
    
#     for category, keywords in categories.items():
#         if any(keyword in doc.text for keyword in keywords):
#             resume_category = category
#             break
            
#     return resume_category

# def parse_and_categorize_resumes(folder_path):
#     categorized_resumes = {}
#     for filename in os.listdir(folder_path):
#         if filename.endswith(".pdf"):
#             text = extract_text_from_pdf(os.path.join(folder_path, filename))
#         elif filename.endswith(".docx"):
#             text = extract_text_from_docx(os.path.join(folder_path, filename))
#         else:
#             continue
#         category = categorize_resume(text)
#         if category not in categorized_resumes:
#             categorized_resumes[category] = []
#         categorized_resumes[category].append(filename)
#     return categorized_resumes


def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

# def extract_text_from_docx(docx_path):
#     doc = Document(docx_path)
#     fullText = []
#     for para in doc.paragraphs:
#         fullText.append(para.text)
#     return '\n'.join(fullText)

folder_path = "data/Cal Hacks 9.0 Resumes/00.pdf"
# categorized_resumes = parse_and_categorize_resumes(folder_path)
# print(categorized_resumes)
print(extract_text_from_pdf(folder_path))

