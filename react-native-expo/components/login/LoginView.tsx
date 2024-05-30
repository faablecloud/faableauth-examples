import { useSessionContext } from "@faable/auth-helpers-react";
import { Image } from "expo-image";
import { View, ViewProps, StyleSheet } from "react-native";
import { useAnimatedMount } from "./useAnimatedMount";
import Animated from "react-native-reanimated";

export const LoginLogo = () => {
  const { session } = useSessionContext();

  // Animations
  const mainMountStyle = useAnimatedMount(1500);

  return (
    <Animated.View style={[styles.logo_container, mainMountStyle]}>
      {!session && (
        <Image
          source={require("../../assets/faable-logo.png")}
          contentFit="cover"
          style={styles.logo}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logo_container: {
    alignSelf: "center",
  },
  logo: {
    width: 70,
    aspectRatio: 1,
    marginBottom: 300,
  },
});
