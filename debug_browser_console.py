import subprocess
import time
import urllib.request
import json
import asyncio
import os

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

print("Starting Edge in headless remote debugging mode...")
proc = subprocess.Popen([
    edge_path,
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "http://localhost:3000/"
])

time.sleep(3)

try:
    req = urllib.request.urlopen("http://localhost:9222/json")
    tabs = json.loads(req.read().decode())
    print("Found tabs:", len(tabs))
    for t in tabs:
        print("Tab:", t.get("title"), t.get("url"), t.get("webSocketDebuggerUrl"))
except Exception as e:
    print("Error fetching tabs:", e)
finally:
    proc.terminate()
