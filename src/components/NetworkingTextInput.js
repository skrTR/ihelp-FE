import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
const NetworkingTextInput = (props) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
      }}
    >
      <TextInput
        style={[
          styles.inputField,
          props.style,
          { backgroundColor: colors.border, color: "white", height: 43 },
        ]}
        {...props}
        autoCorrect={false}
        autoCapitalize="none"
        selectionColor={"#FFB6C1"}
        placeholder="Та сэтгэгдлээ үлдээнэ үү"
        placeholderTextColor={"#cccccc"}
      />
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.commentLength > 0 ? false : true}
      >
        <MaterialCommunityIcons
          name="send-circle"
          size={40}
          color={props.commentLength > 0 ? "#FFB6C1" : colors.border}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NetworkingTextInput;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    // color: "grey",
    width: "90%",
  },
});
