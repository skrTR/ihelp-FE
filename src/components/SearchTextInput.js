import {
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  InputAccessoryView,
  Button,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const SearchTextInput = (props) => {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const inputAccessoryViewID = "uniqueID";
  return (
    <>
      <TextInput
        placeholder="Хайх утга"
        value={props.search}
        onChangeText={(text) => props.searchFilter(text)}
        placeholderTextColor={colorScheme === "dark" ? "#cccccccc" : "grey"}
        returnKeyType={"search"}
        inputAccessoryViewID={inputAccessoryViewID}
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
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button onPress={() => props.searchFilter("")} title="Цэвэрлэх" />
      </InputAccessoryView>
    </>
  );
};

export default SearchTextInput;

const styles = StyleSheet.create({});
