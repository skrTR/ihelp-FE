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
import DataCountDown from "./DataCountDown";
import Icon from "@expo/vector-icons/Entypo";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
const UrgentWork = (props) => {
  const {
    id,
    createUserName,
    createUserProfile,
    isEmployee,
    isEmployer,
    occupation,
    type,
    urgent,
    salary,
    createUserId,
    title,
  } = props;

  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [checkLikeId, setCheckLikeId] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isCvSent, setIsCvSent] = useState(false);
  const [checkCvId, setCheckCvId] = useState([]);
  const getCheckLike = () => {
    {
      !state.isCompany &&
        axios
          .get(`${api}/api/v1/likes/${state.userId}/job?limit=100`)
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
  const sendCv = (id) => {
    axios
      .post(`${api}/api/v1/applies/${id}`)
      .then((res) => {
        Alert.alert("Таны CV амжилттай илгээгдлээ.");
        setIsCvSent(true);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };

  const getCheckCv = () => {
    {
      !state.isCompany &&
        axios
          .get(`${api}/api/v1/applies/${state.userId}/apply`)
          .then((res) => {
            setCheckCvId(res.data.data);
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
    }
  };
  useEffect(() => {
    getCheckCv();
  }, []);
  let cvCheck = checkCvId.map((e) => `${e.job}`);
  useEffect(() => {
    setIsCvSent(cvCheck.includes(`${id}`));
  }, [checkCvId]);
  return (
    <View
      style={{
        backgroundColor: colors.urgentWork,
        marginHorizontal: 5,
        paddingVertical: 5,
        marginVertical: 4,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
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
                width: "95%",
              }}
            >
              {/* {occupation} */}
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
                width: "95%",
              }}
            >
              {type} - {createUserName}
            </Text>
          </View>
        </TouchableOpacity>
        {createUserId === state.companyId && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.button,
              padding: 10,
              borderRadius: 10,
              marginRight: 20,
              alignItems: "center",
              position: "absolute",
              right: 0,
            }}
            onPress={() =>
              navigation.navigate("BoostEmployerWork", {
                id: id,
                type: "3",
              })
            }
          >
            <Text style={{ color: "black" }}>
              {moment(urgent).format() < moment().format()
                ? "Идэвхжүүлэх"
                : "Сунгах"}
            </Text>
          </TouchableOpacity>
        )}

        {!state.isCompany && (
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Ionicons
              name={isCvSent ? "send" : "send-outline"}
              size={26}
              color="white"
              style={{ marginRight: 10, top: 1 }}
              onPress={() => sendCv(id)}
            />
            <Icon
              name={isLike ? "heart" : "heart-outlined"}
              size={30}
              color={"white"}
              onPress={isLike ? unLiked : liked}
              style={{ textAlign: "right" }}
            />
          </View>
        )}
      </View>
      {urgent && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EmployerWorkDetail", {
              id: id,
              isLiked: isLike,
            })
          }
        >
          <DataCountDown
            createdAt={urgent}
            owner={createUserId === state.companyId ? true : false}
            text={
              createUserId === state.companyId
                ? "Яааралтай зарын дуусах хугацаа"
                : "CV хүлээн авах эцсийн хугацаа"
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UrgentWork;

const styles = StyleSheet.create({});
