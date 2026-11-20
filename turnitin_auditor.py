import re
import math
import json
from collections import Counter

def extract_prose_from_latex(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Exclude bibliography
    if r'\begin{thebibliography}' in content:
        content = content.split(r'\begin{thebibliography}')[0]
    
    # Remove comments
    lines = [l for l in content.split('\n') if not l.strip().startswith('%')]
    text = '\n'.join(lines)
    
    # Remove math environments
    text = re.sub(r'\\begin\{equation\*?\}.*?\\end\{equation\*?\}', ' [EQUATION] ', text, flags=re.DOTALL)
    text = re.sub(r'\\begin\{align\*?\}.*?\\end\{align\*?\}', ' [EQUATION] ', text, flags=re.DOTALL)
    text = re.sub(r'\$\$.*?\$\$', ' [EQUATION] ', text, flags=re.DOTALL)
    text = re.sub(r'\$.*?\$', ' [MATH] ', text, flags=re.DOTALL)
    
    # Remove tables and figures
    text = re.sub(r'\\begin\{table\*?\}.*?\\end\{table\*?\}', ' [TABLE] ', text, flags=re.DOTALL)
    text = re.sub(r'\\begin\{figure\*?\}.*?\\end\{figure\*?\}', ' [FIGURE] ', text, flags=re.DOTALL)
    
    # Remove common LaTeX commands but keep inner text
    text = re.sub(r'\\cite\{[^}]*\}', '', text)
    text = re.sub(r'\\ref\{[^}]*\}', '', text)
    text = re.sub(r'\\label\{[^}]*\}', '', text)
    text = re.sub(r'\\(section|subsection|subsubsection)\*?\{([^}]*)\}', r'\n\2\n', text)
    text = re.sub(r'\\textbf\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\emph\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\textit\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\texttt\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\mathrm\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\(begin|end)\{[^}]*\}', '', text)
    text = re.sub(r'\\[a-zA-Z]+', ' ', text)
    text = re.sub(r'[{}]', '', text)
    
    # Clean whitespace
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n\s*\n+', '\n\n', text).strip()
    return text

def analyze_prose(text):
    # Sentence splitting
    raw_sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9])', text)
    sentences = [s.strip() for s in raw_sentences if len(s.strip().split()) >= 3 and not s.strip().startswith('[')]
    
    words = re.findall(r'\b[a-zA-Z0-9_-]+\b', text.lower())
    total_words = len(words)
    
    # Sentence length statistics (Burstiness)
    sent_lengths = [len(re.findall(r'\b[a-zA-Z0-9_-]+\b', s)) for s in sentences]
    mean_length = sum(sent_lengths) / len(sent_lengths) if sent_lengths else 0
    variance = sum((l - mean_length)**2 for l in sent_lengths) / len(sent_lengths) if sent_lengths else 0
    std_dev = math.sqrt(variance)
    
    # Lexical Diversity
    vocab = set(words)
    ttr = len(vocab) / total_words if total_words else 0
    
    # Simpson's Diversity Index
    counts = Counter(words)
    simpson = sum(n * (n - 1) for n in counts.values()) / (total_words * (total_words - 1)) if total_words > 1 else 0
    simpson_diversity = 1 - simpson
    
    # Length buckets (short < 15, medium 15-25, long > 25)
    short_sents = sum(1 for l in sent_lengths if l < 15)
    med_sents = sum(1 for l in sent_lengths if 15 <= l <= 25)
    long_sents = sum(1 for l in sent_lengths if l > 25)
    
    return {
        'total_words': total_words,
        'total_sentences': len(sentences),
        'mean_sentence_length': round(mean_length, 2),
        'sentence_length_std_dev': round(std_dev, 2),
        'burstiness_index': round(std_dev / mean_length if mean_length else 0, 3),
        'type_token_ratio': round(ttr, 3),
        'simpson_diversity': round(simpson_diversity, 4),
        'short_sentences_pct': round(short_sents / len(sentences) * 100, 1) if sentences else 0,
        'medium_sentences_pct': round(med_sents / len(sentences) * 100, 1) if sentences else 0,
        'long_sentences_pct': round(long_sents / len(sentences) * 100, 1) if sentences else 0,
        'sentences': sentences,
        'sent_lengths': sent_lengths
    }

main_text = extract_prose_from_latex('paper_latex_nature_methods/main.tex')
supp_text = extract_prose_from_latex('paper_latex_nature_methods/supplementary_information.tex')

main_stats = analyze_prose(main_text)
supp_stats = analyze_prose(supp_text)

print('=== MAIN TEXT METRICS ===')
for k, v in main_stats.items():
    if k not in ['sentences', 'sent_lengths']:
        print(f'  {k}: {v}')

print('\n=== SUPPLEMENTARY TEXT METRICS ===')
for k, v in supp_stats.items():
    if k not in ['sentences', 'sent_lengths']:
        print(f'  {k}: {v}')
