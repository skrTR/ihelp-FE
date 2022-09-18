import React from "react";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <LottieView
      source={require("../../assets/12.json")}
      loop={true}
      autoPlay={true}
    />
  );
};

export default Loading;
