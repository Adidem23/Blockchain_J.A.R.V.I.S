import os
import getpass
from fastapi import APIRouter
from views.userQuery import requetsedQuery
from model.userQuery import create_userQuery
from dotenv import load_dotenv

load_dotenv()

OLLAMA_SELECTED_MODEL=os.getenv("OLLAMA_MODEL","deepseek-r1:1.5b")

router = APIRouter(prefix="/userQuery",tags=["userQuery"])

@router.get("/")
def send_breating_msg():
        return {"message":"I am Jinda Here !!"}

@router.post("/processUserQuery")
async def process_langchain_response(userQuery:requetsedQuery):
        
