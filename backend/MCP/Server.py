from mcp.server.fastmcp import FastMCP
# import pyautogui
import time

mcp = FastMCP("J.A.R.V.I.S")


@mcp.tool()
def openChrome():
    return("start chrome process")
    pyautogui.press('win')
    time.sleep(1)
    pyautogui.write('Chrome')
    time.sleep(1) 
    pyautogui.press('enter')


if __name__ == "__main__":
    mcp.run(transport='stdio')