from pdflatex import PDFLaTeX

# Create PDF from .tex file
pdfl = PDFLaTeX.from_texfile('cover_letter.tex')
pdf, log, completed_process = pdfl.create_pdf()

# Save PDF binary content to a file
with open('output.pdf', 'wb') as pdf_file:
    pdf_file.write(pdf)

# Optionally, you can print a message indicating the success
print("PDF saved successfully as 'output.pdf'")
