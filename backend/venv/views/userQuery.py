from pydantic import BaseModel

class requetsedQuery(BaseModel):
    id:int
    resolvedStatus:bool
    requestedByUser:str
    actualQueryString:str
