from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pdfminer.high_level import extract_text
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk



def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)


def calculate_similarity(job_keywords, resume_keywords):
    job_description = ' '.join(job_keywords)
    resume = ' '.join(resume_keywords)
    
    documents = [job_description, resume]
    
    count_vectorizer = CountVectorizer()
    sparse_matrix = count_vectorizer.fit_transform(documents)
    
    similarity_matrix = cosine_similarity(sparse_matrix, dense_output=True)
    return similarity_matrix[0, 1]

def score_resume(job_keywords, resume_keywords):
    similarity_score = calculate_similarity(job_keywords, resume_keywords)
    return similarity_score


def extract_skills(text):
    # Tokenize the text into words
    words = word_tokenize(text)
    # Part-of-speech tagging
    pos_tags = pos_tag(words)
    # Named entity recognition
    named_entities = ne_chunk(pos_tags)
    # Extract skills from named entities
    skills = [word for word, tag in pos_tags if tag.startswith('NN')]
    return skills


def process(arrKeyWords):
    newarr = []
    for i in arrKeyWords:
        if i == " " or len(i) <= 1:
            continue
        newarr.append(i)
    return newarr

def PrintOutScores(resumepath, jobdescription):
    
    folder_path = resumepath
    resume_1 = extract_text_from_pdf(folder_path)

    JobKeyWordsFiltered = process(extract_skills(jobdescription))
    resumeKeyWordsFiltered = process(extract_skills(resume_1))

    Score = score_resume(JobKeyWordsFiltered,resumeKeyWordsFiltered)

    print(Score)


#Examples

#swe job from tesla
job_descriptionSWE = "Currently pursuing a Degree in Electrical Engineering, Software Engineering, Computer Science / Engineering, or a related field  Strong Matlab or Python programming skills, familiarity with common python packages  Familiarity with machine learning algorithms, familiarity with robotics algorithms such as Kalman Filter, Particle Filter, SLAM. Strong training of math (probability, statistics, linear algebra)  Experience in embedded C/C++ programming, board bring-up, profiling, optimization, simulation, and various levels of testing (SW only, HW/SW integration, etc.)  Very strong mathematical skills in probability, advanced linear algebra and calculus  Good data analysis and data visualization skills would be a huge plus Experience with Ethernet or CAN communication protocols is preferred "
#law job from tesla
job_descriptionLaw = "Current law student, from an ABA-accredited top law school (applying for a position for the upcoming summer and the next year of school) Excellent academic credentials Experience or knowledge in researching legal issues Experience or knowledge writing summaries of complex information Experience using PowerPoint, Excel, Word, Outlook, etc "

#QA job from tesla
job_descriptionQA = "Experience in Engineering, Computer science or proof of exceptional skills in related field Experience in SDLC/STLC and QA processes Experience in Wireless technologies and test plan development Knowledge or experience with Bluetooth profiles functional testing i.e. A2DP,HFP,MAP,HID,etc Knowledge or experience with Wi-Fi protocol functional testing i.e. 802.11 a,b,g,n,ac,ax,etc Working knowledge of BT IOT testing and familiarity using tools i.e. FTS, Ellisys (OTA sniffer) a plus Working knowledge of Wi-Fi throughput and Range Vs Rate tests and familiarity using tools i.e. Wireshark, iPerf a plus Knowledge or experience with BT/Wi-Fi co-ex testing a plus Working knowledge or experience with test automation frameworks using Python, Shell, GIT or Jenkins "

PrintOutScores("resume5.pdf",job_descriptionSWE)
PrintOutScores("resume5.pdf",job_descriptionLaw)
PrintOutScores("resume5.pdf",job_descriptionQA)

