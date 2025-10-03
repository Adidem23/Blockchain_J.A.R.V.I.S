import asyncio
import time
import pyautogui
from pydantic import create_model
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from langchain.tools import StructuredTool
from typing import Any ,Dict
import inspect , types


async def loadMCPServerTools(): 
        server_script_path="../MCP/Server.py" 
        command = "python" 
        server_params = StdioServerParameters( command=command, args=[server_script_path], env=None ) 
        async with stdio_client(server_params) as (read, write): 
                async with ClientSession(read, write) as session: 
                        await session.initialize() 
                        tools_info= await session.list_tools() 
                        return tools_info


async def call_mcp_tool(name: str, args: Dict[str, Any]) -> Any:
    mcp_tools=await loadMCPServerTools()
    return await mcp_tools.call_tool(name, args)                

async def callFunction():
        refined_tools = []
        mcp_tools=await loadMCPServerTools()
        for tool in mcp_tools.tools:
            fields = {}
            for prop, schema in tool.inputSchema.get("properties", {}).items():
                typ = str if schema.get("type") == "string" else Any
                fields[prop] = (typ, ...)
        ArgsModel = create_model(f"{tool.name}Args", **fields)

        async def template_func(**kwargs: Any) -> Any:
                return await call_mcp_tool(tool.name, kwargs)

        func = types.FunctionType(
        template_func.__code__,
        template_func.__globals__,
        tool.name,
        closure=template_func.__closure__,
         )
       

        params = [
        inspect.Parameter(name, inspect.Parameter.POSITIONAL_OR_KEYWORD, annotation=typ)
        for name, (typ, _) in fields.items()
        ]
        func.__signature__ = inspect.Signature(parameters=params)

        one_tool = StructuredTool.from_function(
        func=func,
        name=tool.name,
        description=tool.description or "No description provided",
        args_schema=ArgsModel,
        )

        refined_tools.append(one_tool)
        print(refined_tools)
        print(type(refined_tools))



if __name__=="__main__":
        asyncio.run(callfucntoin())

# ---------------------------------------------------------------------------------

# def openChrome():
#     pyautogui.press('win')
#     time.sleep(1)
#     pyautogui.write('Chrome')
#     time.sleep(1) 
#     pyautogui.press('enter')


# Open_browser_tool=StructuredTool.from_function(
#         func=openChrome,
#         name="OpenChrome",
#         description="Opens User Chrome Browser"
#         )

# print(Open_browser_tool)
# print(type(Open_browser_tool))


