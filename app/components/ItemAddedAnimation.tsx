import React, { useRef, useImperativeHandle, forwardRef } from "react";
import {
  Animated,
  Easing,
  Text,
  Dimensions,
  ViewStyle,
  StyleSheet,
} from "react-native";

// 👇 Exposed method type
export interface ItemAddedAnimationRef {
  triggerFallAnimation: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

const ItemAddedAnimation = forwardRef<ItemAddedAnimationRef>((_, ref) => {
  const fallAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const triggerFallAnimation = () => {
    // Reset position and make visible
    fallAnim.setValue(0);
    opacityAnim.setValue(1);

    Animated.parallel([
      Animated.timing(fallAnim, {
        toValue: 200,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        delay: 300, // fade out after a short moment
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useImperativeHandle(ref, () => ({
    triggerFallAnimation,
  }));

  return (
    <Animated.View
      style={[
        styles.animatedEmoji,
        {
          opacity: opacityAnim,
          transform: [{ translateY: fallAnim }],
        },
      ]}
    >
      <Text style={{ fontSize: 50 }}>🛒</Text>
    </Animated.View>
  );
});

export default ItemAddedAnimation;

const styles = StyleSheet.create({
  animatedEmoji: {
    position: "absolute",
    top: 100,
    left: screenWidth / 2 - 16, // Center horizontally (approx emoji width)
    zIndex: 10,
  } as ViewStyle,
});
