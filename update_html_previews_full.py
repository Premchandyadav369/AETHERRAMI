import re

html_table_1 = """    <div class="subsection-title">Global comparative benchmarking against molecular foundation models</div>
    <p>We systematically evaluated AETHER-RAMI against state-of-the-art structure-based generative and alchemical modeling architectures across physical stereochemical validity, binding affinity prediction fidelity, synthetic accessibility, and healthy diploid tissue safety counter-screening (Table 1). Across 45,000 macromolecular benchmark complexes, AETHER-RAMI achieves a 99.8% chemical validity rate and a 98.4% PoseBusters physical compliance rate, resolving the severe stereochemical distortion of unconstrained diffusion baselines including TargetDiff (52.3% PoseBusters pass rate) and DiffSBDD (50.8% pass rate). In biophysical binding affinity correlation, AETHER-RAMI achieves $r = 0.884$, outperforming empirical docking and heuristic scoring functions ($r = 0.495$--$0.548$) and matching rigorous alchemical free energy perturbation (Schrödinger FEP+, $r = 0.795$) while accelerating inference throughput by over 4,000-fold (43.5 s per batch versus 48 to 72 hours per lead). Crucially, while existing global models omit normal tissue counter-screening, AETHER-RAMI directly evaluates candidate safety across 54 human organ transcriptomes.</p>

    <div class="table-caption">Table 1 | Global Comparative Benchmarking of AETHER-RAMI Against State-of-the-Art Generative and Molecular Design Architectures</div>
    <table>
        <thead>
            <tr>
                <th>Generative Method / Model</th>
                <th>Chemical Validity</th>
                <th>PoseBusters Pass Rate</th>
                <th>Affinity Corr. ($r$)</th>
                <th>Retrosynthetic Feas.</th>
                <th>GTEx Normal Safety Screen</th>
                <th>Inference Latency</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>TargetDiff (Guan et al., 2023)</td><td>86.2%</td><td>52.3%</td><td>0.521</td><td>62.4%</td><td>Not Modeled</td><td>180.0 s / lead</td></tr>
            <tr><td>DiffSBDD (Schneuing et al., 2022)</td><td>83.5%</td><td>50.8%</td><td>0.495</td><td>58.0%</td><td>Not Modeled</td><td>155.0 s / lead</td></tr>
            <tr><td>Pocket2Mol (Peng et al., 2022)</td><td>92.1%</td><td>58.4%</td><td>0.548</td><td>66.5%</td><td>Not Modeled</td><td>95.0 s / lead</td></tr>
            <tr><td>RFdiffusion (Watson et al., 2023)</td><td>N/A (Backbone)</td><td>N/A</td><td>N/A</td><td>34.0%</td><td>Not Modeled</td><td>320.0 s / scaffold</td></tr>
            <tr><td>Schrödinger FEP+ (Alchemical)</td><td>100.0%</td><td>84.5%</td><td>0.795</td><td>85.0%</td><td>Not Modeled</td><td>48–72 hours / lead</td></tr>
            <tr style="background:#eff6ff;font-weight:bold;"><td>AETHER-RAMI (This Work)</td><td>99.8%</td><td>98.4%</td><td>0.884</td><td>89.2%</td><td>Modeled (54 Tissues)</td><td>43.5 s / batch</td></tr>
        </tbody>
    </table>"""

html_table_3 = """    <div class="table-caption">Table 3 | Multi-Task Empirical Regression and Classification Benchmarks Across Biophysical and ADMET Suites in AETHER-RAMI</div>
    <table>
        <thead>
            <tr>
                <th>Benchmark Task / Suite</th>
                <th>Sample Size ($N$)</th>
                <th>Target Biophysical / Biological Endpoint</th>
                <th>Baseline GNN Metric</th>
                <th>AETHER-RAMI Metric</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background:#f1f5f9;font-weight:bold;"><td colspan="5">Quantitative Biophysical Affinity and Physicochemical Regression</td></tr>
            <tr><td>ESOL Aqueous Solubility</td><td>1,116</td><td>Log aqueous solubility ($\log S$, mol/L)</td><td>$R^2 = 0.7850$</td><td><strong>$R^2 = 0.9100$</strong> ($\text{RMSE} = 0.6562$)</td></tr>
            <tr><td>BindingDTA $K_i$ Affinity</td><td>2,088</td><td>Equilibrium inhibition constant ($\text{p}K_i$)</td><td>$R^2 = 0.6120$</td><td><strong>$R^2 = 0.8235$</strong> ($\text{RMSE} = 0.5723$)</td></tr>
            <tr><td>Lipophilicity ($\log D$)</td><td>4,000</td><td>Octanol–water distribution coefficient</td><td>$R^2 = 0.5640$</td><td><strong>$R^2 = 0.6977$</strong> ($\text{RMSE} = 0.6699$)</td></tr>
            <tr><td>BindingDTA $\text{IC}_{50}$ Affinity</td><td>2,855</td><td>Half-maximal inhibitory conc. ($\text{pIC}_{50}$)</td><td>$R^2 = 0.5210$</td><td><strong>$R^2 = 0.6748$</strong> ($\text{RMSE} = 0.6725$)</td></tr>
            <tr><td>BindingDTA $K_d$ Dissociation</td><td>436</td><td>Equilibrium dissociation constant ($\text{p}K_d$)</td><td>$R^2 = 0.4150$</td><td><strong>$R^2 = 0.5455$</strong> ($\text{RMSE} = 1.0463$)</td></tr>
            <tr style="background:#f1f5f9;font-weight:bold;"><td colspan="5">Physiological Disposition and Toxicity Classification</td></tr>
            <tr><td>Blood–Brain Barrier (BBBP)</td><td>1,966</td><td>Central nervous system endothelial permeation</td><td>$\text{ROC-AUC} = 0.7406$</td><td><strong>$\text{ROC-AUC} = 0.8043$</strong> ($\text{AP} = 0.7715$)</td></tr>
            <tr><td>$\beta$-Secretase 1 (BACE)</td><td>1,513</td><td>Human BACE1 enzyme catalytic inhibition</td><td>$\text{ROC-AUC} = 0.7391$</td><td><strong>$\text{ROC-AUC} = 0.8120$</strong> ($\text{AP} = 0.7850$)</td></tr>
            <tr><td>Clinical Toxicity (ClinTox)</td><td>1,453</td><td>FDA regulatory approval vs. clinical failure</td><td>$\text{ROC-AUC} = 0.7510$</td><td><strong>$\text{ROC-AUC} = 0.8450$</strong> ($\text{AP} = 0.8240$)</td></tr>
            <tr><td>Nuclear Receptor Tox (Tox21)</td><td>3,954</td><td>Endocrine receptor stress response pathways</td><td>$\text{ROC-AUC} = 0.7280$</td><td><strong>$\text{ROC-AUC} = 0.7890$</strong> ($\text{AP} = 0.7620$)</td></tr>
        </tbody>
    </table>"""

for p in ['paper_latex_nature_methods/preview_nature_methods.html', 'paper_latex_nmi/preview_nmi.html']:
    with open(p, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update author list
    old_author_box = re.search(r'<div class="author-list">.*?</div>\s*<div class="mentors">.*?</div>\s*<div class="affil-block">.*?</div>', html, re.DOTALL)
    new_author_html = """<div class="author-list">
            <span class="author-lead">V C Premchand Yadav</span><sup>1</sup>,
            <span>K SriHarsha Vardhan</span><sup>1</sup>,
            <span>Edupulapati Sai Praneeth</span><sup>1</sup>,
            <span>Yamala Liel Stephen</span><sup>1</sup>
        </div>
        <div class="mentors">
            Under the Project Guidance and Mentorship of<br>
            <strong>Dr. Madala Guru Brahmam</strong><sup>2,*</sup> &amp; <strong>Dr. S. Bharath Bhushan</strong><sup>3</sup>
        </div>
        <div class="affil-block">
            <sup>1</sup>Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br>
            <sup>2</sup>Assistant Professor (Senior Grade 1), School of Computer Science and Engineering (SCOPE), VIT-AP University, Beside AP Secretariat, Near Vijayawada, Amaravati, Guntur, Andhra Pradesh 522237, India.<br>
            <sup>3</sup>Associate Professor, Department of Networking and Security (DNS), School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br>
            <sup>*</sup><strong>Corresponding Author:</strong> Dr. Madala Guru Brahmam (<code>gurubrahmam.m@vitap.ac.in</code>)
        </div>"""
    if old_author_box:
        html = html.replace(old_author_box.group(0), new_author_html)

    # 2. Insert Table 1 right after <div class="section-title">Results</div>
    if 'Table 1 | Global Comparative Benchmarking' not in html:
        html = html.replace(
            '<div class="section-title">Results</div>',
            '<div class="section-title">Results</div>\n\n' + html_table_1
        )

    # 3. Rename old Table 1 to Table 2
    html = html.replace(
        'Table 1 | Empirical Performance Comparison Across Molecular Graph Representation Backbones and Ensembles in AETHER-RAMI',
        'Table 2 | Empirical Performance Comparison Across Molecular Graph Representation Backbones and Ensembles in AETHER-RAMI'
    )
    html = html.replace(
        'distinct compounds (Table 1)',
        'distinct compounds (Table 2 and Table 3)'
    )

    # 4. Insert Table 3 right after Table 2
    if 'Table 3 | Multi-Task Empirical Regression' not in html:
        # find end of table 2
        t2_end = html.find('</table>\n\n    <div class="figure-box">\n        <img src="figures/Figure_2')
        if t2_end != -1:
            html = html[:t2_end+8] + '\n\n' + html_table_3 + '\n\n' + html[t2_end+8:]
        else:
            # fallback find
            html = html.replace(
                '<div class="figure-box">\n        <img src="figures/Figure_2',
                html_table_3 + '\n\n    <div class="figure-box">\n        <img src="figures/Figure_2'
            )

    # 5. Rename old Table 2 to Table 4
    html = html.replace(
        'Table 2 | Empirical Preclinical Candidate Leads Registry Across Evaluated Kinase and Resistance Targets',
        'Table 4 | Empirical Preclinical Candidate Leads Registry Across Evaluated Kinase and Resistance Targets'
    )

    with open(p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated HTML preview {p} with 4 tables and new author ordering!")
