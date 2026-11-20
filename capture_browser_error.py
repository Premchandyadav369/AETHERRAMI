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

async def check_url(target_url):
    print(f"\n=======================================================")
    print(f"CHECKING URL: {target_url}")
    print(f"=======================================================")
    
    proc = subprocess.Popen([
        edge_path,
        "--headless",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        target_url
    ])
    
    await asyncio.sleep(2)
    
    try:
        req = urllib.request.urlopen("http://localhost:9222/json")
        tabs = json.loads(req.read().decode())
        tab = None
        for t in tabs:
            if target_url in t.get("url", ""):
                tab = t
                break
        
        if not tab:
            # pick first http tab
            for t in tabs:
                if "localhost:3000" in t.get("url", ""):
                    tab = t
                    break

        if not tab:
            print("No matching tab found!")
            return

        ws_url = tab.get("webSocketDebuggerUrl")
        print("Connecting to ws:", ws_url)
        
        async with websockets.connect(ws_url) as ws:
            # Enable Runtime & Log
            await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
            await ws.send(json.dumps({"id": 2, "method": "Log.enable"}))
            await ws.send(json.dumps({"id": 3, "method": "Page.enable"}))

            # Listen for 4 seconds
            t_end = time.time() + 4
            exceptions = []
            console_logs = []

            # Also evaluate document.body.innerText to see if "Application error" is on the page!
            async def get_page_text():
                await asyncio.sleep(1.5)
                req_eval = {
                    "id": 999,
                    "method": "Runtime.evaluate",
                    "params": {"expression": "document.body ? document.body.innerText : 'NO BODY'"}
                }
                await ws.send(json.dumps(req_eval))

            asyncio.create_task(get_page_text())

            while time.time() < t_end:
                try:
                    msg_raw = await asyncio.wait_for(ws.recv(), timeout=1.0)
                    msg = json.loads(msg_raw)
                    method = msg.get("method")
                    
                    if method == "Runtime.exceptionThrown":
                        details = msg.get("params", {}).get("exceptionDetails", {})
                        exc_text = details.get("text", "")
                        exc_desc = details.get("exception", {}).get("description", "")
                        exceptions.append(f"{exc_text}: {exc_desc}")
                        print(">>> EXCEPTION THROWN:", exc_text, exc_desc)
                    elif method == "Runtime.consoleAPICalled":
                        c_type = msg.get("params", {}).get("type")
                        args = [str(a.get("value", a.get("description", ""))) for a in msg.get("params", {}).get("args", [])]
                        console_logs.append(f"[{c_type}] " + " ".join(args))
                        if c_type in ("error", "warning"):
                            print(f">>> CONSOLE {c_type.upper()}:", " ".join(args))
                    elif msg.get("id") == 999:
                        res = msg.get("result", {}).get("result", {}).get("value", "")
                        if "Application error" in res:
                            print(">>> FOUND 'Application error' ON PAGE TEXT!")
                            print("Page snippet:", res[:300])
                        else:
                            print(">>> Page loaded successfully! Snippet:", res[:150].replace('\n', ' '))
                except asyncio.TimeoutError:
                    pass

            if not exceptions:
                print("No unhandled exceptions thrown on", target_url)

    except Exception as e:
        print("Error during check:", e)
    finally:
        proc.terminate()
        await asyncio.sleep(0.5)

async def main():
    await check_url("http://localhost:3000/")
    await check_url("http://localhost:3000/drug-library")

asyncio.run(main())
