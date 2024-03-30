from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer
from security.settings import FaableAuthSettings
import jwt
from security.jwks import get_jwks_key

config = FaableAuthSettings()

faableauth_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=config.authorizationUrl,
    refreshUrl=config.tokenUrl,
    tokenUrl=config.tokenUrl,
    scheme_name="faable:auth",
    scopes=[],
    description="FaableAuth"
)

def decode_and_validate_token(token):
    unvalidated = jwt.decode(token, options={"verify_signature": False})
    header = jwt.get_unverified_header(token)
    if not "iss" in unvalidated:
        raise HTTPException(status_code=400, detail="Missing iss in JWT")
    if not "kid" in header:
        raise HTTPException(status_code=400, detail="Missing kid in JWT")

    # Invalid issuer for this FaableAuth configuration
    if config.url != unvalidated['iss']:
        raise HTTPException(status_code=400, detail="Invalid issuer")

    key = get_jwks_key(config.wellKnownUrl,header["kid"])
    return jwt.decode(token, key, [header["alg"]],audience=config.audience)


async def verify_access(token: Annotated[str, Depends(faableauth_scheme)]):
    decoded = decode_and_validate_token(token)
    subject = decoded["sub"]
    return subject

