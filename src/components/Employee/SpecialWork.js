import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";

import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import UserContext from "../../context/UserContext";
import moment from "moment";
import DataCountDown from "./DataCountDown";
import Verify from "../Verify";
const SpecialWork = (props) => {
  const {
    id,
    createUserName,
    createUserProfile,
    isEmployee,
    isEmployer,
    occupation,
    salary,
    job,
    createUserId,
    special,
  } = props;

  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [checkLikeId, setCheckLikeId] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const getCheckLike = () => {
    {
      state.userId &&
        axios
          .get(`${api}/api/v1/likes/${state.userId}/announcement`)
          .then((res) => {
            setCheckLikeId(res.data.data);
          })
          .catch((err) => {
            // alert(err);
          });
    }
  };
  useEffect(() => {
    getCheckLike();
  }, []);
  useEffect(() => {
    setIsLike(checkLikeId.includes(`${id}`));
  }, [checkLikeId]);

  const unLiked = () => {
    axios
      .delete(`${api}/api/v1/likes/${id}/job`)
      .then((res) => {
        setIsLike(false);
        Alert.alert("Амжилттай устгалаа");
      })
      .catch((err) => {
        // alert(err);
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
  };
  const liked = () => {
    axios
      .post(`${api}/api/v1/likes/${id}/announcement`)
      .then((res) => {
        setIsLike(true);
        Alert.alert("Амжилттай хадгаллаа");
      })
      .catch((err) => {
        // alert(err);
      });
  };

  return (
    <View
      style={{
        backgroundColor: colors.urgentWork,
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
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
          onPress={() =>
            navigation.navigate("EmployeeWorkDetail", { id, isLiked: isLike })
          }
        >
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
            {isEmployee && (
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
            {isEmployer && (
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
                <Ionicons name={"business"} size={12} color={"white"} />
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
                width: job.length > 10 ? "50%" : "95%",
              }}
            >
              {job}
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
              {salary === "1,000,000 хүртэлх"
                ? "1,000,000₮ хүртэлх"
                : `${salary}₮`}
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-regular",
                fontWeight: "200",
                width: "90%",
              }}
            >
              {`${occupation}  - `}
              {createUserName}
            </Text>
          </View>
        </TouchableOpacity>
        {createUserId === state.companyId && (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              padding: 10,
              borderRadius: 10,
              marginRight: 20,
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("BoostEmployeeWork", {
                id: id,
                type: "2",
              })
            }
          >
            <Text style={{ color: "black" }}>
              {special < moment().format() ? "Зар идэвхжүүлэх" : "Сунгах"}
            </Text>
          </TouchableOpacity>
        )}
        <View style={{}}>
          {!state.isCompany && (
            <Entypo
              name={isLike ? "heart" : "heart-outlined"}
              size={30}
              color={"white"}
              onPress={isLike ? unLiked : liked}
              style={{ textAlign: "right", marginRight: 20 }}
            />
          )}
          {createUserId === state.companyId ? null : (
            <MaterialCommunityIcons
              name="offer"
              size={30}
              color="white"
              style={{ marginRight: 10, marginTop: 10 }}
              onPress={() =>
                navigation.navigate("CompanySendWorkRequest", { id: id })
              }
            />
          )}
        </View>
      </View>
      {createUserId === state.companyId && special && (
        <DataCountDown
          createdAt={special}
          text={"Онцгой зарын дуусах хугацаа"}
          owner={true}
        />
      )}
    </View>
  );
};

export default SpecialWork;

const styles = StyleSheet.create({});
