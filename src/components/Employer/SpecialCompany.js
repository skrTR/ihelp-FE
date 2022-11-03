import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import UserContext from "../../context/UserContext";
import moment from "moment";
import FollowButton from "../FollowButton";
const SpecialCompany = (props) => {
  const { data, isFollowing } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [follow, setFollow] = useState(isFollowing);
  const onFollow = () => {
    if (follow) {
      setFollow(false);
      axios
        .post(
          `${api}/api/v1/follows/${data._id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          let message = err.message;

          if (message === "Request failed with status code 404")
            message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
          else if (message === "Network Error")
            message =
              "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
          else {
            message === err.response.data.error.message;
          }
          Alert.alert(message);
        });
    } else {
      setFollow(true);
      axios
        .post(
          `${api}/api/v1/follows/${data._id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          let message = err.message;

          if (message === "Request failed with status code 404")
            message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
          else if (message === "Network Error")
            message =
              "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
          else {
            message === err.response.data.error.message;
          }
          Alert.alert(message);
        });
    }
  };
  return (
    <View
      style={{
        backgroundColor:
          moment(data.special).format() < moment().format()
            ? colors.background
            : colors.specialWork,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 4,
        borderWidth: moment(data.special).format() < moment().format() ? 1 : 0,
        borderColor: colors.border,
      }}
      key={data._id}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() =>
          navigation.navigate("ViewCompanyProfile", { id: data._id })
        }
      >
        <ImageBackground
          source={{
            uri: `${api}/upload/${data.profile}`,
          }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 30,
          }}
          imageStyle={{ borderRadius: 30 }}
        >
          {data.isEmployer && (
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
              <Ionicons name={"briefcase"} size={12} color={"white"} />
            </View>
          )}
          {data.isEmployee && (
            <View
              style={{
                backgroundColor: "#3da4e3",
                borderRadius: 20,
                alignItems: "center",
                position: "absolute",
                alignSelf: "flex-end",
                bottom: 0,
                padding: 5,
                right: data.isEmployer ? 20 : 0,
              }}
            >
              <Ionicons name={"business"} size={12} color={"white"} />
            </View>
          )}
        </ImageBackground>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              width: "80%",
            }}
          >
            {data.firstName}
          </Text>
          {data.categoryName && (
            <Text
              style={{
                color: colors.secondaryText,
                width: data.categoryName.length > 12 ? "70%" : "100%",
              }}
            >
              {data.categoryName}
            </Text>
          )}
          <Text style={{ color: colors.primaryText }}>
            Нийт ажлын байр: {data.jobNumber}
          </Text>
        </View>
      </TouchableOpacity>
      {data._id === state.companyId ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB6C1",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            position: "absolute",
            right: 10,
          }}
          onPress={() => {
            navigation.navigate("BoostSpecialCompany");
          }}
        >
          <Text style={{ color: "black" }}>{data.special && "Тохиргоо"}</Text>
        </TouchableOpacity>
      ) : (
        <FollowButton
          onPress={onFollow}
          follow={follow}
          style={{
            backgroundColor: follow ? null : "#FFB6C1",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            width: 100,
            alignContent: "center",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 10,
          }}
        />
      )}
    </View>
  );
};

export default SpecialCompany;

const styles = StyleSheet.create({});
