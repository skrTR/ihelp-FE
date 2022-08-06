import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import Icon from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
const MyJobsDatas = (props) => {
  const {
    id,
    createUserName,
    createUserProfile,
    occupation,
    type,
    salary,
    percent,
    isEmployee,
    isEmployer,
  } = props;
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [checkLikeId, setCheckLikeId] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const getCheckLike = () => {
    axios
      .get(`${api}/api/v1/likes/${state.userId}/job`)
      .then((res) => {
        setCheckLikeId(res.data.data);
      })
      .catch((err) => {
        // alert(err);
      });
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
              width: 50,
              height: 50,
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
                  size={8}
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
                  right: isEmployer ? 15 : 0,
                }}
              >
                <Ionicons
                  name={"business"}
                  size={8}
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
              {salary}₮
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-regular",
                fontWeight: "200",
              }}
            >
              {type} - {createUserName}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ right: 10, flexDirection: "row" }}>
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
          <CircularProgress
            value={percent}
            activeStrokeColor={colors.primary}
            activeStrokeSecondaryColor={"#D76D77"}
            progressValueColor={colors.primaryText}
            inActiveStrokeOpacity={0.5}
            valueSuffix={"%"}
            delay={1000}
            radius={18}
            activeStrokeWidth={5}
            inActiveStrokeWidth={5}
          />
        </View>
      </View>
    </View>
  );
};

export default MyJobsDatas;

const styles = StyleSheet.create({});
