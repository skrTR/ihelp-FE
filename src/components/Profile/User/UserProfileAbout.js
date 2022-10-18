import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Border from "../../Border";
const UserProfileAbout = ({ about }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <Border />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            marginHorizontal: 10,
            fontFamily: "Sf-bold",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          Өөрийн тухай
        </Text>
        <SimpleLineIcons
          name="pencil"
          size={24}
          color={colors.primaryText}
          style={{ marginRight: 20 }}
          onPress={() => {
            navigation.navigate("EditAbout", {
              about: about,
            });
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditAbout", {
            about: about,
          });
        }}
      >
        <Text
          style={{
            borderWidth: about === "me" ? 1 : 0,
            borderColor: colors.border,
            color: about === "me" ? colors.secondaryText : colors.primaryText,
            fontSize: 14,
            padding: 10,
            paddingBottom: 40,
            marginHorizontal: 10,
            borderRadius: 10,
            marginBottom: about === "me" ? 20 : 0,
          }}
        >
          {about === "me" ? `Та өөрийгөө танилцуулна уу` : about}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default UserProfileAbout;

const styles = StyleSheet.create({});
