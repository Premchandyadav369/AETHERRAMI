import os
import subprocess
import html
import re
import shutil

workspace = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI"
brain = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\0bb02a7b-91ec-4301-aceb-c0e199a26e13"

md_path = os.path.join(workspace, "AETHER_RAMI_MASTER_RESEARCH_MANUSCRIPT.md")
html_path = os.path.join(workspace, "AETHER_RAMI_MASTER_RESEARCH_MANUSCRIPT.html")
pdf_path = os.path.join(workspace, "AETHER_RAMI_MASTER_RESEARCH_MANUSCRIPT.pdf")

brain_html = os.path.join(brain, "AETHER_RAMI_MASTER_RESEARCH_MANUSCRIPT.html")
brain_pdf = os.path.join(brain, "AETHER_RAMI_MASTER_RESEARCH_MANUSCRIPT.pdf")

with open(md_path, "r", encoding="utf-8") as f:
    md_content = f.read()

lines = md_content.split("\n")
html_body = []
in_table = False
in_code = False

for line in lines:
    line_str = line.strip()
    if line_str.startswith("```"):
        if in_code:
            html_body.append("</pre></code>")
            in_code = False
        else:
            lang = line_str.replace("```", "").strip()
            html_body.append(f"<pre class='code-block {lang}'><code>")
            in_code = True
        continue
    if in_code:
        html_body.append(html.escape(line) + "\n")
        continue

    # Tables
    if line_str.startswith("|") and line_str.endswith("|"):
        cols = [c.strip() for c in line_str.split("|")[1:-1]]
        if all(re.match(r"^:?-+:?$", c) for c in cols):
            continue
        if not in_table:
            html_body.append("<table class='dossier-table'>")
            in_table = True
        html_body.append("<tr>" + "".join(f"<td>{html.escape(c)}</td>" for c in cols) + "</tr>")
        continue
    else:
        if in_table:
            html_body.append("</table>")
            in_table = False

    # Headers
    if line_str.startswith("# "):
        html_body.append(f"<h1>{line_str[2:]}</h1>")
    elif line_str.startswith("## "):
        html_body.append(f"<h2>{line_str[3:]}</h2>")
    elif line_str.startswith("### "):
        html_body.append(f"<h3>{line_str[4:]}</h3>")
    elif line_str.startswith("- "):
        html_body.append(f"<li>{line_str[2:]}</li>")
    elif line_str.startswith("---"):
        html_body.append("<hr/>")
    elif len(line_str) > 0:
        html_body.append(f"<p>{line_str}</p>")

if in_table:
    html_body.append("</table>")
if in_code:
    html_body.append("</pre></code>")

full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AETHER-RAMI Master Research Manuscript</title>
<style>
    body {{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #1a1a1a;
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
        background-color: #ffffff;
    }}
    h1 {{ color: #0d47a1; font-size: 24pt; border-bottom: 2px solid #0d47a1; padding-bottom: 8px; margin-top: 0; }}
    h2 {{ color: #1565c0; font-size: 16pt; border-bottom: 1px solid #e0e0e0; padding-bottom: 6px; margin-top: 26px; }}
    h3 {{ color: #1e88e5; font-size: 13pt; margin-top: 18px; }}
    p, li {{ font-size: 10pt; color: #2c3e50; }}
    .dossier-table {{
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-size: 9pt;
    }}
    .dossier-table td {{
        border: 1px solid #cfd8dc;
        padding: 6px 10px;
    }}
    .dossier-table tr:first-child {{
        background-color: #e3f2fd;
        font-weight: bold;
    }}
    .dossier-table tr:nth-child(even):not(:first-child) {{
        background-color: #f8f9fa;
    }}
    .code-block {{
        background-color: #f4f6f8;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 10px;
        font-family: 'Consolas', monospace;
        font-size: 8.5pt;
    }}
    hr {{ border: 0; height: 1px; background: #cfd8dc; margin: 24px 0; }}
    @media print {{
        body {{ max-width: 100%; padding: 0; }}
        h1, h2, h3 {{ page-break-after: avoid; }}
        table, pre {{ page-break-inside: avoid; }}
    }}
</style>
</head>
<body>
{"".join(html_body)}
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(full_html)
with open(brain_html, "w", encoding="utf-8") as f:
    f.write(full_html)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if os.path.exists(edge_exe):
    cmd = [
        edge_exe,
        "--headless",
        "--disable-gpu",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(pdf_path):
        size_kb = os.path.getsize(pdf_path) / 1024
        print(f"Generated PDF manuscript: {pdf_path} ({size_kb:.1f} KB)")
        shutil.copy2(pdf_path, brain_pdf)
        print(f"Copied PDF to brain: {brain_pdf}")
    else:
        print("PDF conversion failed:", res.stderr)
else:
    print("Edge binary not found.")
