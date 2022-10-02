import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import Verify from "../../Verify";
import FollowButton from "../../FollowButton";
const UserData = (props) => {
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            style={{ width: 50, height: 50 }}
            source={{ uri: `${api}/upload/${item.profile}` }}
            imageStyle={{ borderRadius: 50 }}
          >
            <Image
              source={
                item.status === "opentowork"
                  ? require("../../../../assets/open.png")
                  : item.status === "lookingForJob"
                  ? require("../../../../assets/looking.png")
                  : item.status === "getEmployee"
                  ? require("../../../../assets/hiring.png")
                  : null
              }
              style={{ width: 54, height: 54, right: 2, bottom: 2 }}
            />
          </ImageBackground>

          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: colors.primaryText }}>
              {item.lastName} {item.firstName}{" "}
              {item.isApproved && <Verify size={10} />}
            </Text>
            <Text style={{ color: colors.secondaryText }}>
              {item.profession && `${item.profession}`}
              {item.workingCompany && `@${item.workingCompany}`}
            </Text>
          </View>
        </TouchableOpacity>
        <FollowButton
          onPress={onFollow}
          follow={follow}
          style={{
            backgroundColor: follow ? null : "#FFB6C1",
            marginHorizontal: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            width: "25%",
            alignContent: "center",
            height: "80%",
          }}
        />
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

export default UserData;
