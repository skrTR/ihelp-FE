import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Linking from "expo-linking";
import { useTheme } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
const CompanyAbout = (props) => {
  const { about, web, phone, workerNumber, createYear, location } = props;
  const { colors } = useTheme();
  return (
    <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: "Sf-bold",
            fontSize: 20,
          }}
        >
          Байгууллагын мэдээлэл
        </Text>
      </View>
      {/* About */}
      {about && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          <MaterialCommunityIcons
            name="warehouse"
            size={20}
            color={colors.primaryText}
            style={{ width: "10%" }}
          />
          <Text
            style={{
              flexDirection: "row",
              width: "90%",
              color: colors.primaryText,
            }}
          >
            {about}
          </Text>
        </View>
      )}

      {/* Website */}
      {web && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <MaterialCommunityIcons
            name="web"
            size={20}
            color={colors.primaryText}
            style={{ width: "10%" }}
          />
          <Text
            style={{
              flexDirection: "row",
              width: "95%",
              color: colors.primaryText,
            }}
            onPress={() => Linking.openURL(`${web}`)}
          >
            {web}
          </Text>
        </View>
      )}

      {/* Phone */}
      {phone && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <AntDesign
            name="phone"
            size={20}
            color={colors.primaryText}
            style={{ width: "10%" }}
          />
          <Text
            style={{
              flexDirection: "row",
              width: "95%",
              color: colors.primaryText,
            }}
            onPress={() => Linking.openURL(`tel:${phone}`)}
          >
            {phone}
          </Text>
        </View>
      )}

      {/* Ажилтны тоо */}
      {workerNumber && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <FontAwesome5
            name="people-arrows"
            size={20}
            color={colors.primaryText}
            style={{ width: "10%" }}
          />
          <Text
            style={{
              flexDirection: "row",
              width: "95%",
              color: colors.primaryText,
            }}
          >
            {workerNumber} ажилтантай
          </Text>
        </View>
      )}

      {/* Ажилтны тоо */}
      {createYear && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Ionicons
            name="create"
            size={24}
            color={colors.primaryText}
            style={{ width: "10%" }}
          />
          <Text
            style={{
              flexDirection: "row",
              width: "95%",
              color: colors.primaryText,
            }}
          >
            {createYear && createYear.slice(0, 4)} онд үүссэн
          </Text>
        </View>
      )}
      {location && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Ionicons
            name="location-sharp"
            size={24}
            color={colors.primaryText}
            style={{ width: "10%" }}
          />

          <Text
            style={{
              flexDirection: "row",
              width: "95%",
              color: colors.primaryText,
            }}
          >
            {location} онд үүссэн
          </Text>
        </View>
      )}
    </View>
  );
};

export default CompanyAbout;

const styles = StyleSheet.create({});
