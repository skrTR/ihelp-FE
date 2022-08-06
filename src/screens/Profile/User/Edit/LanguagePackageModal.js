import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
const LanguagePackagaModal = ({ route }) => {
  const { data } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View>
      {data.map((e) => {
        return (
          <TouchableOpacity
            key={e._id}
            onPress={() =>
              navigation.navigate("LanguageDetailModal", { data: e })
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-bold",
                  }}
                >
                  {e.country} -{" "}
                </Text>
                <Text style={{ color: colors.primaryText }}>{e.level}</Text>
              </View>
              <View>
                <SimpleLineIcons
                  name="pencil"
                  size={24}
                  color={colors.primaryText}
                  style={{ marginRight: 20 }}
                  onPress={() =>
                    navigation.navigate("LanguageDetailModal", { data: e })
                  }
                />
              </View>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LanguagePackagaModal;

const styles = StyleSheet.create({});
