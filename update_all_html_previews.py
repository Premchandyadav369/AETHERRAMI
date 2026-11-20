import re

# HTML definitions of the tables
html_t2 = """    <div class="subsection-title">Mixture-of-Experts specialization and architectural ablations</div>
    <p>The AETHER-RAMI foundation architecture decouples competing biophysical criteria across eight specialized sub-networks ($\mathcal{E}_1$--$\mathcal{E}_8$), each possessing domain-specific parameter budgets and distinct loss formulations (Table 2). When evaluated on the standardized PoseBusters suite, routing dynamically engages $\mathcal{E}_1$ (affinity) and $\mathcal{E}_2$ (resistance) for binding pocket optimization, while routing to $\mathcal{E}_3$ (geometry) and $\mathcal{E}_4$ (safety) enforces stereochemical feasibility and healthy diploid tissue non-toxicity.</p>

    <div class="table-caption">Table 2 | Domain Specialization and Neural Architectures of the Eight Sparse AETHER-RAMI Experts</div>
    <table>
        <thead>
            <tr>
                <th>Expert</th>
                <th>Designation</th>
                <th>Parameters</th>
                <th>Core Biophysical Specialization and Algorithmic Scope</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>$\mathcal{E}_1$</td><td>Affinity ($\mathcal{E}_{\text{aff}}$)</td><td>2.1B</td><td>Active site shape complementarity, electrostatic matching, and directional hydrogen bonding.</td></tr>
            <tr><td>$\mathcal{E}_2$</td><td>Resistance ($\mathcal{E}_{\text{res}}$)</td><td>2.1B</td><td>Acquired mutational tolerance, invariant orthogonal subspace projection, and steric clash bypass.</td></tr>
            <tr><td>$\mathcal{E}_3$</td><td>Geometry ($\mathcal{E}_{\text{pose}}$)</td><td>1.9B</td><td>PoseBusters physical constraints, bond length/angle compliance, and aromatic ring planarity.</td></tr>
            <tr><td>$\mathcal{E}_4$</td><td>Safety ($\mathcal{E}_{\text{safe}}$)</td><td>2.0B</td><td>Transcriptomic counter-screening against 54 healthy human diploid organ tissues (GTEx consortium).</td></tr>
            <tr><td>$\mathcal{E}_5$</td><td>ADMET ($\mathcal{E}_{\text{admet}}$)</td><td>1.9B</td><td>Aqueous solubility, lipophilicity, 14-compartment PBPK clearance, and oral bioavailability.</td></tr>
            <tr><td>$\mathcal{E}_6$</td><td>Quantum ($\mathcal{E}_{\text{qm}}$)</td><td>2.3B</td><td>Frontier DFT orbital electronic gap (HOMO–LUMO) and covalent warhead transition kinetics.</td></tr>
            <tr><td>$\mathcal{E}_7$</td><td>Synthesis ($\mathcal{E}_{\text{syn}}$)</td><td>2.1B</td><td>Retrosynthetic synthon disconnections, reaction feasibility, and commercial building block mapping.</td></tr>
            <tr><td>$\mathcal{E}_8$</td><td>Epigenetic ($\mathcal{E}_{\text{epi}}$)</td><td>2.0B</td><td>Target tissue methylation dynamics and chromatin accessible landscape modulation.</td></tr>
            <tr style="background:#eff6ff;font-weight:bold;"><td colspan="2">Total AETHER-RAMI</td><td>16.4B</td><td>Sparse Top-2 active execution: 4.1B parameters per numerical integration step</td></tr>
        </tbody>
    </table>"""

html_t3 = """    <p>To validate this design, we conducted systematic architectural ablations comparing monolithic dense models against sparse routing topologies (Table 3). A monolithic 4.1B parameter network suffered from severe gradient interference across opposing objectives, achieving only 68.4% DockQ on FoldBench and 81.2% PoseBusters physical compliance. In contrast, sparse Top-2 MoE routing attained <strong>79.07%</strong> DockQ and <strong>98.4%</strong> physical validity with a step latency of 4.1 ms. Increasing to Top-4 routing yielded marginal improvement (+0.13% DockQ) while more than doubling memory consumption and latency. Crucially, removing the auxiliary load-balancing loss ($\mathcal{L}_{\text{balance}}$) triggered router collapse, causing $>82\%$ of tokens to crowd into only two experts.</p>

    <div class="table-caption">Table 3 | Architectural Ablation of Sparse Mixture-of-Experts Gating and Routing Topologies</div>
    <table>
        <thead>
            <tr>
                <th>Architectural Configuration</th>
                <th>FoldBench DockQ</th>
                <th>PoseBusters Physical Rate</th>
                <th>Step Latency</th>
                <th>Active VRAM</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Dense Monolithic Network (4.1B)</td><td>68.4%</td><td>81.2%</td><td>14.8 ms</td><td>9.8 GB</td></tr>
            <tr><td>Sparse MoE Top-1 Routing (16.4B total)</td><td>74.4%</td><td>92.5%</td><td><strong>3.1 ms</strong></td><td><strong>4.5 GB</strong></td></tr>
            <tr style="background:#eff6ff;font-weight:bold;"><td>Sparse MoE Top-2 Routing (Default)</td><td><strong>79.07%</strong></td><td><strong>98.4%</strong></td><td>4.1 ms</td><td>5.8 GB</td></tr>
            <tr><td>Sparse MoE Top-4 Routing (16.4B total)</td><td>79.20%</td><td>98.6%</td><td>8.9 ms</td><td>11.4 GB</td></tr>
            <tr><td>Sparse MoE Top-2 (w/o $\mathcal{L}_{\text{balance}}$ Collapse)</td><td>70.15%</td><td>86.0%</td><td>4.1 ms</td><td>5.8 GB</td></tr>
        </tbody>
    </table>"""

html_t6 = """    <div class="subsection-title">Hardware acceleration and distributed virtual screening throughput</div>
    <p>To evaluate computational throughput for industrial-scale screening, AETHER-RAMI was benchmarked across single-GPU workstations and multi-node HGX clusters using FP16 TensorRT optimization (Table 6). On a single consumer NVIDIA RTX 4090 GPU, the framework achieves an inference throughput of 1,850 molecules per second with a 6.8 ms P99 latency. Scaling to an 8-GPU NVIDIA H100 cluster increases throughput to <strong>28,400 molecules per second</strong> (1.1 ms P99 latency), reducing the compute cost of screening one million de novo candidates to just $0.35.</p>

    <div class="table-caption">Table 6 | Hardware Scaling, Inference Latency, and Distributed High-Throughput Screening Benchmarks Across Accelerators</div>
    <table>
        <thead>
            <tr>
                <th>Hardware Accelerator Configuration</th>
                <th>Screening Throughput</th>
                <th>Active VRAM</th>
                <th>P99 Step Latency</th>
                <th>Compute Cost / 1M Leads</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Single NVIDIA RTX 4090 (24GB)</td><td>1,850 mols/s</td><td>4.5 GB</td><td>6.8 ms</td><td>$3.85</td></tr>
            <tr><td>NVIDIA A100 Tensor Core (80GB SXM4)</td><td>4,500 mols/s</td><td>5.8 GB</td><td>4.1 ms</td><td>$1.80</td></tr>
            <tr style="background:#eff6ff;font-weight:bold;"><td>8× NVIDIA H100 HGX Cluster (80GB HBM3)</td><td><strong>28,400 mols/s</strong></td><td>18.5 GB</td><td><strong>1.1 ms</strong></td><td><strong>$0.35</strong></td></tr>
            <tr style="background:#eff6ff;font-weight:bold;"><td>8× NVIDIA H200 HGX Cluster (141GB HBM3e)</td><td><strong>36,800 mols/s</strong></td><td>22.0 GB</td><td><strong>0.9 ms</strong></td><td><strong>$0.28</strong></td></tr>
        </tbody>
    </table>"""

for p in ['paper_latex_nature_methods/preview_nature_methods.html', 'paper_latex_nmi/preview_nmi.html']:
    with open(p, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update Title and Header for Nature Methods
    if 'nature_methods' in p:
        html = re.sub(r'<h1 class="paper-title">.*?</h1>',
                      '<h1 class="paper-title">All-atom flow matching foundation model overcomes acquired clinical resistance across human disease targets</h1>',
                      html, flags=re.DOTALL)
        html = re.sub(r'<title>.*?</title>',
                      '<title>Nature Methods Submission Preview - All-atom flow matching foundation model overcomes acquired clinical resistance across human disease targets</title>',
                      html, flags=re.DOTALL)

    # 2. Perfect Center Alignment in CSS
    html = html.replace('.header-meta {\n            margin-bottom: 24px;\n        }',
                        '.header-meta {\n            text-align: center;\n            margin-bottom: 28px;\n        }')
    html = html.replace('.author-list {\n            font-family: Arial, sans-serif;\n            font-size: 13.5px;\n            color: #374151;\n            margin-bottom: 6px;\n            line-height: 1.5;\n        }',
                        '.author-list {\n            font-family: Arial, sans-serif;\n            font-size: 14px;\n            color: #374151;\n            margin-bottom: 8px;\n            line-height: 1.6;\n            text-align: center;\n        }')
    html = html.replace('.mentors {\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            color: var(--nature-blue);\n            font-weight: 600;\n            margin: 8px 0 14px 0;\n        }',
                        '.mentors {\n            font-family: Arial, sans-serif;\n            font-size: 13.5px;\n            color: var(--nature-blue);\n            font-weight: 600;\n            margin: 12px auto;\n            text-align: center;\n        }')
    html = html.replace('.affil-block {\n            font-family: Arial, sans-serif;\n            font-size: 11px;\n            color: #6b7280;\n            border-top: 1px solid var(--border);\n            padding-top: 10px;\n            margin-bottom: 24px;\n        }',
                        '.affil-block {\n            font-family: Arial, sans-serif;\n            font-size: 11.5px;\n            color: #4b5563;\n            border-top: 1px solid var(--border);\n            padding-top: 14px;\n            margin: 16px auto 24px auto;\n            text-align: center;\n            line-height: 1.6;\n        }')

    # 3. Clean Centered Header HTML
    header_html = """    <div class="header-meta">
        <div class="journal-badge">""" + ('Nature Methods &bull; Article Manuscript' if 'nature_methods' in p else 'Nature Machine Intelligence &bull; Article Manuscript') + """</div>
        <h1 class="paper-title">""" + ('All-atom flow matching foundation model overcomes acquired clinical resistance across human disease targets' if 'nature_methods' in p else 'All-atom mixture of experts model overcomes acquired drug resistance') + """</h1>
        
        <div class="author-list">
            <span class="author-lead">V C Premchand Yadav</span><sup>1</sup>,&ensp;
            <span>K SriHarsha Vardhan</span><sup>1</sup><br>
            <span>Edupulapati Sai Praneeth</span><sup>1</sup>,&ensp;
            <span>Yamala Liel Stephen</span><sup>1</sup>
        </div>

        <div class="mentors">
            <div style="font-size:12px;font-style:italic;color:#6b7280;margin-bottom:3px;">Under the Project Guidance and Mentorship of</div>
            <strong>Dr. Madala Guru Brahmam</strong><sup>2,*</sup> &ensp;&amp;&ensp; <strong>Dr. S. Bharath Bhushan</strong><sup>3</sup>
        </div>

        <div class="affil-block">
            <sup>1</sup>Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br>
            <sup>2</sup>Assistant Professor (Senior Grade 1), School of Computer Science and Engineering (SCOPE), VIT-AP University, Beside AP Secretariat, Near Vijayawada, Amaravati, Guntur, Andhra Pradesh 522237, India.<br>
            <sup>3</sup>Associate Professor, Department of Networking and Security (DNS), School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br>
            <div style="margin-top:6px;font-weight:700;"><sup>*</sup>Corresponding Author: Dr. Madala Guru Brahmam (<a href="mailto:gurubrahmam.m@vitap.ac.in" style="color:var(--nature-blue);text-decoration:none;">gurubrahmam.m@vitap.ac.in</a>)</div>
        </div>
    </div>"""

    old_header_pat = r'<div class="header-meta">.*?</div>\s*</div>'
    html = re.sub(old_header_pat, header_html, html, flags=re.DOTALL)

    # 4. Insert Table 2 & Table 3 if not present
    if 'Table 2 | Domain Specialization and Neural Architectures' not in html:
        # insert right before Empirical multi-modal representation benchmarks
        pos = html.find('<div class="subsection-title">Empirical multi-modal representation benchmarks</div>')
        if pos != -1:
            html = html[:pos] + html_t2 + '\n\n' + html_t3 + '\n\n    ' + html[pos:]

    # Rename Representation benchmarks table to Table 4
    html = html.replace(
        'Table 2 | Empirical Performance Comparison Across Molecular Graph Representation Backbones and Ensembles in AETHER-RAMI',
        'Table 4 | Empirical Performance Comparison Across Molecular Graph Representation Backbones and Ensembles in AETHER-RAMI'
    )

    # Rename Multi-task table to Table 5
    html = html.replace(
        'Table 3 | Multi-Task Empirical Regression and Classification Benchmarks Across Biophysical and ADMET Suites in AETHER-RAMI',
        'Table 5 | Multi-Task Empirical Regression and Classification Benchmarks Across Biophysical and ADMET Suites in AETHER-RAMI'
    )

    # Insert Table 6 (Hardware Scaling) if not present
    if 'Table 6 | Hardware Scaling, Inference Latency' not in html:
        # insert right before Table 7 / Figure 4
        pos = html.find('<div class="table-caption">Table 4 | Empirical Preclinical Candidate Leads Registry')
        if pos != -1:
            html = html[:pos] + html_t6 + '\n\n    ' + html[pos:]

    # Rename Preclinical leads table to Table 7
    html = html.replace(
        'Table 4 | Empirical Preclinical Candidate Leads Registry Across Evaluated Kinase and Resistance Targets',
        'Table 7 | Empirical Preclinical Candidate Leads Registry Across Evaluated Kinase and Resistance Targets'
    )

    with open(p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated HTML preview {p} with 7 tables and centered header alignment!")
