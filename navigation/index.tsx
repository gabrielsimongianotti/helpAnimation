import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
} from "react-native";

export const FadeInView = () => {
  const [showButton, setShowButton] = useState(false);
  const [redSquareAnim] = useState(new Animated.Value(0));
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  const onPressTiming = () => {
    showButton
      ? Animated.timing(pan, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start()
      : Animated.timing(pan, {
          toValue: -200,
          duration: 1000,
          useNativeDriver: false,
        }).start();

    setShowButton(!showButton);
  };

  return (
    <>
      <Animated.View
        style={{
          width: 250,
          height: 50,
          zIndex: 1,
          backgroundColor: "powderblue",
          opacity: fadeAnim,
          transform: [{ translateX: pan.x }],
          borderTopStartRadius: showButton ? 0 : 12,
          borderBottomStartRadius: showButton ? 0 : 12,
          borderTopEndRadius: showButton ? 0 : 12,
          borderBottomEndRadius: showButton ? 0 : 12,
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={() => {
            onPressTiming();
          }}
        >
          <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            rtyertdy in
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          top: "45%",
          left: "45%",
          position: "absolute",
        }}
      >
        <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
          seila
        </Text>
      </View>
    </>
  );
};
