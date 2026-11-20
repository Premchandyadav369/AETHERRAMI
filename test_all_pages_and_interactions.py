import subprocess
import time
import urllib.request
import json
import asyncio
import websockets
import os

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

async def test_page_interactions(url, actions_js):
    print(f"\n=======================================================")
    print(f"TESTING INTERACTIONS ON: {url}")
    print(f"=======================================================")
    
    proc = subprocess.Popen([
        edge_path,
        "--headless",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        url
    ])
    
    await asyncio.sleep(2)
    
    try:
        req = urllib.request.urlopen("http://localhost:9222/json")
        tabs = json.loads(req.read().decode())
        tab = None
        for t in tabs:
            if "localhost:3000" in t.get("url", ""):
                tab = t
                break

        if not tab:
            print("No matching tab!")
            return

        ws_url = tab.get("webSocketDebuggerUrl")
        async with websockets.connect(ws_url) as ws:
            await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
            await ws.send(json.dumps({"id": 2, "method": "Log.enable"}))

            exceptions = []

            # Execute actions after 1.5 seconds
            async def run_actions():
                await asyncio.sleep(1.5)
                for i, action in enumerate(actions_js):
                    print(f"  [ACTION {i+1}] {action['desc']}")
                    eval_msg = {
                        "id": 100 + i,
                        "method": "Runtime.evaluate",
                        "params": {"expression": action['js']}
                    }
                    await ws.send(json.dumps(eval_msg))
                    await asyncio.sleep(1.0)

            asyncio.create_task(run_actions())

            t_end = time.time() + (len(actions_js) * 1.2 + 3)
            while time.time() < t_end:
                try:
                    msg_raw = await asyncio.wait_for(ws.recv(), timeout=0.5)
                    msg = json.loads(msg_raw)
                    method = msg.get("method")
                    if method == "Runtime.exceptionThrown":
                        details = msg.get("params", {}).get("exceptionDetails", {})
                        desc = details.get("exception", {}).get("description", details.get("text", ""))
                        print("  >>> CAUGHT EXCEPTION:", desc)
                        exceptions.append(desc)
                    elif method == "Runtime.consoleAPICalled":
                        c_type = msg.get("params", {}).get("type")
                        if c_type == "error":
                            args = [str(a.get("value", a.get("description", ""))) for a in msg.get("params", {}).get("args", [])]
                            print("  >>> CONSOLE ERROR:", " ".join(args))
                except asyncio.TimeoutError:
                    pass

            if not exceptions:
                print(f"SUCCESS: All actions on {url} executed with 0 exceptions.")
            else:
                print(f"FAILURE: {len(exceptions)} exceptions on {url}!")
    finally:
        proc.terminate()
        await asyncio.sleep(0.5)

async def main():
    # 1. Test drug-library view modes
    drug_actions = [
        {"desc": "Click Real-World Drugs Tab", "js": "document.querySelectorAll('button').forEach(b => { if(b.innerText.includes('Real-World')) b.click(); })"},
        {"desc": "Click Comparison Matrix Tab", "js": "document.querySelectorAll('button').forEach(b => { if(b.innerText.includes('Comparison')) b.click(); })"},
        {"desc": "Click Chemical Matrix Tab", "js": "document.querySelectorAll('button').forEach(b => { if(b.innerText.includes('Chemical Matrix')) b.click(); })"},
        {"desc": "Click Inspect Synthesis Modal", "js": "const btn = document.querySelector('button[class*=\"Inspect Synthesis\"]') || Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Synthesis Scheme')); if(btn) btn.click();"}
    ]
    await test_page_interactions("http://localhost:3000/drug-library", drug_actions)

    # 2. Test Home Page interactions
    home_actions = [
        {"desc": "Click Het ID Preset in Studio", "js": "document.querySelectorAll('button').forEach(b => { if(b.innerText.includes('Het ID')) b.click(); })"},
        {"desc": "Click Residue Preset in Studio", "js": "document.querySelectorAll('button').forEach(b => { if(b.innerText.includes('Residue')) b.click(); })"},
        {"desc": "Click Run Screening in Studio", "js": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Run High-Throughput Screening')); if(btn) btn.click();"},
        {"desc": "Open AI Chat Copilot", "js": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Ask AI Drug Copilot')); if(btn) btn.click();"},
        {"desc": "Click Why This Model in Copilot", "js": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Why This Model') || b.innerText.includes('Why Groq')); if(btn) btn.click();"}
    ]
    await test_page_interactions("http://localhost:3000/", home_actions)

    # 3. Test Benchmarks and Diseases
    await test_page_interactions("http://localhost:3000/benchmarks", [{"desc": "Check Page", "js": "console.log('benchmarks loaded')" }])
    await test_page_interactions("http://localhost:3000/diseases", [{"desc": "Check Page", "js": "console.log('diseases loaded')" }])

asyncio.run(main())
