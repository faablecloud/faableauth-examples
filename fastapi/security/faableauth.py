from typing import Annotated
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    faable_auth_domain: str
    faable_auth_connection: str = None
    model_config = SettingsConfigDict(env_file=".env")

config = Settings()
print(config)

# FAABLE_AUTH_DOMAIN = os.getenv('FAABLE_AUTH_DOMAIN')
# if not FAABLE_AUTH_DOMAIN:
#     raise ValueError(f"Missing FAABLE_AUTH_DOMAIN env var")

faableauth_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"https://{config.faable_auth_domain}/authorize?connection={config.faable_auth_connection}",
    refreshUrl=f"https://{config.faable_auth_domain}/oauth/token",
    tokenUrl=f"https://{config.faable_auth_domain}/oauth/token",
    scheme_name="faable:auth",
    scopes=[],
    description="FaableAuth"
)

async def verify_access(token: Annotated[str, Depends(faableauth_scheme)]):
    print(token)
    
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")
