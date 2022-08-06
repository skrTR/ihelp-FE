import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
const EmployeeData = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { isFollowing, item } = props;
  const state = useContext(UserContext);
  const [follow, setFollow] = useState(isFollowing);
  const onFollow = () => {
    if (follow) {
      setFollow(false);
      axios
        .post(
          `${api}/api/v1/follows/${item.id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFollow(true);
      axios
        .post(
          `${api}/api/v1/follows/${item.id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("ViewCompanyProfile", { id: item._id })
          }
        >
          <ImageBackground
            source={{
              uri: `${api}/upload/${item.profile}`,
            }}
            style={{
              width: 50,
              height: 50,
            }}
            imageStyle={{ borderRadius: 30 }}
          >
            {item.isEmployer && (
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
                  size={6}
                  color={colors.primaryText}
                />
              </View>
            )}
            {item.isEmployee && (
              <View
                style={{
                  backgroundColor: "#3da4e3",
                  borderRadius: 20,
                  alignItems: "center",
                  position: "absolute",
                  alignSelf: "flex-end",
                  bottom: 0,
                  padding: 5,
                  right: item.isEmployer ? 12 : 0,
                }}
              >
                <Ionicons
                  name={"business"}
                  size={6}
                  color={colors.primaryText}
                />
              </View>
            )}
          </ImageBackground>

          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: colors.primaryText }}>{item.firstName}</Text>
            <Text style={{ color: colors.secondaryText }}>
              {item.categoryName}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: !follow ? "#FFB6C1" : null,
            marginHorizontal: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            width: "25%",
            alignContent: "center",
            height: "80%",
          }}
          onPress={onFollow}
        >
          <View
            style={{
              flexDirection: "row",
              top: 5,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <AntDesign
              name={follow ? "deleteuser" : "adduser"}
              size={24}
              color={!follow ? colors.border : colors.primaryText}
            />
            <Text
              style={{
                textAlign: "center",

                color: !follow ? colors.border : colors.primaryText,
              }}
            >
              {" "}
              {follow ? "Дагадаг" : "Дагах"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
    </>
  );
};

export default EmployeeData;
