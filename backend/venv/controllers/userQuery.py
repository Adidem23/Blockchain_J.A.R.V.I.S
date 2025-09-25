import os
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from dotenv import load_dotenv
from fastapi import APIRouter
from views.userQuery import requetsedQuery
from model.userQuery import create_userQuery
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.prebuilt import create_react_agent


load_dotenv()

OLLAMA_MODEL_NAME=os.getenv("OLLAMA_MODEL")
OLLAMA_MODEL_BASE_URL=os.getenv("OLLAMA_BASE_URL")
GOOGLE_GEMINI_API_KEY=os.getenv("GOOGLE_GEMINI_API_KEY")

router = APIRouter(prefix="/userQuery",tags=["userQuery"])

@router.get("/")
def send_breating_msg():
        return {"message":"I am Jinda Here !!"}

async def loadMCPServerTools():
        server_script_path="MCP/Server.py"
        
        command = "python"
        server_params = StdioServerParameters(
                command=command,
                args=[server_script_path],
                env=None
        )

        async with stdio_client(server_params) as (read, write):
                async with ClientSession(read, write) as session:
                         await session.initialize()

                         tools = await session.list_tools()
                         return tools


@router.post("/processUserQuery")
async def process_langchain_response(userQuery:requetsedQuery):

        MCP_Server_Tools= await loadMCPServerTools()

        chat_model=ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                api_key=GOOGLE_GEMINI_API_KEY
        )

        chat_model.bind(MCP_Server_Tools)

        





        
