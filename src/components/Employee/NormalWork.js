import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import Icon from "@expo/vector-icons/Entypo";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import DataCountDown from "./DataCountDown";
import Toast from "react-native-root-toast";
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
    special,
    own,
  } = props;

  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [checkLikeId, setCheckLikeId] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const { height } = Dimensions.get("window");
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
        Toast.show("Хадгалсан зараас устлаа", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "#FFB6C1",
        });
      })
      .catch((err) => {
        let text = err.message;
        if (text === "Network Error") {
          text ===
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 429") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "403 Forbidden") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 404") {
          text = "Сервер таны хүсэлтийг олсонгүй";
        } else if (text === "Request failed with status code 408") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 413") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 500") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 502") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 504") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text == "JSON Parse error: Unrecognized token '<'") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        }
        Toast.show(text, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "red",
        });
      });
  };
  const liked = () => {
    axios
      .post(`${api}/api/v1/likes/${id}/announcement`)
      .then((res) => {
        setIsLike(true);
        Toast.show("Амжилтай хадгаллаа", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "#FFB6C1",
        });
      })
      .catch((err) => {
        let text = err.message;
        if (text === "Network Error") {
          text ===
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 429") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "403 Forbidden") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 404") {
          text = "Сервер таны хүсэлтийг олсонгүй";
        } else if (text === "Request failed with status code 408") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 413") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 500") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 502") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 504") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text == "JSON Parse error: Unrecognized token '<'") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        }
        Toast.show(text, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "red",
        });
      });
  };

  return (
    <View
      style={{
        backgroundColor:
          moment(special).format() < moment().format()
            ? colors.background
            : colors.urgentWork,
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
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
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
                width: job.length < 50 ? "75%" : "40%",
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
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
              {price}₮
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-regular",
                fontWeight: "200",
                width: "90%",
              }}
            >
              {occupation && `${occupation} `}
              {createUserName && `- ${createUserName} `}
            </Text>
          </View>
        </TouchableOpacity>
        {createUserId === own && (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              padding: 10,
              borderRadius: 10,
              marginRight: 20,
              alignItems: "center",
              position: "absolute",
              right: 0,
              top: 10,
            }}
            onPress={() =>
              navigation.navigate("BoostEmployeeWork", {
                id: id,
                type: moment(special).format() < moment().format() ? "1" : "2",
              })
            }
          >
            <Text style={{ color: "black" }}>{"Сунгах"}</Text>
          </TouchableOpacity>
        )}
        <View>
          {state.isCompany ? null : own === createUserId ? null : (
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
          {createUserId === own ? null : moment(special).format() <
            moment().format() ? null : (
            <MaterialCommunityIcons
              name="offer"
              size={30}
              color={colors.primaryText}
              style={{ marginRight: 10, marginTop: 10 }}
              onPress={() =>
                navigation.navigate("CompanySendWorkRequest", { id: id })
              }
            />
          )}
        </View>
      </View>
      {createUserId === own && order && (
        <DataCountDown
          createdAt={order}
          text={"Энгийн зарын дуусах хугацаа"}
          owner={true}
        />
      )}
      {createUserId === own && special && (
        <DataCountDown
          createdAt={special}
          text={"Онцгой зарын дуусах хугацаа"}
          owner={true}
        />
      )}
    </View>
  );
};

export default NormalWork;

const styles = StyleSheet.create({});
