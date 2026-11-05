# Faable Auth with FastAPI

A FastAPI service that protects a route with Faable Auth. It takes the access token from the
`Authorization: Bearer` header and checks its signature against your tenant's public keys (JWKS),
along with its issuer, audience and expiry.

| Route            | Access                                                |
| ---------------- | ----------------------------------------------------- |
| `GET /`          | Public                                                |
| `GET /protected` | Needs a valid access token; returns the user's `sub`  |
| `GET /docs`      | Interactive API docs, with an **Authorize** button    |

## Requirements

- Python 3.10 or later
- A [Faable Auth](https://faable.com/docs/auth/get-started) tenant
- An [API](https://faable.com/docs/auth/apis) registered in that tenant: its identifier is the
  audience of the tokens this service accepts

## Run it

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env   # then fill in your tenant's values
./start.sh
```

The service listens on <http://127.0.0.1:8000>.

## Configuration

Set these in `.env` or in the environment:

| Variable                 | Required | Description                                                                     |
| ------------------------ | -------- | ------------------------------------------------------------------------------- |
| `FAABLE_AUTH_DOMAIN`     | Yes      | Your tenant's domain, without the protocol, such as `acme.auth.faable.link`     |
| `FAABLE_AUTH_AUDIENCE`   | Yes      | The identifier of your API. Tokens issued for any other audience are refused    |
| `FAABLE_AUTH_CONNECTION` | No       | A connection id, to skip the login screen in the `/docs` **Authorize** flow     |

## Try it

Without a token the route answers `401`:

```bash
curl -i http://127.0.0.1:8000/protected
```

With an access token issued for your API, it returns the user's id:

```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" http://127.0.0.1:8000/protected
```

An application gets that token by asking for your API's identifier as its `audience` when it signs
the user in. See [OAuth 2.0 flows](https://faable.com/docs/auth/oauth-flows).

## How it works

- [`security/settings.py`](security/settings.py) reads the configuration and builds the tenant's URLs.
- [`security/jwks.py`](security/jwks.py) finds the tenant's public keys through its OpenID
  configuration and caches them for 10 minutes.
- [`security/faableauth.py`](security/faableauth.py) verifies the token. Add
  `Depends(verify_access)` to any route to protect it.

A failed check returns `401`. The accepted algorithm is fixed to `RS256` in the code and is never
read from the token, because the token's header is controlled by whoever sends it.

## Learn more

- [FastAPI quickstart](https://faable.com/docs/auth/quickstart/fastapi)
- [Validate access tokens](https://faable.com/docs/auth/validate-access-tokens)
- [FastAPI: OAuth2 with JWT](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [PyJWT documentation](https://pyjwt.readthedocs.io/en/latest/)
