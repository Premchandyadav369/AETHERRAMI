import os, re

public_github = "https://github.com/Premchandyadav369/AETHER"

supp_author_replacement = r"""\author{
    \textbf{V~C~Premchand~Yadav}$^{1}$,
    Yamala~Liel~Stephen$^{1}$,
    K~SriHarsha~Vardhan$^{1}$,
    Edupulapati~Sai~Praneeth$^{1}$,\\[0.5em]
    \textbf{Under the Project Guidance and Mentorship of}\\[0.3em]
    \textbf{Madala~Gurubrahmam}$^{2,*}$,
    and~\textbf{S.~Bharath~Bhushan}$^{3}$
}

\date{}

\begin{document}

\maketitle

\begin{center}
\small
$^{1}$Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning),\\
School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.\\
$^{2}$School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.\\
$^{3}$Department of Networking and Security (DNS), School of Computer Science and Engineering (SCOPE),\\
VIT-AP University, Amaravati, Andhra Pradesh 522237, India.\\
\vspace{0.4em}
$^{*}$\textbf{Corresponding Author:} Dr.~Madala~Gurubrahmam (\texttt{gurubrahmam.m@vitap.ac.in})
\end{center}"""

for folder in ['paper_latex_nature_methods', 'paper_latex_nmi']:
    p = os.path.join(folder, 'supplementary_information.tex')
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Replace author block
    c = re.sub(r'\\author\{.*?\\end\{center\}', lambda m: supp_author_replacement, c, flags=re.DOTALL)
    
    # Replace any github links
    c = re.sub(r'https://github\.com/[a-zA-Z0-9_\-]+/(aether|AETHER|aether-rami|AETHER-RAMI)[a-zA-Z0-9_\-/]*', public_github, c)
    c = c.replace('https://github.com/aether-rami/aether-rami-16b', public_github)
    
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'Updated {p}')

print('Supplementary files updated.')
