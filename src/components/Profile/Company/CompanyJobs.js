import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";

const CompanyJobs = (props) => {
  const {
    id,
    profile,
    firstName,
    occupation,
    type,
    salary,
    count,
    categoryName,
    createUser,
  } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  return (
    <View
      style={{
        backgroundColor: "#454545",
        marginHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 4,
        borderRadius: 10,
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
          onPress={() => navigation.navigate("CompanyWorkDetail", { id })}
        >
          <Image
            source={{
              uri: `${api}/upload/${profile}`,
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
              {occupation}
              {/* Борлуулалт мэдээлэлийн ажилтан */}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                fontWeight: "bold",
                marginTop: 2,
              }}
            >
              {categoryName}
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
              {type} - {firstName}
            </Text>
          </View>
        </TouchableOpacity>
        {createUser === state.companyId && (
          <View style={{}}>
            <Text
              style={{
                color: colors.primaryText,
                width: "80%",
                textAlign: "center",
              }}
            >
              Зарыг үзсэн тоо:{" "}
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-bold",
                }}
              >
                {count}
              </Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CompanyJobs;
