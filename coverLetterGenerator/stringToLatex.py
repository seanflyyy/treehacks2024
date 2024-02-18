def generate_latex_cover_letter(applicant_name, company_name, current_date, cover_letter_content):
    latex_content = fr"""
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % Deedy - Cover Letter Template
    % LaTeX Template
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    \documentclass[]{{cover}}
    \usepackage{{fancyhdr}}

    \pagestyle{{fancy}}
    \fancyhf{{}}

    \rfoot{{Page \thepage \hspace{{1pt}}}}
    \thispagestyle{{empty}}
    \renewcommand{{\headrulewidth}}{{0pt}}
    \begin{{document}}

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     TITLE NAME
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \namesection{{{applicant_name.split()[0]}}}{{{applicant_name.split()[1]}}}{{ \urlstyle{{same}}\href{{https://johndoe.xyz}}{{johndoe.xyz}} | \urlstyle{{same}}\href{{mailto:{data['details']['email']}}}{{me@johndoe.xyz}} | 0 7771238921 | \urlstyle{{same}}\href{{https://github.com}}{{Github}} | \urlstyle{{same}}\href{{https://linkedin.com}}{{Linkedin}}
    }}

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     MAIN COVER LETTER CONTENT
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \hfill

    \begin{{minipage}}[t]{{0.5\textwidth}} 
    \companyname{{{company_name}}}
    \end{{minipage}}
    \begin{{minipage}}[t]{{0.49\textwidth}} 
    \currentdate{{{current_date}}}
    \end{{minipage}}

    \lettercontent{{Dear {company_name},"""
    {cover_letter_content}
    \end{{document}}
    """

    # Save the LaTeX content to a file
    latex_file_path = 'cover_letter.tex'
    with open(latex_file_path, 'w') as latex_file:
        latex_file.write(latex_content)

    print(f"Cover letter saved to '{latex_file_path}'")

# Example usage:
applicant_name = "John Doe"
company_name = "Random LLC"
current_date = "March 1, 2024"
cover_letter_content = """
I am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [where you found the position].
"""

generate_latex_cover_letter(applicant_name, company_name, current_date, cover_letter_content)
