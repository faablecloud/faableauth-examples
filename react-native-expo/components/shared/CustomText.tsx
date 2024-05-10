import { Text, StyleSheet, TextProps } from "react-native";

export const CustomText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.defaultFont, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "DMSans_400Regular",
    fontSize: 20,
    color: "white",
  },
});
