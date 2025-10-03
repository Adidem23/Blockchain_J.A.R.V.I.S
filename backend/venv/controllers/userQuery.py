import os
import pyautogui
import time
import cv2
import requests
from dotenv import load_dotenv
from fastapi import APIRouter
from views.userQuery import requetsedQuery
from model.userQuery import create_userQuery
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import InMemorySaver
from langchain.tools import StructuredTool
from langchain_core.messages import SystemMessage

load_dotenv()

GOOGLE_GEMINI_API_KEY=os.getenv("GOOGLE_GEMINI_API_KEY")

router = APIRouter(prefix="/userQuery",tags=["userQuery"])

@router.get("/")
def send_breating_msg():
        return {"message":"I am Jinda Here !!"}

#-------### This is Starting of the Tooools ####-----------#

def openMetamaskWallet():
         pyautogui.press("win")
         time.sleep(1)
         pyautogui.typewrite("chrome", interval=0.1)
         time.sleep(1)
         pyautogui.press("enter")
         time.sleep(3)
         pyautogui.typewrite("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html", interval=0.05)
         pyautogui.press("enter")
         time.sleep(3)
         pyautogui.typewrite("Venom@123", interval=0.1)
         pyautogui.press("enter")


def sendTransactionToWalletAddress():
    send_btn = pyautogui.locateOnScreen(r"D:\hp\Dev\EthIndia_2025\backend\venv\ass\send.png", confidence=0.8)
    if send_btn:
        pyautogui.click(send_btn)
        time.sleep(1)
        pyautogui.typewrite("",interval=0.2)
        time.sleep(4)
        pyautogui.press("enter")
        pyautogui.typewrite("0.01",interval=0.3)
        time.sleep(1)
        pyautogui.press("enter")
        continue_btn= pyautogui.locateOnScreen(r"D:\hp\Dev\EthIndia_2025\backend\venv\ass\continue.png", confidence=0.8)
        if continue_btn:
               pyautogui.click(continue_btn)
               time.sleep(2)
               confirm_btn= pyautogui.locateOnScreen(r"D:\hp\Dev\EthIndia_2025\backend\venv\ass\confirm.png", confidence=0.8)
               if confirm_btn:
                      pyautogui.click(confirm_btn)
                      time.sleep(2)


def feedRootStockTestnetWallet():
        pyautogui.press("win")
        time.sleep(1)
        pyautogui.typewrite("chrome", interval=0.1)
        time.sleep(1)
        pyautogui.press("enter")
        time.sleep(3)
        pyautogui.typewrite("https://faucet.rootstock.io",interval=0.2)
        time.sleep(1)
        pyautogui.press("enter")
        time.sleep(1)

def feedFlowEVMTestnetWallet():
        pyautogui.press("win")
        time.sleep(1)
        pyautogui.typewrite("chrome", interval=0.1)
        time.sleep(1)
        pyautogui.press("enter")
        time.sleep(3)
        pyautogui.typewrite("https://evm-testnet.flowscan.io",interval=0.2)
        time.sleep(1)
        pyautogui.press("enter")
        time.sleep(1)


def visitFlowEVMTestNetBlockExplorer():
        pyautogui.press("win")
        time.sleep(1)
        pyautogui.typewrite("chrome", interval=0.1)
        time.sleep(1)
        pyautogui.press("enter")
        time.sleep(1)
        pyautogui.typewrite("https://evm-testnet.flowscan.io/address",interval=0.1)
        time.sleep(2)
        pyautogui.press("enter")

async def visitRootStockBlockExplorer():
        pyautogui.press("win")
        time.sleep(1)
        pyautogui.typewrite("chrome", interval=0.1)
        time.sleep(1)
        pyautogui.press("enter")
        time.sleep(1)
        pyautogui.typewrite("https://explorer.testnet.rootstock.io/address",interval=0.1)
        time.sleep(2)
        pyautogui.press("enter")
        all_transactions=[]

        transactions=await requests.get("https://rootstock-testnet.blockscout.com/api/v2/addresses/transactions")

        for item in transactions.items:
              one_Transaction_Object={
                     "gas":item['gas_used'],
                     "transaction_types":item.transaction_types[0],
                     "date_of_transaction":item['timestamp'],
              }

              all_transactions.push(one_Transaction_Object)
              return all_transactions

# async def getRootStockTransactions():
       


       
open_Metamask_tool=StructuredTool.from_function(
        func=openMetamaskWallet,
        name="openMetamaskWallet",
        description="Opens User's Metamask Extension"
        )

send_Transaction_Tool=StructuredTool.from_function(
        func=sendTransactionToWalletAddress,
        name="sendTransactionToWalletAddress",
        description="Sends a user trnsaction through metamask"
        )

feed_RootStock_Testnet_Wallet_Tool=StructuredTool.from_function(
       func=feedRootStockTestnetWallet,
       name="feedRootStockTestnetWallet",
       description=" Opens users metamask wallet through rootstock testnet"
)

visit_Root_Stock_BlockExplorer_Tool=StructuredTool.from_function(
       func=visitRootStockBlockExplorer,
       name="visitRootStockBlockExplorer",
       description="Shows end users his/her transaction on rootstock block explorer"
)

feed_Flow_EVM_Testnet_Wallet_Tool=StructuredTool.from_function(
       func=feedFlowEVMTestnetWallet,
       name="feedFlowEVMTestnetWallet",
       description=" Opens users metamask wallet through FlowEVM testnet"
)

visit_Flow_EVM_BlockExplorer_Tool=StructuredTool.from_function(
       func=visitFlowEVMTestNetBlockExplorer,
       name="visitFlowEVMTestNetBlockExplorer",
       description="Shows end users his/her transaction on FlowEVM block explorer"
)

#-------### This is Ending of the Tooools ####-----------#


@router.post("/processUserQuery")
async def process_langchain_response(userQuery:requetsedQuery):

        chat_model=ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                api_key=GOOGLE_GEMINI_API_KEY
        )

        JARVIS_tools=[open_Metamask_tool,send_Transaction_Tool,feed_RootStock_Testnet_Wallet_Tool,visit_Root_Stock_BlockExplorer_Tool,feed_Flow_EVM_Testnet_Wallet_Tool,visit_Flow_EVM_BlockExplorer_Tool]

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
        - Current available tools
        1. openMetamaskWallet()
        - Behavior: It Opens a Metamask of the user and is important for the some of the user use cases `.
        - Example usage: If user asks "Heyy!! J.A.R.V.I.S Open my Metamask ", call `openMetamaskWallet`
        
        2.sendTransactionToWalletAddress():
        - Behavior: Metamask wallet is necessary for the sending transaction at any cost and it opens a dialogue box to enter the wallet address of the receiver 

        Example usage: If user asks "Heyy!! J.A.R.V.I.S Send a Transaction from my metamask to Soham", call `openMetamaskWallet` first to open metamask and then `sendTransactionToWalletAddress` to send the transaction to the user through metamask

        3.feedRootStockTestnetWallet():
          Behavior: It opens the Rootstock testnet blockchain through faucet

          Example usage: If user asks open my Rootstock faucet  then call `feedRootStockTestnetWallet`

        4.visitRootStockBlockExplorer():
         Behavior: It opens the Rootstock testnet users blockchain explorer

          Example usage: If user asks I Want see my all transactions on Rootstock testnet then call `visitRootStockBlockExplorer`

        5.feedFlowEVMTestnetWallet():
          Behavior: It opens the FlowEVM testnet blockchain through faucet

          Example usage: If user asks open my Rootstock faucet  then call `feedFlowEVMTestnetWallet`

        6.visitFlowEVMTestNetBlockExplorer():
          Behavior: It opens the Flow EVM testnet users blockchain explorer

          Example usage: If user asks I Want see my all transactions on Rootstock testnet then call `visitFlowEVMTestNetBlockExplorer` 


        Identity:
        - Codename: J.A.R.V.I.S.
        - Role: A blockchain and automation AI agent that uses MCP tools for reliable execution.
        - You do not guess — you execute and then explain results.

        """

        actual_System_Prompt=SystemMessage(system_prompt)

        agent=create_react_agent(chat_model,JARVIS_tools,prompt=actual_System_Prompt)
        
        result = agent.invoke({"messages": [("user", userQuery.actualQueryString)]})

        final_result_message=result["messages"][-1]["content"]

        return final_result_message
