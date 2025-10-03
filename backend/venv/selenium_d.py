# import subprocess
# import time
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.chrome.service import Service

# def direct_profile_method():
#     """Use Chrome profile directly without remote debugging"""
    
#     print("Step 1: Killing all Chrome processes...")
#     try:
#         subprocess.run(["taskkill", "/f", "/im", "chrome.exe"], capture_output=True)
#         subprocess.run(["taskkill", "/f", "/im", "chromedriver.exe"], capture_output=True)
#         time.sleep(5)
#         print("✅ Chrome killed")
#     except:
#         pass
    
#     print("Step 2: Starting Selenium with direct profile access...")
    
#     try:
#         service = Service(ChromeDriverManager().install())
        
#         chrome_options = Options()
        
#         # Direct profile access (no remote debugging)
#         user_data_dir = r"C:\Users\hp\AppData\Local\Google\Chrome\User Data"
#         chrome_options.add_argument(f"--user-data-dir={user_data_dir}")
#         chrome_options.add_argument("--profile-directory=Default")
        
#         # Essential options for extensions
#         chrome_options.add_argument("--enable-extensions")
#         chrome_options.add_argument("--no-sandbox")
#         chrome_options.add_argument("--disable-dev-shm-usage")
#         chrome_options.add_argument("--disable-blink-features=AutomationControlled")
#         chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
#         chrome_options.add_experimental_option('useAutomationExtension', False)
        
#         # Start Chrome with Selenium (not remote debug)
#         driver = webdriver.Chrome(service=service, options=chrome_options)
        
#         print("✅ Chrome started with Selenium!")
        
#         # Wait for profile to load
#         time.sleep(8)
        
#         # Test extensions
#         driver.get("chrome://extensions/")
#         time.sleep(3)
#         print("✅ Extensions page loaded")
        
#         return driver
        
#     except Exception as e:
#         print(f"❌ Direct method failed: {e}")
#         return None

# # Test direct method
# driver = direct_profile_method()

# if driver:
#     print("🎉 Success! Testing MetaMask...")
    
#     # Try MetaMask
#     try:
#         driver.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html")
#         print("✅ MetaMask accessible!")
#     except Exception as e:
#         print(f"MetaMask not accessible: {e}")
#         print("But Chrome profile is working!")
        
#     # Keep browser open for testing
#     input("Press Enter to close browser...")
#     driver.quit()
# else:
#     print("❌ Setup failed")
# ---------------------------------------
# import subprocess
# import time
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.chrome.service import Service

# def fix_firewall_and_try_debug():
#     """Try to fix firewall issue and use remote debug"""
    
#     print("Attempting to allow Chrome through Windows Firewall...")
    
#     # Try to add firewall rule (requires admin privileges)
#     try:
#         # Add Chrome to firewall exceptions
#         chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
#         cmd = f'netsh advfirewall firewall add rule name="Chrome Debug" dir=in action=allow program="{chrome_path}" enable=yes'
        
#         result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
#         if result.returncode == 0:
#             print("✅ Firewall rule added")
#         else:
#             print("⚠️ Could not add firewall rule (try running as admin)")
#     except:
#         print("⚠️ Firewall configuration failed")
    
#     # Kill Chrome
#     subprocess.run(["taskkill", "/f", "/im", "chrome.exe"], capture_output=True)
#     time.sleep(3)
    
#     # Try with localhost binding
#     chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
#     user_data = r"C:\Users\hp\AppData\Local\Google\Chrome\User Data"
    
#     cmd = f'"{chrome_path}" --remote-debugging-address=127.0.0.1 --remote-debugging-port=9222 --user-data-dir="{user_data}"'
    
#     process = subprocess.Popen(cmd, shell=True)
#     time.sleep(8)
    
#     # Test connection
#     try:
#         import requests
#         response = requests.get("http://127.0.0.1:9222/json", timeout=10)
#         print("✅ Debug port accessible!")
        
#         # Connect Selenium
#         service = Service(ChromeDriverManager().install())
#         chrome_options = Options()
#         chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
        
#         driver = webdriver.Chrome(service=service, options=chrome_options)
#         return driver
        
#     except Exception as e:
#         print(f"Still blocked: {e}")
#         return None

# # Try firewall fix
# driver = fix_firewall_and_try_debug()

# -------------------

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import time
import subprocess

def simple_working_solution():
    """Simplest working solution"""
    
    # Make sure Chrome is closed
    subprocess.run(["taskkill", "/f", "/im", "chrome.exe"], capture_output=True)
    time.sleep(3)
    
    # Set up Chrome options
    service = Service(ChromeDriverManager().install())
    chrome_options = Options()
    
    # Use your profile directly
    user_data_dir = r"C:\Users\hp\AppData\Local\Google\Chrome\User Data"
    chrome_options.add_argument(f"--user-data-dir={user_data_dir}")
    chrome_options.add_argument("--profile-directory=Default")
    
    # Allow extensions
    chrome_options.add_argument("--enable-extensions")
    
    # Anti-detection
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    try:
        # Start Chrome directly with Selenium
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        print("✅ Chrome started!")
        
        # Give time for extensions to load
        time.sleep(10)
        
        # Check extensions
        driver.get("chrome://extensions/")
        print("✅ Extensions page loaded!")
        
        return driver
        
    except Exception as e:
        print(f"Error: {e}")
        return None

# Use the simple solution
print("Using simple direct method...")
driver = simple_working_solution()

if driver:
    print("🎉 Success!")
    
    # Find MetaMask extension ID
    driver.get("chrome://extensions/")
    time.sleep(2)
    
    print("Looking for MetaMask... Check the browser window.")
    print("You should see MetaMask in the extensions list.")
    
    # Try common MetaMask URLs
    metamask_urls = [
        "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html",
        "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html"
    ]
    
    for url in metamask_urls:
        try:
            driver.get(url)
            time.sleep(2)
            if "This site can't be reached" not in driver.page_source:
                print(f"✅ MetaMask found at: {url}")
                break
        except:
            continue
    
    input("Press Enter to continue...")
    
else:
    print("❌ Failed to start Chrome")