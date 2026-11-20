#!/usr/bin/env python3
"""
AETHER-RAMI: Automated Hugging Face Hub Model & Spaces Upload Pipeline
Transfers landed model checkpoints, Safetensors weights, model cards, architecture configs,
and deploys an interactive Gradio Space to the Hugging Face Hub.

Usage:
    # 1. Upload Model Repository:
    python upload_to_huggingface.py --repo-id your-username/aether-rami-esm2-diffsbdd --token hf_YourToken

    # 2. Upload BOTH Model and Interactive Web Space:
    python upload_to_huggingface.py --repo-id your-username/aether-rami-esm2-diffsbdd --deploy-space --token hf_YourToken

    # 3. Interactive prompt (no flags needed):
    python upload_to_huggingface.py
"""

import os
import sys
import shutil
import argparse
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description="Upload AETHER-RAMI Model & Web Demo to Hugging Face Hub")
    parser.add_argument(
        "--repo-id", 
        type=str, 
        default="Premchan369/aether-rami-esm2-diffsbdd", 
        help="Hugging Face model repository ID (default: 'Premchan369/aether-rami-esm2-diffsbdd')"
    )
    parser.add_argument(
        "--token", 
        type=str, 
        default=None, 
        help="Hugging Face User Access Token (with write permission). Defaults to HF_TOKEN env var."
    )
    parser.add_argument(
        "--folder", 
        type=str, 
        default="huggingface_model_repo", 
        help="Directory containing the model weights and files to upload."
    )
    parser.add_argument(
        "--deploy-space",
        action="store_true",
        help="Also create and deploy an interactive Gradio Space on Hugging Face."
    )
    parser.add_argument(
        "--space-id",
        type=str,
        default=None,
        help="Hugging Face Space ID (defaults to 'your-username/aether-rami-drug-discovery-demo')."
    )
    parser.add_argument(
        "--private", 
        action="store_true", 
        help="Make the repository private on Hugging Face Hub."
    )
    parser.add_argument(
        "--commit-message", 
        type=str, 
        default="Release AETHER-RAMI 16B-MoE Model Weights & Preclinical PLM Encoders",
        help="Git commit message for the upload."
    )
    
    args = parser.parse_args()
    
    try:
        from huggingface_hub import HfApi
    except ImportError:
        print("[!] Error: 'huggingface_hub' is not installed.")
        print("    Please run: pip install huggingface_hub")
        sys.exit(1)

    print("=" * 80)
    print("  AETHER-RAMI: HUGGING FACE HUB AUTOMATED PACKAGING & DEPLOYMENT")
    print("  Unified Multimodal Deep Learning for Biopharmaceutical Discovery")
    print("=" * 80)

    # 1. Resolve Staging Directory
    staging_dir = Path(args.folder).resolve()
    if not staging_dir.exists():
        print(f"[!] Error: Staging directory not found: {staging_dir}")
        sys.exit(1)

    print(f"\n[+] Staging Directory: {staging_dir}")
    required_files = ["model.safetensors", "config.json", "README.md", "modeling_aether_rami.py", "app.py"]
    missing = [f for f in required_files if not (staging_dir / f).exists()]
    if missing:
        print(f"[!] Warning: Some files are missing: {missing}")
    else:
        print("    All core assets verified (SafeTensors, config.json, README, modeling code, Gradio app).")

    # List files to upload
    files_to_upload = [f for f in staging_dir.rglob("*") if f.is_file() and not "__pycache__" in str(f)]
    total_size_mb = sum(f.stat().st_size for f in files_to_upload) / (1024 * 1024)
    print(f"    Total files to package: {len(files_to_upload)} files (~{total_size_mb:.2f} MB).")

    # 2. Resolve HF Token
    from huggingface_hub import HfFolder
    token = args.token or os.environ.get("HF_TOKEN") or HfFolder.get_token()
    if not token:
        print("\n[*] No Hugging Face token supplied via CLI or HF_TOKEN environment variable.")
        print("    Get your token at: https://huggingface.co/settings/tokens (Role: Write)")
        try:
            token = input("    Enter your Hugging Face Token: ").strip()
        except EOFError:
            print("[!] Error: No token provided.")
            sys.exit(1)
            
    if not token:
        print("[!] Error: Hugging Face Access Token is required to create and upload repositories.")
        sys.exit(1)

    # 3. Authenticate with Hugging Face
    api = HfApi(token=token)
    try:
        user_info = api.whoami()
        username = user_info["name"]
        print(f"\n[+] Authenticated successfully with Hugging Face as: @{username}")
    except Exception as e:
        print(f"[!] Authentication failed: {e}")
        print("    Please verify that your HF token is valid and has 'write' permissions.")
        sys.exit(1)

    # 4. Resolve Model Repo ID
    repo_id = args.repo_id
    if not repo_id:
        default_repo = f"{username}/aether-rami-esm2-diffsbdd"
        print(f"\n[*] Default Model Repo: '{default_repo}'")
        try:
            user_choice = input(f"    Press Enter to use '{default_repo}', or enter custom repo name: ").strip()
            repo_id = user_choice if user_choice else default_repo
        except EOFError:
            repo_id = default_repo

    if "/" not in repo_id:
        repo_id = f"{username}/{repo_id}"

    # 5. Create & Upload Model Repository
    print(f"\n[+] Step 1: Ensuring Model repository exists: https://huggingface.co/{repo_id} (Private: {args.private})")
    try:
        api.create_repo(
            repo_id=repo_id,
            repo_type="model",
            private=args.private,
            exist_ok=True
        )
        print("    Repository ready.")
    except Exception as e:
        print(f"[!] Note during model repo creation: {e}")

    print(f"\n[+] Uploading model weights, configs, notebooks, and figures to Hugging Face...")
    try:
        api.upload_folder(
            folder_path=str(staging_dir),
            repo_id=repo_id,
            repo_type="model",
            commit_message=args.commit_message,
            ignore_patterns=["**/__pycache__/**", "*.pyc"]
        )
        print("\n" + "=" * 80)
        print("  🎉 MODEL UPLOAD SUCCESSFUL!")
        print("=" * 80)
        print(f"  🔗 Model Hub: https://huggingface.co/{repo_id}")
        print(f"  Test with: model = AutoModel.from_pretrained('{repo_id}', trust_remote_code=True)")
    except Exception as e:
        print(f"[!] Model upload failed: {e}")
        sys.exit(1)

    # 6. Optional: Deploy Interactive Space
    deploy_space = args.deploy_space
    if not deploy_space and not args.repo_id:
        try:
            ans = input("\n[?] Would you also like to deploy an Interactive Gradio Web Demo Space on Hugging Face? (y/n) [default: y]: ").strip().lower()
            deploy_space = (ans != "n")
        except EOFError:
            deploy_space = False

    if deploy_space:
        space_id = args.space_id or f"{username}/aether-rami-drug-discovery-demo"
        if "/" not in space_id:
            space_id = f"{username}/{space_id}"
            
        print(f"\n[+] Step 2: Preparing and Deploying Gradio Space: https://huggingface.co/spaces/{space_id}")
        
        # Use existing space staging folder directly
        space_dir = Path("huggingface_space_repo").resolve()
        if not space_dir.exists():
            space_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy2(staging_dir / "app.py", space_dir / "app.py")
            shutil.copy2(staging_dir / "modeling_aether_rami.py", space_dir / "modeling_aether_rami.py")
            shutil.copy2(staging_dir / "config.json", space_dir / "config.json")
            if (staging_dir / "targets_manifest.json").exists():
                shutil.copy2(staging_dir / "targets_manifest.json", space_dir / "targets_manifest.json")

        try:
            api.create_repo(
                repo_id=space_id,
                repo_type="space",
                space_sdk="static",
                private=args.private,
                exist_ok=True
            )
            print(f"    Space repository ready: https://huggingface.co/spaces/{space_id}")
            
            api.upload_folder(
                folder_path=str(space_dir),
                repo_id=space_id,
                repo_type="space",
                commit_message="Deploy AETHER-RAMI Interactive SOTA Multimodal Web Space",
                ignore_patterns=["**/__pycache__/**", "*.pyc"]
            )
            print("\n" + "=" * 80)
            print("  🚀 SPACE DEPLOYMENT SUCCESSFUL!")
            print("=" * 80)
            print(f"  🔗 Live Web Application: https://huggingface.co/spaces/{space_id}")
            print("=" * 80)
        except Exception as e:
            print(f"[!] Space deployment warning: {e}")

if __name__ == "__main__":
    main()
