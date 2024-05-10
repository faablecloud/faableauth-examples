import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { LoginButton } from "./components/login/LoginButton";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { SessionContextProvider } from "@faablecloud/auth-helpers-react";
import { faableauth } from "./lib/auth/faableauth";
import { useFonts, DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

setBackgroundColorAsync("white");

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SessionContextProvider faableauthClient={faableauth}>
      <SafeAreaView style={styles.container}>
        <LoginButton />
        <StatusBar style="dark" />
      </SafeAreaView>
    </SessionContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 48,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
