import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../../Constants";
import moment from "moment";
const SendWorkHistory = (props) => {
  const { companyData, jobData, success, isViewed, createdAt, jobInfo } = props;
  const { colors } = useTheme();

  return (
    <>
      {jobData && (
        <View
          style={{
            backgroundColor: colors.background,
            marginHorizontal: 10,
            paddingVertical: 5,
            marginVertical: 4,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              // onPress={() => navigation.navigate("SettingWorkDetail", { id })}
            >
              <Image
                source={{
                  uri: `${api}/upload/${companyData.profile}`,
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
                    fontSize: 15,
                    color: colors.primaryText,
                    fontFamily: "Sf-bold",
                    fontWeight: "bold",
                    width: "95%",
                  }}
                >
                  {jobInfo.occupationName}
                  {/* Борлуулалт мэдээлэлийн ажилтан */}
                </Text>

                <Text
                  style={{
                    paddingVertical: 5,
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    fontSize: 14,
                  }}
                >
                  {jobData.salary}₮
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-regular",
                    fontWeight: "200",
                  }}
                >
                  {jobData.type} - {companyData.firstName}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ alignItems: "center", position: "absolute", right: 0 }}
            >
              {success === true ? (
                <Text style={{ color: colors.primaryText, marginRight: 10 }}>
                  Төлөв: <Text style={{ color: "green" }}>Зөвшөөрсөн</Text>
                </Text>
              ) : (
                success === false && (
                  <Text style={{ color: colors.primaryText, marginRight: 10 }}>
                    Төлөв: <Text style={{ color: "red" }}>Цуцалсан</Text>
                  </Text>
                )
              )}
              {success === undefined && (
                <Text style={{ color: colors.primaryText, marginRight: 10 }}>
                  Төлөв: {isViewed ? "Үзсэн" : "Үзээгүй"}
                </Text>
              )}
              <Text style={{ color: colors.primaryText }}>
                {moment(createdAt).format("YY-MM-DD")}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default SendWorkHistory;

const styles = StyleSheet.create({});
