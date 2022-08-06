import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";
import { api } from "../../../../../Constants";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
const ExperiencePackageModal = (props) => {
  const { data } = props.route.params;

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
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewCompanyProfile", { id: e._id })
                  }
                >
                  <Image
                    source={{ uri: `${api}/upload/${e.companyPhoto}` }}
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 10, flex: 1, bottom: 3 }}>
                  <Text
                    style={{ color: colors.primaryText, fontFamily: "Sf-bold" }}
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
                    {moment(e.start).format("MMM YYYY")}-
                    {e.isWorking
                      ? moment(e.end).format("MMM YYYY")
                      : moment().format("MMM YYYY")}
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
              <View>
                <SimpleLineIcons
                  name="pencil"
                  size={24}
                  color={colors.primaryText}
                  style={{ marginRight: 20 }}
                  onPress={() =>
                    navigation.navigate("ExperienceDetailModal", { data: e })
                  }
                />
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default ExperiencePackageModal;

const styles = StyleSheet.create({});
