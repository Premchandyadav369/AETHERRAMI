#!/usr/bin/env python3
"""
AETHER-RAMI Research Paper Compilation & Submission Packager
Author: Premchand Yadav | VIT-AP University
"""

import os
import sys
import shutil
import subprocess
import zipfile

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(base_dir)
    print(f"[*] Working Directory: {base_dir}")

    tex_file = "main.tex"
    bib_file = "references.bib"
    pdf_file = "main.pdf"
    zip_name = "AETHER_RAMI_Research_Paper_CameraReady.zip"

    # Check for local compilers
    compilers = ["latexmk", "pdflatex", "xelatex", "tectonic"]
    available_compiler = None
    for c in compilers:
        if shutil.which(c):
            available_compiler = c
            break

    if available_compiler:
        print(f"[+] Found TeX compiler: {available_compiler}. Executing compilation...")
        try:
            if available_compiler == "latexmk":
                cmd = ["latexmk", "-pdf", "-interaction=nonstopmode", tex_file]
                subprocess.run(cmd, check=True)
            elif available_compiler in ["pdflatex", "xelatex"]:
                cmd1 = [available_compiler, "-interaction=nonstopmode", tex_file]
                cmd_bib = ["bibtex", "main"]
                subprocess.run(cmd1, check=True)
                if os.path.exists("main.aux"):
                    subprocess.run(cmd_bib, check=False)
                subprocess.run(cmd1, check=True)
                subprocess.run(cmd1, check=True)
            elif available_compiler == "tectonic":
                subprocess.run(["tectonic", tex_file], check=True)
            print(f"[SUCCESS] Compiled {pdf_file} successfully!")
        except Exception as e:
            print(f"[!] Compilation error: {e}")
    else:
        print("[i] No local TeX engine found on system PATH. Packaging camera-ready Overleaf/ArXiv ZIP bundle...")

    # Package complete submission bundle
    print(f"[*] Packaging {zip_name} for Overleaf / ArXiv...")
    with zipfile.ZipFile(zip_name, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(tex_file, arcname=tex_file)
        if os.path.exists(bib_file):
            z.write(bib_file, arcname=bib_file)
        
        # Add sections
        sections_dir = os.path.join(base_dir, "sections")
        if os.path.exists(sections_dir):
            for root, _, files in os.walk(sections_dir):
                for f in files:
                    if f.endswith(".tex"):
                        abs_p = os.path.join(root, f)
                        rel_p = os.path.relpath(abs_p, base_dir)
                        z.write(abs_p, arcname=rel_p)

        # Add figures
        figures_dir = os.path.join(base_dir, "figures")
        if os.path.exists(figures_dir):
            for root, _, files in os.walk(figures_dir):
                for f in files:
                    if f.endswith((".png", ".pdf", ".jpg")):
                        abs_p = os.path.join(root, f)
                        rel_p = os.path.relpath(abs_p, base_dir)
                        z.write(abs_p, arcname=rel_p)
                        
    print(f"[SUCCESS] Packaged {zip_name} ({os.path.getsize(zip_name):,} bytes). Ready for Overleaf / ArXiv submission!")

if __name__ == "__main__":
    main()
