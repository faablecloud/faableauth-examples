from typing import Union
from fastapi import FastAPI
from auth.verify_token import verify_token


app = FastAPI()

@app.get("/")
def read_root():
    return {"app": "Faable Auth Fastapi Demo"}

@app.get("/protected", dependencies=[Depends(verify_token)])
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}