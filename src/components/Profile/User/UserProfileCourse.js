import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Border from "../../Border";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";
import moment from "moment";
const UserProfileCourse = ({ data }) => {
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
          Боловсрол
        </Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate("CourseAddModal")}
          />
          <SimpleLineIcons
            name="pencil"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 20 }}
            onPress={() =>
              navigation.navigate("CoursePackageModal", { data: data })
            }
          />
        </View>
      </View>
      {data.map((e) => {
        return (
          <View key={e._id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <TouchableOpacity
                // onPress={() => {
                //   if (e.schoolId !== null) {
                //     navigation.navigate("ViewCompanyProfile", { id: e._id });
                //   } else {
                //     alert(
                //       "хэрэглэгч өрөө оруулсан сургууль тул профайл байхгүй байна"
                //     );
                //   }
                // }}
                >
                  <Image
                    source={{ uri: `${api}/upload/${e.schoolPhoto}` }}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "cover",
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 10, bottom: 3 }}>
                  <Text
                    style={{ color: colors.primaryText, fontFamily: "Sf-bold" }}
                  >
                    {e.school}
                  </Text>
                  <Text style={{ color: colors.primaryText }}>{e.field}</Text>
                  <Text
                    style={{
                      color: colors.secondaryText,
                      fontFamily: "Sf-thin",
                    }}
                  >
                    {moment(e.start).format("YYYY")} -{" "}
                    {e.isStudying
                      ? `сурч байгаа`
                      : moment(e.end).format("YYYY")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default UserProfileCourse;

const styles = StyleSheet.create({});
