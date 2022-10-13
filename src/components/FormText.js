import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";

const FormText = (props) => {
  const { colors } = useTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TextInput
          {...props}
          style={[
            styles.inputField,
            props.style,

            { backgroundColor: colors.secondaryText, fontSize: 16 },
          ]}
          placeholderTextColor={colors.secondaryText}
          selectionColor={"#FFB6C1"}
        />
      </View>
      {props.errorShow && (
        <Animatable.Text
          animation="fadeInLeft"
          duration={500}
          style={{
            color: "#E83350",
            fontSize: 12,
            marginTop: 5,
            fontWeight: "300",
          }}
        >
          {props.errorText}
        </Animatable.Text>
      )}
    </View>
  );
};

export default FormText;

const styles = StyleSheet.create({
  inputField: {
    // backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    width: "100%",
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
