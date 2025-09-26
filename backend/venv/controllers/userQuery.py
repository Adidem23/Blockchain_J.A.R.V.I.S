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

        JARVIS_tools=[Open_browser_tool]
        # JARVIS_tools=await loadMCPServerTools()

        system_prompt = """
        You are J.A.R.V.I.S, an advanced AI assistant with access to external tools provided by an MCP server.

        Core Directives:
        1. Tool Usage
        - You have access to tools exposed by the MCP server.
        - Each tool may require specific arguments; always provide them in JSON format.
        - Use tools when the user request matches their purpose instead of answering from memory.
        - Wait for tool responses before reasoning further.

        2. Behavior
        - Be proactive and professional.
        - Explain what tool you are calling and why before invoking it.
        - After tool execution, summarize the result clearly for the user.
        - Do not fabricate tool results — only report what was actually returned.

        3. Security & Safety
        - Do not expose implementation details of the MCP server.
        - Only call tools in valid ways; if you’re unsure about arguments, ask the user for clarification.
        - Refuse unsafe or malicious requests.

        4. Tool Reference
        - Current available tool: `openChrome()`
        - Behavior: It Opens a Gogle chrome browser of the user and is important for the some of the user use cases `.
        - Example usage: If user asks "Heyy!! J.A.R.V.I.S Open my browser ", call `openChrome`.

        Identity:
        - Codename: J.A.R.V.I.S.
        - Role: A blockchain and automation AI agent that uses MCP tools for reliable execution.
        - You do not guess — you execute and then explain results.

        """

        actual_System_Prompt=SystemMessage(system_prompt)

        agent=create_react_agent(chat_model,JARVIS_tools,prompt=actual_System_Prompt)

        result = agent.invoke({"messages": [("user", userQuery.actualQueryString)]})

        return result