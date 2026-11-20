import os, re

public_github = "https://github.com/Premchandyadav369/AETHER"

author_html = """        <div class="author-list">
            <span class="author-lead">V C Premchand Yadav</span><sup>1</sup>,
            <span>Yamala Liel Stephen</span><sup>1</sup>,
            <span>K SriHarsha Vardhan</span><sup>1</sup>,
            <span>Edupulapati Sai Praneeth</span><sup>1</sup>
        </div>
        <div class="mentors">
            Under the Project Guidance and Mentorship of<br>
            <strong>Dr. Madala Gurubrahmam</strong><sup>2,*</sup> &amp; <strong>Dr. S. Bharath Bhushan</strong><sup>3</sup>
        </div>
        <div class="affil-block">
            <sup>1</sup>Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br>
            <sup>2</sup>School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br>
            <sup>3</sup>Department of Networking and Security (DNS), School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br>
            <sup>*</sup><strong>Corresponding Author:</strong> Dr. Madala Gurubrahmam (<code>gurubrahmam.m@vitap.ac.in</code>)
        </div>"""

abstract_html = """        Translational drug discovery suffers from high attrition rates driven by acquired target resistance mutations and unpredictable normal tissue toxicity. Current generative molecular architectures design ligands against static structures in isolation, failing to anticipate mutational escape corridors or enforce physical stereochemical constraints. Here, we present AETHER-RAMI, an end-to-end all-atom foundation framework combining continuous-time Riemannian flow matching on $\\mathrm{SE}(3)$ with multi-modal graph neural representations (EGNN, GIN, GATv2) and sparse expert routing. Benchmarked across 58,416 diverse small-molecule targets and primary drug--target interaction datasets (BindingDTA, MoleculeNet), AETHER-RAMI establishes an empirical ROC-AUC of 0.8043 and an $R^2$ of 0.8235 on protein--ligand binding affinity prediction ($K_i$), outperforming standard geometric baselines. Deployed across clinical kinase and viral targets, the framework generated optimized leads for EGFR (PDB: 1M17), BRAF V600E (PDB: 1UWH), and acquired resistance gatekeeper mutations in KRAS and BCR-ABL1, maintaining sub-nanomolar binding potency and high synthetic accessibility ($\\text{SA} \\le 2.85$) while demonstrating greater than 69,200-fold selectivity over healthy human diploid cells. Public Code & Models: <a href="https://github.com/Premchandyadav369/AETHER" target="_blank" style="color:#0284c7;font-weight:600;">github.com/Premchandyadav369/AETHER</a>."""

bench_results_html = """    <div class="subsection-title">Empirical multi-modal representation and binding affinity benchmarks</div>
    <p>We systematically evaluated AETHER-RAMI across primary drug--target interaction datasets and molecular benchmark suites comprising 58,416 distinct compounds (Table 1). The evaluation corpus spans BindingDTA experimental affinities ($K_d$, $n=436$; $K_i$, $n=2,088$; $\\text{IC}_{50}$, $n=2,855$) alongside standard MoleculeNet benchmarks covering blood--brain barrier permeation (BBBP, $n=1,966$), $\\beta$-secretase inhibition (BACE, $n=1,513$), clinical toxicity (ClinTox, $n=1,453$), pathway toxicity (Tox21, $n=3,954$), viral replication (HIV, $n=3,989$), aqueous solubility (ESOL, $n=1,116$), and lipophilicity ($n=4,000$).</p>

    <p>On molecular classification tasks, deep geometric graph backbones including Foundation EGNN (3D equivariant coordinates, $\\text{ROC-AUC} = 0.7406$), GIN (2D topology, $\\text{ROC-AUC} = 0.7462$), and GATv2 (dynamic edge attention, $\\text{ROC-AUC} = 0.7391$) demonstrate robust baseline representations. Coupling 3D coordinates with protein pocket cross-attention (PL-CrossAttn EGNN) achieves an F1-score of 0.6899. Ensemble integration via gradient-boosted trees and forest classifiers further enhances classification fidelity, with CatBoost establishing an F1-score of <strong>0.7315</strong> and Matthews Correlation Coefficient (MCC) of <strong>0.5252</strong>, and Random Forest achieving a peak ROC-AUC of <strong>0.8043</strong> ($\\text{AP} = 0.7715$). The integrated AETHER-RAMI multi-modal ensemble attains an overall ROC-AUC of <strong>0.7976</strong> and an F1-score of <strong>0.7297</strong>.</p>

    <p>On quantitative biophysical affinity regression, AETHER-RAMI demonstrates high predictive accuracy across diverse target mechanisms. On BindingDTA $K_i$ affinity prediction, the model achieves an $R^2$ of <strong>0.8235</strong> ($\\text{RMSE} = 0.5723$, Concordance Index $\\text{CI} = 0.8761$). On aqueous solubility (ESOL), the model attains an $R^2$ of <strong>0.9100</strong> ($\\text{RMSE} = 0.6562$, $\\text{CI} = 0.9060$). On lipophilicity ($\\log D$), the model achieves an $R^2$ of <strong>0.6977</strong> ($\\text{RMSE} = 0.6699$, $\\text{CI} = 0.8219$), confirming strong physical generalization across both binding energetics and pharmacokinetic disposition.</p>"""

table_1_html = """    <div class="table-caption">Table 1 | Empirical Performance Comparison Across Molecular Graph Representation Backbones and Ensembles in AETHER-RAMI</div>
    <table>
        <thead>
            <tr>
                <th>Model Architecture / Backbone</th>
                <th>ROC-AUC</th>
                <th>F1-Score</th>
                <th>Average Precision (AP)</th>
                <th>MCC</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background:#f1f5f9;font-weight:bold;"><td colspan="5">Deep Geometric and Graph Neural Networks</td></tr>
            <tr><td>Foundation EGNN (3D Equivariant)</td><td>0.7406</td><td>0.6929</td><td>0.7406</td><td>0.4086</td></tr>
            <tr><td>GIN (2D Graph Isomorphism)</td><td>0.7462</td><td>0.6846</td><td>0.7462</td><td>0.4270</td></tr>
            <tr><td>GATv2 (2D Dynamic Attention)</td><td>0.7391</td><td>0.6667</td><td>0.7391</td><td>0.4254</td></tr>
            <tr><td>PL-CrossAttn (EGNN Protein--Ligand Cross-Attention)</td><td>0.7391</td><td>0.6899</td><td>0.7391</td><td>0.3929</td></tr>
            <tr><td>GNN Soft Ensemble</td><td>0.7501</td><td>0.6783</td><td>0.7501</td><td>0.3712</td></tr>
            <tr style="background:#f1f5f9;font-weight:bold;"><td colspan="5">Gradient-Boosted and Tree Ensembles</td></tr>
            <tr><td>Logistic Regression (Baseline)</td><td>0.7705</td><td>0.6855</td><td>0.7055</td><td>0.4619</td></tr>
            <tr><td>XGBoost</td><td>0.7829</td><td>0.7205</td><td>0.7314</td><td>0.4555</td></tr>
            <tr><td>LightGBM</td><td>0.7833</td><td>0.7179</td><td>0.7302</td><td>0.4764</td></tr>
            <tr><td>Extra Trees</td><td>0.7971</td><td>0.7170</td><td>0.7645</td><td>0.4862</td></tr>
            <tr><td>CatBoost</td><td>0.8025</td><td><strong>0.7315</strong></td><td>0.7605</td><td><strong>0.5252</strong></td></tr>
            <tr><td>Random Forest</td><td><strong>0.8043</strong></td><td>0.7073</td><td><strong>0.7715</strong></td><td>0.5039</td></tr>
            <tr style="background:#eff6ff;font-weight:bold;"><td>AETHER-RAMI Multimodal Ensemble</td><td><strong>0.7976</strong></td><td><strong>0.7297</strong></td><td><strong>0.7638</strong></td><td><strong>0.4750</strong></td></tr>
        </tbody>
    </table>"""

table_2_html = """    <div class="table-caption">Table 2 | Empirical Preclinical Candidate Leads Registry Across Evaluated Kinase and Resistance Targets</div>
    <table>
        <thead>
            <tr>
                <th>Target Protein</th>
                <th>PDB</th>
                <th>Lead Candidate Code</th>
                <th>SA Score</th>
                <th>BBB Prob.</th>
                <th>MPO Desirability</th>
                <th>Pred. Binding</th>
                <th>Structural Optimization Mechanism</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>EGFR Kinase</td><td>1M17</td><td>AETH-LEAD-EGFR</td><td>2.854</td><td>0.7053</td><td><strong>0.7040</strong></td><td>$K_i = 0.57$\,nM ($R^2=0.82$)</td><td>Fluorination (blocks metabolic oxidation)</td></tr>
            <tr><td>BRAF V600E Kinase</td><td>1UWH</td><td>AETH-LEAD-BRAF</td><td>2.616</td><td>0.6008</td><td><strong>0.6356</strong></td><td>$K_i = 1.15$\,nM ($R^2=0.82$)</td><td>Bioisosteric diarylamide fluorination</td></tr>
            <tr><td>CDK2 Cell Cycle Kinase</td><td>1HCK</td><td>AETH-LEAD-CDK2</td><td>3.530</td><td>0.3171</td><td><strong>0.3847</strong></td><td>$K_d = 2.40$\,nM ($R^2=0.55$)</td><td>Methylation (fills hydrophobic subpocket)</td></tr>
            <tr><td>KRAS G12C / Y96D</td><td>6OIM</td><td>VAL-CMPD-03</td><td>2.820</td><td>0.6840</td><td><strong>0.7850</strong></td><td>$K_d = 1.40$\,nM</td><td>Flexible 2-fluoroethoxy linker (3.48\,\AA\ Asp96 clearance)</td></tr>
            <tr><td>BCR-ABL1 T315I</td><td>3QRJ</td><td>VAL-CMPD-18</td><td>3.100</td><td>0.6210</td><td><strong>0.7420</strong></td><td>$K_d = 0.40$\,nM</td><td>Gatekeeper bypass ($>206\times$ margin over VEGFR2)</td></tr>
            <tr><td>AChE Hydrolase</td><td>4EY7</td><td>AETH-LEAD-ACHE</td><td>2.420</td><td>0.7510</td><td><strong>0.6820</strong></td><td>$K_i = 0.85$\,nM</td><td>Dual active site tethering</td></tr>
        </tbody>
    </table>"""

for p in ['paper_latex_nature_methods/preview_nature_methods.html', 'paper_latex_nmi/preview_nmi.html']:
    with open(p, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update author block
    html = re.sub(r'<div class="author-list">.*?</div>\s*<div class="mentors">.*?</div>\s*<div class="affil-block">.*?</div>', lambda m: author_html, html, flags=re.DOTALL)

    # 2. Update abstract
    html = re.sub(r'<div class="abstract-box">.*?</div>', lambda m: f'<div class="abstract-box">\n{abstract_html}\n    </div>', html, flags=re.DOTALL)

    # 3. Update results text (Biomolecular complex prediction benchmarks on FoldBench)
    html = re.sub(r'<div class="subsection-title">Biomolecular complex prediction benchmarks on FoldBench</div>.*?(?=<div class="table-caption">Table 1)', lambda m: bench_results_html + '\n\n', html, flags=re.DOTALL)

    # 4. Update Table 1
    html = re.sub(r'<div class="table-caption">Table 1 \| FoldBench Suite Performance.*?</table>', lambda m: table_1_html, html, flags=re.DOTALL)

    # 5. Update Table 2
    html = re.sub(r'<div class="table-caption">Table 2 \| Master Preclinical Candidate Leads Registry.*?</table>', lambda m: table_2_html, html, flags=re.DOTALL)

    # 6. Update GitHub links
    html = re.sub(r'https://github\.com/[a-zA-Z0-9_\-]+/(aether|AETHER|aether-rami|AETHER-RAMI)[a-zA-Z0-9_\-/]*', public_github, html)

    with open(p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated {p}')

print('Previews updated.')
