import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import moment from "moment";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
const CoursePackageModal = ({ route }) => {
  const { data } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View>
      {data.map((e) => {
        return (
          <View key={e._id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewCompanyProfile", { id: e._id })
                  }
                >
                  <Image
                    source={{ uri: `${api}/upload/${e.schoolPhoto}` }}
                    style={{ width: 50, height: 50, resizeMode: "cover" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 10, bottom: 3 }}
                  onPress={() =>
                    navigation.navigate("CourseDetailModal", { data: e })
                  }
                >
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
                    {moment(e.start).format("YYYY")}{" "}
                    {e.isStudying
                      ? moment().format("YYYY")
                      : moment(e.end).format("YYYY")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <SimpleLineIcons
                  name="pencil"
                  size={24}
                  color={colors.primaryText}
                  style={{ marginRight: 20 }}
                  onPress={() =>
                    navigation.navigate("CourseDetailModal", { data: e })
                  }
                />
              </View>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default CoursePackageModal;

const styles = StyleSheet.create({});
