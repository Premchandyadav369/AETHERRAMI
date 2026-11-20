import os
import zipfile
import shutil

artifact_dir = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\d53ad909-c2a8-4f5d-80be-4406743e446c"

packages = [
    {
        'dir': 'paper_latex_nature_methods',
        'zip_name': 'AETHER_RAMI_Nature_Methods_Submission_Package.zip'
    },
    {
        'dir': 'paper_latex_nmi',
        'zip_name': 'AETHER_RAMI_NMI_Submission_Package.zip'
    }
]

for pkg in packages:
    src_dir = pkg['dir']
    zip_name = pkg['zip_name']
    local_zip_path = os.path.join(src_dir, zip_name)
    artifact_zip_path = os.path.join(artifact_dir, zip_name)
    
    # Create zip
    with zipfile.ZipFile(local_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(src_dir):
            for file in files:
                # Avoid nesting the zip itself or temporary scripts
                if file.endswith('.zip') or file.startswith('.'):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, src_dir)
                zipf.write(file_path, arcname)
    
    # Copy to artifact directory
    shutil.copy2(local_zip_path, artifact_zip_path)
    print(f"Created {local_zip_path} ({os.path.getsize(local_zip_path):,} bytes)")
    print(f"Copied to {artifact_zip_path} ({os.path.getsize(artifact_zip_path):,} bytes)")
    
    # List files inside zip
    with zipfile.ZipFile(local_zip_path, 'r') as zipf:
        print(f"  Files inside {zip_name}:")
        for info in zipf.infolist():
            print(f"    - {info.filename} ({info.file_size:,} bytes)")
