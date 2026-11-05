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
    try:
        header = jwt.get_unverified_header(token)
        if "kid" not in header:
            raise HTTPException(status_code=401, detail="Missing kid in JWT")

        key = get_jwks_key(config.wellKnownUrl, header["kid"])
        # The algorithm is fixed here: a token's header is controlled by its sender.
        return jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=config.audience,
            issuer=config.url,
        )
    except (jwt.InvalidTokenError, jwt.PyJWKClientError) as error:
        raise HTTPException(status_code=401, detail="Invalid token") from error


async def verify_access(token: Annotated[str, Depends(faableauth_scheme)]):
    decoded = decode_and_validate_token(token)
    subject = decoded["sub"]
    return subject

