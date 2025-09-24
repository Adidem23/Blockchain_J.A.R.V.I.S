from db import db

collection=db["userQueries"]

async def create_userQuery(query:dict)->dict:
    result = await collection.insert_one(query)
    return result