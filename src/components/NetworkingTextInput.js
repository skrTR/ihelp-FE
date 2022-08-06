import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
          { backgroundColor: colors.border, color: "white" },
        ]}
        {...props}
        autoCorrect={false}
        autoCapitalize="none"
        selectionColor={"#FFB6C1"}
        placeholder="Та сэтгэгдэлээ үлдээнэ үү..."
      />
      <TouchableOpacity onPress={props.onPress}>
        <MaterialCommunityIcons
          name="send-circle"
          size={40}
          color={"#FFB6C1"}
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
    width: "90%",
  },
});
