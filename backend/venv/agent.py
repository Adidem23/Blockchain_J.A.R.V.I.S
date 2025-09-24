from langchain_community.llms import Ollama
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
collection = db["users"]

# CRUD tools
def create_user(name, email):
    collection.insert_one({"name": name, "email": email})
    return f"User {name} created."

def read_users(_):
    return list(collection.find({}, {"_id": 0}))

def update_user(name, new_email):
    collection.update_one({"name": name}, {"$set": {"email": new_email}})
    return f"User {name} updated."

def delete_user(name):
    collection.delete_one({"name": name})
    return f"User {name} deleted."

# Tools
tools = [
    Tool(name="create_user", func=lambda _: create_user("Alice", "alice@example.com"), description="Create a new user"),
    Tool(name="read_users", func=read_users, description="Read all users"),
    Tool(name="update_user", func=lambda _: update_user("Alice", "alice_new@example.com"), description="Update a user email"),
    Tool(name="delete_user", func=lambda _: delete_user("Alice"), description="Delete a user"),
]

# ✅ Use Ollama instead of ChatOllama
llm = Ollama(model="deepseek-r1:1.5b", base_url="http://localhost:11434")

# Create agent
agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

# Run query
response = agent.invoke({"input": "Add a user named Alice with email alice@example.com"})
print(response)a