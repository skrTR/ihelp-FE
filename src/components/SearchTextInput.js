import { StyleSheet, TextInput, useColorScheme } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const SearchTextInput = (props) => {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <>
      <TextInput
        placeholder="Хайх утга"
        value={props.search}
        onChangeText={(text) => props.searchFilter(text)}
        placeholderTextColor={colorScheme === "dark" ? "#cccccccc" : "grey"}
        returnKeyType={"search"}
        returnKeyLabel={"Хайх"}
        style={{
          backgroundColor: colors.border,
          padding: 10,
          width: "90%",
          marginLeft: 10,
          borderRadius: 20,
          color: colors.primaryText,
        }}
      />
    </>
  );
};

export default SearchTextInput;

const styles = StyleSheet.create({});
