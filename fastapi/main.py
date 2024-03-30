from typing import Union
from fastapi import FastAPI, Depends
from security.faableauth import verify_access

app = FastAPI()

@app.get("/")
def read_root():
    return {"app": "FaableAuth demo"}

@app.get("/protected")
def protected(query: str = "", user_id:str = Depends(verify_access)):
    return {
        "query": query,
        "user_id": user_id
    }