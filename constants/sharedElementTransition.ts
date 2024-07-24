import {
  SharedTransition,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SPRING_CONFIG = {
  mass: 1,
  stiffness: 100,
  damping: 200,
};

export const sharedElementTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withTiming(values.targetHeight),
    width: withTiming(values.targetWidth),
    originX: withTiming(values.targetOriginX),
    originY: withTiming(values.targetOriginY),
  };
});
