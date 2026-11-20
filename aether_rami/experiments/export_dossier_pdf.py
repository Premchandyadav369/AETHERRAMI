"""
Export AETHER_RAMI_FINAL_SCIENTIFIC_DOSSIER to standalone publication HTML and PDF.
"""
import os
import subprocess
import html
import re

MD_PATH = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI\AETHER_RAMI_FINAL_SCIENTIFIC_DOSSIER.md"
HTML_PATH = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI\AETHER_RAMI_FINAL_SCIENTIFIC_DOSSIER.html"
PDF_PATH = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI\AETHER_RAMI_FINAL_SCIENTIFIC_DOSSIER.pdf"

BRAIN_HTML_PATH = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\0bb02a7b-91ec-4301-aceb-c0e199a26e13\AETHER_RAMI_FINAL_SCIENTIFIC_DOSSIER.html"
BRAIN_PDF_PATH = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\0bb02a7b-91ec-4301-aceb-c0e199a26e13\AETHER_RAMI_FINAL_SCIENTIFIC_DOSSIER.pdf"

with open(MD_PATH, "r", encoding="utf-8") as f:
    md_content = f.read()

# Build simple clean HTML
lines = md_content.split("\n")
html_body = []
in_table = False
in_code = False
table_header = True

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
            # separator line
            table_header = False
            continue
        if not in_table:
            html_body.append("<table class='dossier-table'>")
            in_table = True
            table_header = True
            
        tag = "th" if table_header else "td"
        row_str = "<tr>" + "".join(f"<{tag}>{c}</{tag}>" for c in cols) + "</tr>"
        html_body.append(row_str)
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
    elif line_str.startswith("> [!"):
        alert_type = re.findall(r"> \[!(.*?)\]", line_str)[0]
        html_body.append(f"<div class='alert alert-{alert_type.lower()}'><strong>{alert_type}:</strong> ")
    elif line_str.startswith("> "):
        html_body.append(f"<p class='quote'>{line_str[2:]}</p>")
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
<title>AETHER-RAMI Final Scientific Dossier</title>
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
    h1 {{ color: #0d47a1; font-size: 26pt; border-bottom: 2px solid #0d47a1; padding-bottom: 8px; margin-top: 0; }}
    h2 {{ color: #1565c0; font-size: 18pt; border-bottom: 1px solid #e0e0e0; padding-bottom: 6px; margin-top: 30px; }}
    h3 {{ color: #1e88e5; font-size: 14pt; margin-top: 20px; }}
    p, li {{ font-size: 10.5pt; color: #2c3e50; }}
    li {{ margin-bottom: 6px; }}
    .dossier-table {{
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 9.5pt;
    }}
    .dossier-table th, .dossier-table td {{
        border: 1px solid #cfd8dc;
        padding: 8px 12px;
        text-align: left;
    }}
    .dossier-table th {{
        background-color: #eceff1;
        font-weight: 600;
        color: #263238;
    }}
    .dossier-table tr:nth-child(even) {{
        background-color: #f8f9fa;
    }}
    .code-block {{
        background-color: #f4f6f8;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 12px;
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 9pt;
        overflow-x: auto;
    }}
    .alert {{
        border-left: 4px solid #0288d1;
        background-color: #e1f5fe;
        padding: 12px 16px;
        margin: 18px 0;
        border-radius: 0 4px 4px 0;
    }}
    .alert-important {{
        border-left-color: #d32f2f;
        background-color: #ffebee;
    }}
    .alert-note {{
        border-left-color: #0288d1;
        background-color: #e1f5fe;
    }}
    hr {{
        border: 0;
        height: 1px;
        background: #cfd8dc;
        margin: 30px 0;
    }}
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

# Write HTML
with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(full_html)
with open(BRAIN_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(full_html)

print(f"Generated HTML dossier: {HTML_PATH}")

# Convert to PDF via msedge headless
edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if os.path.exists(edge_exe):
    cmd = [
        edge_exe,
        "--headless",
        "--disable-gpu",
        f"--print-to-pdf={PDF_PATH}",
        HTML_PATH
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(PDF_PATH):
        print(f"Generated PDF dossier successfully: {PDF_PATH} (size: {os.path.getsize(PDF_PATH)} bytes)")
        import shutil
        shutil.copy2(PDF_PATH, BRAIN_PDF_PATH)
        print(f"Copied to brain: {BRAIN_PDF_PATH}")
    else:
        print("PDF conversion failed:", res.stderr)
else:
    print("Edge binary not found for PDF export.")
