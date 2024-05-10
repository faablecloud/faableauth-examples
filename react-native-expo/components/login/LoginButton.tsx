import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useAnimatedMount } from "./useAnimatedMount";
import { login, logout } from "../../lib/auth/faableauth";
import { useSession } from "@faablecloud/auth-helpers-react";
import { CustomText } from "../shared/CustomText";
import { GoogleIcon } from "../svg/Google.icon";

export const LoginButton = () => {
  const session = useSession();

  // Animations
  const mainMountStyle = useAnimatedMount(200);
  const secondMountStyle = useAnimatedMount(500);
  const thirdMountStyle = useAnimatedMount(1000);
  const fourthMountStyle = useAnimatedMount(1200);

  return (
    <>
      {!session && (
        <>
          <Animated.View style={[styles.logo_container, secondMountStyle]}>
            {!session && <Image source={require("../../assets/faable-logo.png")} contentFit="cover" style={styles.logo} />}
          </Animated.View>
          <Animated.View style={[styles.container, mainMountStyle]}>
            <TouchableOpacity onPress={() => login()} style={[styles.button, styles.login_button]}>
              <View style={styles.icon_container}>
                <GoogleIcon />
              </View>
              <View style={styles.login_button_text}>
                <CustomText>Login con Google</CustomText>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      {session && (
        <>
          <Animated.View style={[styles.container, thirdMountStyle]}>
            <Image source={session.user.picture} contentFit="cover" style={styles.profile_image} />
          </Animated.View>
          <Animated.View style={[styles.container, mainMountStyle]}>
            <CustomText style={styles.text_user_name}>¡Hola {session.user.name?.split(" ")[0]}!</CustomText>
            <Animated.View style={thirdMountStyle}>
              <CustomText style={styles.text_user_email}>{session.user.email}</CustomText>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.container, fourthMountStyle]}>
            <TouchableOpacity onPress={() => logout()} style={[styles.button, styles.logout_button]}>
              <CustomText>Logout</CustomText>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </>
  );
};

const windowHeight = Dimensions.get("window").height;
const logoWidth = 70;
const styles = StyleSheet.create({
  text_user_name: {
    fontFamily: "DMSans_500Medium",
    color: "black",
    fontSize: 42,
    paddingVertical: 8,
    alignSelf: "center",
  },
  text_user_email: {
    color: "#aaaaaa",
    fontSize: 18,
    alignSelf: "center",
  },
  container: { width: "100%" },
  button: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 4,
    borderRadius: 9999,
  },
  login_button: {
    position: "relative",
  },
  login_button_text: {
    flex: 1,
    alignItems: "center",
  },
  logout_button: {
    marginTop: 72,
  },
  profile_image: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 9999,
    alignSelf: "center",
  },
  icon_container: {
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  logo_container: {
    alignSelf: "center",
    position: "absolute",
    top: windowHeight / 4 - logoWidth / 2,
  },
  logo: {
    width: logoWidth,
    aspectRatio: 1,
  },
});
