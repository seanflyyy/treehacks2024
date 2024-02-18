from fpdf import FPDF
def coverLetterPDF():
    Letter = ""
    with open("./coverLetterGenerator/CoverLetter.txt", 'r') as file:
        start_reading = False
        for line in file:
            # Check if the line starts with "Dear Hiring Manager"
            if line.startswith('Dear Hiring Manager'):
                start_reading = True
            # Exclude lines containing '</s>'
            if start_reading and '</s>' not in line:
                Letter += line.strip() + '\n' + '\t'  # Include a newline after each line

    # save FPDF() class into a
    # variable pdf
    pdf = FPDF()

    # Add a page
    pdf.add_page()

    # set style and size of font
    # that you want in the pdf
    pdf.set_font("Times", size=12)  # Times New Roman


    # add another cell with proper paragraph division
    paragraphs = Letter.split('\n\n')
    for paragraph in paragraphs:
        pdf.multi_cell(0, 10, txt=paragraph, align='L')

    # save the pdf with name .pdf
    pdf.output("./coverLetterGenerator/CoverLetter2.pdf")
