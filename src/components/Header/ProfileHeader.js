import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
const ProfileHeader = (props) => {
  const { firstName, lastName, notificationCount } = props;
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.header,
          padding: 1,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center", flexDirection: "row" }}
          onPress={() => {
            navigation.navigate("ChangeAccountModal");
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-bold",
              marginLeft: 10,
              fontSize: 20,
            }}
          >
            {firstName} {lastName}
          </Text>
          <FontAwesome name="angle-down" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Ionicons
            name="md-notifications-outline"
            size={30}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
          />
          {notificationCount ? (
            <View
              style={{
                position: colors.primary,
                backgroundColor: "red",
                borderRadius: 20,
                paddingHorizontal: 3.5,
                position: "absolute",
                top: 0,
                right: 20,
              }}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-bold",
                  padding: 3,
                  fontSize: 10,
                }}
              >
                {notificationCount}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
