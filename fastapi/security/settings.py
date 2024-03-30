from pydantic_settings import BaseSettings, SettingsConfigDict
    
class FaableAuthSettings(BaseSettings):
    faable_auth_domain: str
    faable_auth_connection: str = ""
    model_config = SettingsConfigDict(env_file=".env")

    @property
    def url(self) -> str:
        return f"https://{self.faable_auth_domain}"

    @property
    def authorizationUrl(self):
        baseUrl = f"{self.url}/authorize"
        if self.faable_auth_connection:
            return f"{baseUrl}?connection={self.faable_auth_connection}"
        return baseUrl

    @property
    def tokenUrl(self) -> str:
        return f"{self.url}/oauth/token"

    @property
    def wellKnownUrl(self) -> str:
        return f"{self.url}/.well-known/openid-configuration"

    @property
    def audience(self) ->str:
        return "https://api.faable.com"

