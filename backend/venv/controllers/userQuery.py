import os
import json
import asyncio
import pyautogui
import time
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from dotenv import load_dotenv
from fastapi import APIRouter
from views.userQuery import requetsedQuery
from model.userQuery import create_userQuery
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import InMemorySaver
from langchain.tools import StructuredTool
from langchain_core.messages import SystemMessage
from langchain.agents import AgentExecutor

load_dotenv()


GOOGLE_GEMINI_API_KEY=os.getenv("GOOGLE_GEMINI_API_KEY","AIzaSyDkpDYTvITqOpd7C_Y24S2LK89DEnCjLxU")

router = APIRouter(prefix="/userQuery",tags=["userQuery"])

@router.get("/")
def send_breating_msg():
        return {"message":"I am Jinda Here !!"}

# async def loadMCPServerTools(): 
#         server_script_path="MCP/Server.py" 
#         command = "python" 
#         server_params = StdioServerParameters( command=command, args=[server_script_path], env=None ) 
#         async with stdio_client(server_params) as (read, write): 
#                 async with ClientSession(read, write) as session: 
#                         await session.initialize() 
#                         wrapped_tools = [] 
#                         tools_info= await session.list_tools() 
#                         for tool in tools_info.tools: 
#                                 async def tool_caller(query: str, tool_name=tool.name): 
#                                         result = await session.call_tool(tool_name,{"query": query}) 
#                                         return result 
                                
#                                 wrapped_tools.append( StructuredTool.from_function( func=tool_caller, name=tool.name, description=tool.description, ) ) 
                                
#                                 return wrapped_tools


def openChrome():
    pyautogui.press('win')
    time.sleep(1)
    pyautogui.write('Chrome')
    time.sleep(1) 
    pyautogui.press('enter')


Open_browser_tool=StructuredTool.from_function(
        func=openChrome,
        name="OpenChrome",
        description="Opens User Chrome Browser"
)

@router.post("/processUserQuery")
async def process_langchain_response(userQuery:requetsedQuery):

        chat_model=ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                api_key=GOOGLE_GEMINI_API_KEY
        )

        chat_model.bind(MCP_Server_Tools)

        





        