# Faable Auth with React Native and Expo

A mobile app that signs users in through a social connection with
[`@faable/auth-js`](https://github.com/faablecloud/auth-js). The login opens in the system browser
and the session is stored on the device with `AsyncStorage`.

## Requirements

- Node.js and the Android or iOS tooling for [Expo](https://docs.expo.dev/get-started/set-up-your-environment/)
- A [Faable Auth](https://faable.com/docs/auth/get-started) tenant with a client and a
  [social connection](https://faable.com/docs/auth/social)

## Install

```bash
npm install
```

## Configure

Get the values from the [Faable dashboard](https://dashboard.faable.com) and set them in a `.env`
file:

| Variable                                  | Description                                     |
| ----------------------------------------- | ----------------------------------------------- |
| `EXPO_PUBLIC_FAABLEAUTH_URL`              | Your tenant's domain                            |
| `EXPO_PUBLIC_FAABLEAUTH_CLIENT_ID`        | The client id of your application               |
| `EXPO_PUBLIC_FAABLEAUTH_SOCIAL_CONNECTION` | The social connection to sign in with          |

Add the app's redirect URI to the client's allowed callback URLs. The app builds it with
`makeRedirectUri()` from `expo-auth-session`, so its value depends on how you run the app.

## Run

```bash
npm run android
# or
npm run ios
```

## How it works

[`lib/auth/faableauth.ts`](lib/auth/faableauth.ts) creates the client, opens the login with
`signInWithOauthConnection` and `skipBrowserRedirect`, and stores the session that comes back in
the redirect URL.

## Learn more

- [React Native quickstart](https://faable.com/docs/auth/quickstart/react-native)
- [`@faable/auth-js` reference](https://github.com/faablecloud/auth-js#readme)
