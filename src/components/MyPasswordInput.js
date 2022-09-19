import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
const MyPasswordInput = (props) => {
  const [isSecure, setIsSecure] = useState(true);
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        style={[styles.inputField, props.style, { flex: 1 }]}
        {...props}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={isSecure}
      />
      <TouchableOpacity
        style={{ position: "absolute", padding: 15, right: 0 }}
        onPress={() => setIsSecure(!isSecure)}
      >
        <Entypo
          name={isSecure ? "eye" : "eye-with-line"}
          size={24}
          color={props.iconStyle ? props.iconStyle : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MyPasswordInput;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    // color: "grey",
  },
});
