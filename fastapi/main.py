from typing import Union
from fastapi import FastAPI, Depends
from security.faableauth import verify_access

app = FastAPI()

@app.get("/")
def read_root():
    return {"app": "Faable Auth Fastapi Demo"}

@app.get("/protected", dependencies=[Depends(verify_access)])
def protected( query: Union[str, None] = None):
    return {"query": q}