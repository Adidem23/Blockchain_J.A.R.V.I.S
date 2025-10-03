import os
import time
from dotenv import load_dotenv
from langchain_ollama import OllamaLLM
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

OLLAMA_MODEL_NAME=os.getenv("OLLAMA_MODEL")
OLLAMA_MODEL_BASE_URL=os.getenv("OLLAMA_BASE_URL")
GOOOGLE_GEMINI_API_KEY=os.getenv("GOOGLE_GEMINI_API_KEY")

start_time=time.time()

llm = OllamaLLM(
    model=OLLAMA_MODEL_NAME,
    temperature=0.7,
    base_url=OLLAMA_MODEL_BASE_URL
)

# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash",
#     api_key=GOOOGLE_GEMINI_API_KEY
# )

input_text="Who were the spartan warriors?"
response=llm.invoke(input_text)

if(response):
    end_time=time.time()
    print(f"Response exited with time :{end_time-start_time}+{response}")


## Final_Conclusion: use googleGemini / ChatGpt model coz all ollama models are very hardware extensive 
    