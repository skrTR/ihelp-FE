import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import CircularProgress from "react-native-circular-progress-indicator";

const Cvs = ({ item, needApply, applyId }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.background,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        marginVertical: 4,
      }}
    >
      <View
        style={{
          paddingVertical: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              needApply
                ? navigation.navigate("ApplyCvDetailScreen", {
                    id: item.createUser,
                    applyId: applyId,
                  })
                : navigation.navigate("CvDetailScreen", {
                    id: item.createUser,
                  });
            }}
          >
            <Image
              source={{
                uri: `${api}/upload/${item.profile}`,
              }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 30,
                marginHorizontal: 5,
              }}
            />
            <View>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-bold",
                }}
              >
                {item.lastName} {item.firstName}
              </Text>
              <>
                {item.profession !== "" && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.primaryText,
                      width: "80%",
                    }}
                  >
                    {item.profession}{" "}
                    {item.workingCompany !== null && (
                      <Text
                        style={{
                          fontSize: 15,
                          color: colors.primaryText,
                        }}
                      >
                        @{item.workingCompany}
                      </Text>
                    )}
                  </Text>
                )}
              </>
              {item.education && (
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    fontSize: 14,
                    marginTop: 5,
                  }}
                >
                  Боловсрол:{" "}
                  <Text style={{ fontFamily: "Sf-regular" }}>
                    {item.education}
                  </Text>
                </Text>
              )}
              {item.experienceYear && (
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    fontSize: 14,
                  }}
                >
                  Ажлын туршлага:{" "}
                  <Text style={{ fontFamily: "Sf-regular" }}>
                    {item.experienceYear} жил
                  </Text>
                </Text>
              )}
              {item.occupationName !== "Сонгох" && (
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    fontSize: 14,
                    width: "80%",
                  }}
                >
                  Мэргэжил:{" "}
                  <Text style={{ fontFamily: "Sf-regular" }}>
                    {item.occupationName}
                  </Text>
                </Text>
              )}
              {item.gender && (
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    fontSize: 14,
                  }}
                >
                  хүйс:{" "}
                  <Text style={{ fontFamily: "Sf-regular" }}>
                    {item.gender}
                  </Text>
                </Text>
              )}
              {item.salaryExpectation !== null &&
                item.salaryExpectation !== "Сонгох" && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: "Sf-thin",
                      fontSize: 14,
                    }}
                  >
                    Цалингийн хүлээлт:{" "}
                    <Text style={{ fontFamily: "Sf-regular" }}>
                      {item.salaryExpectation}
                    </Text>
                  </Text>
                )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginRight: 10, position: "absolute", right: 0 }}>
        <CircularProgress
          value={item.score}
          activeStrokeColor={colors.primary}
          activeStrokeSecondaryColor={"#D76D77"}
          progressValueColor={colors.primaryText}
          inActiveStrokeOpacity={0.5}
          valueSuffix={"%"}
          delay={1000}
          radius={18}
          activeStrokeWidth={5}
          inActiveStrokeWidth={5}
        />
      </View>
    </View>
  );
};

export default Cvs;

const styles = StyleSheet.create({});
