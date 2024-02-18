import requests, subprocess
def remove_non_ascii(text):
    return ''.join(char for char in text if ord(char) < 128)

def generate_latex_cover_letter(applicant_name, company_name, current_date, cover_letter_content):
    # Remove non-ASCII characters
    cover_letter_content = remove_non_ascii(cover_letter_content)

    latex_content = (
        "\\documentclass[]{cover}\n"
        "\\usepackage{fancyhdr}\n"
        "\n"
        "\\pagestyle{fancy}\n"
        "\\fancyhf{}\n"
        "\n"
        "\\rfoot{Page \\thepage \\hspace{1pt}}\n"
        "\\thispagestyle{empty}\n"
        "\\renewcommand{\\headrulewidth}{0pt}\n"
        "\\begin{document}\n"
        "\n"
        "\\namesection{" + f"{applicant_name.split()[0]}{applicant_name.split()[1]}" + "}{{ \\urlstyle{{same}}\\href{{https://johndoe.xyz}}{{johndoe.xyz}} | \\urlstyle{{same}}\\href{{mailto:{data['details']['email']}}}{{me@johndoe.xyz}} | 0 7771238921 | \\urlstyle{{same}}\\href{{https://github.com}}{{Github}} | \\urlstyle{{same}}\\href{{https://linkedin.com}}{{Linkedin}}\n"
        "\n"
        "\\hfill\n"
        "\n"
        "\\begin{minipage}[t]{0.5\\textwidth} \n"
        f"\\companyname{{{company_name}}}\n"
        "\\end{minipage}\n"
        "\\begin{minipage}[t]{0.49\\textwidth} \n"
        f"\\currentdate{{{current_date}}}\n"
        "\\end{minipage}\n"
        "\n"
        "\\lettercontent{Dear " + f"{company_name},"
        f"{cover_letter_content}\n"
        "\\end{document}\n"
    )

    latex_file_path = "cover_letter.tex"  # Set the desired file name here

    with open(latex_file_path, 'w') as latex_file:
        latex_file.write(latex_content)

    print(f"Cover letter saved as '{latex_file_path}' in the current folder.")

    import subprocess

    # Input data
    latex_file_path = "cover_letter.tex"
    output_pdf_path = "cover_letter.pdf"

    # Compile LaTeX to PDF using pdflatex
    try:
        subprocess.run(["pdflatex", latex_file_path], check=True)
        print("PDF successfully generated.")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while generating PDF: {e}")

    # Rename the output file to the desired name
    try:
        subprocess.run(["mv", "cover_letter.pdf", output_pdf_path], check=True)
        print(f"PDF renamed to: {output_pdf_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while renaming PDF: {e}")



# Example usage:
applicant_name = "John Doe"
company_name = "Random LLC"
current_date = "March 1, 2024"
cover_letter_content = (
    "I am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [where you found the position]."
)

generate_latex_cover_letter(applicant_name, company_name, current_date, cover_letter_content)
