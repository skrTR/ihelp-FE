import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
const CompanyJobs = (props) => {
  const {
    id,
    createUserName,
    createUserProfile,
    isEmployer,
    isEmployee,
    occupation,
    type,
    salary,
    order,
  } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#454545",
        marginHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 4,
        borderRadius: 10,
        opacity: order > moment().format() ? 0.4 : 1,
      }}
      onPress={() => navigation.navigate("EmployerWorkDetail", { id })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            source={{
              uri: `${api}/upload/${createUserProfile}`,
            }}
            style={{
              width: 75,
              height: 75,
              borderRadius: 30,
              marginHorizontal: 5,
            }}
            imageStyle={{ borderRadius: 30 }}
          >
            {isEmployer && (
              <View
                style={{
                  backgroundColor: "#ff914d",
                  borderRadius: 20,
                  alignItems: "center",
                  position: "absolute",
                  alignSelf: "flex-end",
                  bottom: 0,
                  padding: 5,
                }}
              >
                <Ionicons
                  name={"briefcase"}
                  size={12}
                  color={colors.primaryText}
                />
              </View>
            )}
            {isEmployee && (
              <View
                style={{
                  backgroundColor: "#3da4e3",
                  borderRadius: 20,
                  alignItems: "center",
                  position: "absolute",
                  alignSelf: "flex-end",
                  bottom: 0,
                  padding: 5,
                  right: isEmployer ? 20 : 0,
                }}
              >
                <Ionicons
                  name={"business"}
                  size={12}
                  color={colors.primaryText}
                />
              </View>
            )}
          </ImageBackground>

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
              {occupation}
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
              {salary}₮
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-regular",
                fontWeight: "200",
              }}
            >
              {type} - {createUserName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompanyJobs;

const styles = StyleSheet.create({});
