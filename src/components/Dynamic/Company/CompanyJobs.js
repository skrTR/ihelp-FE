import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";
import DataCountDown from "../../Employer/DataCountDown";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../../../context/UserContext";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
const CompanyJobs = (props) => {
  const { data, needApply, id } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [checkLikeId, setCheckLikeId] = useState([]);
  const [isLike, setIsLike] = useState(false);
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
        alert(err);
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
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(
            needApply ? "CompanyJobCvDetail" : "EmployerWorkDetail",
            { id: data._id }
          );
        }}
      >
        <View
          style={{
            backgroundColor: data.isUrgent
              ? colors.urgentWork
              : data.isSpecial
              ? colors.specialWork
              : colors.background,
            marginHorizontal: 5,
            paddingVertical: 5,
            marginVertical: 4,
            borderRadius: 10,
            borderWidth: data.isUrgent === data.isSpecial ? 1 : 0,
            borderColor: colors.border,
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: `${api}/upload/${data.profile}`,
                }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 30,
                  marginHorizontal: 5,
                }}
                imageStyle={{ borderRadius: 30 }}
              >
                {data.isEmployer && (
                  <View
                    style={{
                      backgroundColor: "#ff914d",
                      borderRadius: 10,
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
                      borderRadius: 10,
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
                  {data.occupationName}
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
                  {data.salary}₮
                </Text>

                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-regular",
                    fontWeight: "200",
                  }}
                >
                  {data.type} - {data.firstName}
                </Text>
              </View>
            </View>
            <Entypo
              name={isLike ? "heart" : "heart-outlined"}
              size={30}
              color={"white"}
              onPress={isLike ? unLiked : liked}
              style={{ textAlign: "right", marginRight: 10 }}
            />
          </View>
          {state.userId === data.createUser ? (
            <DataCountDown
              createdAt={
                data.isUrgent
                  ? data.urgent
                  : data.isSpecial
                  ? data.special
                  : data.order && data.order
              }
              text={"3арын дуусах хугацаа"}
            />
          ) : null}
          {state.companyId === data.createUser ? (
            <DataCountDown
              createdAt={
                data.isUrgent
                  ? data.urgent
                  : data.isSpecial
                  ? data.special
                  : data.order && data.order
              }
              text={"3арын дуусах хугацаа"}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CompanyJobs;
