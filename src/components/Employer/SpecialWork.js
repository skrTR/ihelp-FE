import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";

import Icon from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import UserContext from "../../context/UserContext";
import moment from "moment";
import DataCountDown from "./DataCountDown";
const SpecialWork = (props) => {
  const {
    id,
    createUserName,
    createUserProfile,
    isEmployee,
    isEmployer,
    occupation,
    type,
    salary,
    createUserId,
    special,
    title,
  } = props;

  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [checkLikeId, setCheckLikeId] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const getCheckLike = () => {
    {
      !state.isCompany &&
        axios
          .get(`${api}/api/v1/likes/${state.userId}/job`)
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
      });
  };
  const liked = () => {
    axios
      .post(`${api}/api/v1/likes/${id}/job`)
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
        backgroundColor: colors.specialWork,
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
            navigation.navigate("EmployerWorkDetail", {
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
                <Ionicons name={"briefcase"} size={12} color={"white"} />
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
                width: title ? (title.length > 40 ? "60%" : "95%") : "95%",
              }}
            >
              {title ? title : occupation}
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
                width: "90%",
              }}
            >
              {type} - {createUserName}
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
              navigation.navigate("BoostEmployerWork", {
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
