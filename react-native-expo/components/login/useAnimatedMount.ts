import { useSessionContext } from "@faable/auth-helpers-react";
import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export const useAnimatedMount = (initialDelay = 300, duration = 300) => {
  const { session } = useSessionContext();

  // Animation initial values
  const translate = useSharedValue(-50);
  const opacity = useSharedValue(0);
  const cardScale = useSharedValue(0.8);

  // Animation for components
  const mountStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: cardScale.value }, { translateY: -translate.value }],
    };
  });

  useEffect(() => {
    // Reset animation values
    opacity.value = 0;
    cardScale.value = 0.8;
    translate.value = -50;

    // Run the animation
    opacity.value = withDelay(initialDelay, withTiming(1, { duration }));
    cardScale.value = withDelay(initialDelay, withTiming(1, { duration }));
    translate.value = withDelay(initialDelay, withTiming(0, { duration }));
  }, [session]);

  return mountStyle;
};
