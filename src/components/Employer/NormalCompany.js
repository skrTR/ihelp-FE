import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserContext from "../../context/UserContext";
import axios from "axios";
import FollowButton from "../FollowButton";
const NormalCompany = (props) => {
  const { data, isFollowing } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [follow, setFollow] = useState(isFollowing);
  console.log(data);
  const onFollow = () => {
    if (follow) {
      setFollow(false);
      axios
        .post(
          `${api}/api/v1/follows/${data.id}/${
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
          `${api}/api/v1/follows/${data.id}/${
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
    <View
      style={{
        backgroundColor: colors.background,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 4,
        borderWidth: 1,
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
          <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>
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
            navigation.navigate("ProductUsePoint", {
              type: "SpecialCompanyEmployer",
            });
          }}
        >
          <Text style={{ color: "black" }}>
            {/* {data.employerSpecial ? "Cунгах" : "Онцлох болох"} */}
            Тохиргоо
          </Text>
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

export default NormalCompany;

const styles = StyleSheet.create({});
