import json
import urllib.request
import jwt
import cachetools.func
from datetime import timedelta

JWKS_TTL = timedelta(minutes=10).total_seconds()

@cachetools.func.ttl_cache(ttl=JWKS_TTL)
def get_jwks_url(wellKnownUrl:str) -> str:
    """Get JWKS from issuer by requesting OpenID configuration endpoint

    Args:
        wellKnownUrl: (str): issuer url

    Returns:
        str: JWT keyset url used verify valid tokens
    """
    with urllib.request.urlopen(wellKnownUrl) as response:
        well_known = json.load(response)
    if not 'jwks_uri' in well_known:
        raise Exception('jwks_uri not found in OpenID configuration')
    jwks_uri = well_known['jwks_uri']
    #print(f"JWKS URI fetched: {jwks_uri}")
    return jwks_uri

@cachetools.func.ttl_cache(ttl=JWKS_TTL)
def get_jwks_key(wellKnownUrl:str,kid:str) -> str:
    """Get key from issuer. Result is cached.

    Args:
        wellKnownUrl (str): openid config url
        kid (str): key identifier

    Returns:
        str: key
    """
    jwks_url = get_jwks_url(wellKnownUrl)
    jwks_client = jwt.PyJWKClient(jwks_url)
    key = jwks_client.get_signing_key(kid).key
    #print(f"Key ID:{kid} fetched from: {wellKnownUrl}")
    return key
  