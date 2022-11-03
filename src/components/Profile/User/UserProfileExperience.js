import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import Border from "../../Border";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { api } from "../../../../Constants";
import moment from "moment";
const UserProfileExperience = ({ data }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      {/* Header Pencil And Add */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            marginHorizontal: 10,
            fontFamily: "Sf-bold",
            fontSize: 20,
          }}
        >
          Туршлага
        </Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 20 }}
            onPress={() =>
              navigation.navigate("ExperienceAddModal", { data: data })
            }
          />
          <SimpleLineIcons
            name="pencil"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 20 }}
            onPress={() =>
              navigation.navigate("ExperiencePackageModal", { data: data })
            }
          />
        </View>
      </View>
      {data.map((e) => {
        return (
          <View key={e._id}>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity
                // onPress={() => {
                //   if (e.companyId !== null) {
                //     navigation.navigate("ViewCompanyProfile", {
                //       id: e._id,
                //     });
                //   } else {
                //     Alert.alert(
                //       "Хэрэглэгч өрөө оруулсан байгууллага тул профайл байхгүй байна"
                //     );
                //   }
                // }}
                >
                  <Image
                    source={{ uri: `${api}/upload/${e.companyPhoto}` }}
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                  />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 10, flex: 1, bottom: 3 }}>
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: "Sf-bold",
                    }}
                  >
                    {e.position}{" "}
                  </Text>
                  <Text style={{ color: colors.primaryText }}>{e.company}</Text>
                  <Text
                    style={{
                      color: colors.secondaryText,
                      fontFamily: "Sf-thin",
                    }}
                  >
                    {moment(e.start).format("MMM YYYY")} -{" "}
                    {!e.isWorking
                      ? moment(e.end).format("MMM YYYY")
                      : "Одоог хүртэл"}
                  </Text>
                  <Text
                    style={{
                      color: colors.secondaryText,
                      fontFamily: "Sf-thin",
                    }}
                  >
                    {e.location}
                  </Text>
                  <Text style={{ color: colors.primaryText }}>{e.do}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                marginVertical: 5,
              }}
            />
          </View>
        );
      })}
    </>
  );
};

export default UserProfileExperience;

const styles = StyleSheet.create({});
