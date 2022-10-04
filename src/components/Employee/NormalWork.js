import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";

import Icon from "@expo/vector-icons/Entypo";
import axios from "axios";
import UserContext from "../../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import DataCountDown from "./DataCountDown";
const NormalWork = (props) => {
  const {
    id,
    createUserName,
    createUserProfile,
    isEmployee,
    isEmployer,
    occupation,
    price,
    job,
    createUserId,
    order,
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
        console.log(err);
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
          onPress={() =>
            navigation.navigate("EmployeeWorkDetail", {
              id: id,
              isLiked: isLike,
            })
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
              {price}₮
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-regular",
                fontWeight: "200",
              }}
            >
              {job} - {createUserName}
            </Text>
          </View>
        </TouchableOpacity>
        {createUserId === state.companyId && (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              padding: 10,
              borderRadius: 20,
              marginRight: 20,
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("BoostEmployeeWork", {
                id: id,
                type: "Normal",
              })
            }
          >
            <Text style={{ color: "black" }}>
              {order < moment().format() ? "Зар идэвхжүүлэх" : "Сунгах"}
            </Text>
          </TouchableOpacity>
        )}
        {!state.isCompany && (
          <View style={{}}>
            <Icon
              name={isLike ? "heart" : "heart-outlined"}
              size={30}
              color={"white"}
              onPress={isLike ? unLiked : liked}
              style={{ textAlign: "right", marginRight: 20 }}
            />
          </View>
        )}
      </View>
      {createUserId === state.companyId && order && (
        <DataCountDown createdAt={order} text={"Энгийн зарын дуусах хугацаа"} />
      )}
    </View>
  );
};

export default NormalWork;

const styles = StyleSheet.create({});
