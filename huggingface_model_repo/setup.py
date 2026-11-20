from setuptools import setup, find_packages

setup(
    name="aether-rami",
    version="16.0.0-MoE",
    author="Premchand Yadav",
    author_email="premchand.yadav2021@vitap.ac.in",
    description="Unified 16B Mixture-of-Experts Deep Learning for De Novo 3D Biopharmaceutical Discovery & Secondary Resistance Bypass",
    long_description=open("README.md", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    url="https://premchandyadav1.vercel.app/",
    project_urls={
        "Hugging Face": "https://huggingface.co/premchandyadav/aether-rami-esm2-diffsbdd",
        "Author Portfolio": "https://premchandyadav1.vercel.app/",
    },
    packages=find_packages(),
    py_modules=["modeling_aether_rami", "configuration_aether_rami", "pipeline_aether_rami", "foldseek_rag", "pharmacology_engine", "discovery_swarm"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Topic :: Scientific/Engineering :: Bio-Informatics",
        "Topic :: Scientific/Engineering :: Chemistry",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    install_requires=[
        "torch>=2.0.0",
        "transformers>=4.30.0",
        "safetensors>=0.4.0",
        "huggingface_hub>=0.20.0",
        "numpy>=1.24.0",
    ],
    python_requires=">=3.9",
)
