import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
const MyProgressBar = ({ step, steps, height }) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);
  return (
    <View style={{ padding: 10, justifyContent: "center", flex: 1 }}>
      <Animatable.Image
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        direction="alternate"
        source={require("../../assets/logo.png")}
        style={{
          width: 350,
          height: 65,
          alignSelf: "center",
          justifyContent: "center",
          resizeMode: "contain",
          bottom: 50,
        }}
      />
      <Text style={{ fontSize: 12, fontWeight: "900", marginBottom: 4 }}>
        {step}/{steps}
      </Text>
      <View
        style={{
          height: height,
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: height,
          overflow: "hidden",
        }}
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
      >
        <Animated.View
          style={{
            height: height,
            width: "100%",
            borderRadius: height,
            backgroundColor:
              step < 10
                ? "#D4E6F1"
                : step < 20
                ? "#D6EAF8"
                : step < 30
                ? "#AED6F1"
                : step < 40
                ? "#85C1E9"
                : step < 50
                ? "#5DADE2"
                : step < 60
                ? "#3498DB"
                : step < 70
                ? "#2E86C1"
                : step < 80
                ? "#2874A6"
                : step < 90
                ? "#21618C"
                : "#1B4F72",
            position: "absolute",
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        direction="alternate"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 20,
        }}
      >
        Түр хүлээнэ үү
      </Animatable.Text>
    </View>
  );
};

export default MyProgressBar;

const styles = StyleSheet.create({});
