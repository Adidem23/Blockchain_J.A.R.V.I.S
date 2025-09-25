from mcp.server.fastmcp import FastMCP

mcp = FastMCP("J.A.R.V.I.S")

async def callSampleFunction():
    return {"msg":"Sample output of callSampleFunction"}

@mcp.tool()
async def sampleTool(msg):
    result= await callSampleFunction()
    return {"msg":f"This tool retruned correct JSON {result} with {msg}"}


if __name__ == "__main__":
    mcp.run(transport='stdio')