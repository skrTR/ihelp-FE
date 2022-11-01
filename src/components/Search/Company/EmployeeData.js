import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Verify from "../../Verify";
import FollowButton from "../../FollowButton";
import SearchByCategory from "../../../components/Modals/SearchByCategory";
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
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 7,
        }}
        onPress={() =>
          navigation.navigate("ViewCompanyProfile", { id: item._id })
        }
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={{
              uri: `${api}/upload/${item.profile}`,
            }}
            style={{
              width: 60,
              height: 60,
            }}
            imageStyle={{ borderRadius: 30 }}
          >
            {item.isEmployer && (
              <View
                style={{
                  backgroundColor: "#3da4e3",
                  borderRadius: 20,
                  alignItems: "center",
                  position: "absolute",
                  alignSelf: "flex-end",
                  bottom: 0,
                  padding: 5,
                }}
              >
                <Ionicons
                  name={"business"}
                  size={6}
                  color={colors.primaryText}
                />
              </View>
            )}
            {item.isEmployee && (
              <View
                style={{
                  backgroundColor: "#ff914d",
                  borderRadius: 20,
                  alignItems: "center",
                  position: "absolute",
                  alignSelf: "flex-end",
                  bottom: 0,
                  padding: 5,
                  right: item.isEmployer ? 12 : 0,
                }}
              >
                <Ionicons name={"briefcase"} size={6} color={"white"} />
              </View>
            )}
          </ImageBackground>

          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: colors.primaryText, width: "75%" }}>
                {item.firstName} {item.isApproved && <Verify size={10} />}
              </Text>
            </View>
            {item.categoryName && (
              <Text
                style={{
                  color: colors.secondaryText,
                  width: item.categoryName.length > 12 ? "70%" : "100%",
                }}
              >
                {item.categoryName}
              </Text>
            )}
          </View>
        </View>
        <FollowButton
          onPress={onFollow}
          follow={follow}
          style={{
            backgroundColor: follow ? null : colors.button,
            marginHorizontal: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            width: 100,
            alignContent: "center",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default EmployeeData;
