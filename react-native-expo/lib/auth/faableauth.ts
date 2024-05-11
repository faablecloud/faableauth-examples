import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@faablecloud/auth-js";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as QueryParams from "expo-auth-session/build/QueryParams";

// Constants
WebBrowser.maybeCompleteAuthSession(); // Required only for web
const redirectTo = makeRedirectUri(); // Redirection URI

// Singleton configuration
const faableauthUrl = process.env.EXPO_PUBLIC_FAABLEAUTH_URL || "";
const clientId = process.env.EXPO_PUBLIC_FAABLEAUTH_CLIENT_ID || "";

export const faableauth = createClient({
  domain: faableauthUrl,
  clientId,
  storage: AsyncStorage,
});

// Get the session with its tokens
const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);

  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await faableauth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw error;

  return data.session;
};

// Login function
export const login = async () => {
  try {
    const { data, error } = await faableauth.signInWithOauthConnection({
      redirectTo,
      skipBrowserRedirect: true,
      connection: process.env.EXPO_PUBLIC_FAABLEAUTH_SOCIAL_CONNECTION,
      queryParams: {
        prompt: "login",
      },
    });

    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? "", redirectTo);

    if (res.type === "success") {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  } catch (e) {
    console.error(e);
  }
};

// Logout function
export const logout = async () => {
  await faableauth.signOut();
};
