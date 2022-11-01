import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  View,
  ImageBackground,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const BoostPost = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const [boostDay, setBoostDay] = useState(1);
  const [userPoint, setUserPoint] = useState([]);
  const state = useContext(UserContext);
  const [isType, setIsType] = useState(1);

  const navigation = useNavigation();
  let isMounted = true;
  const UserProfileData = () => {
    axios
      .get(`${api}/api/v1/cvs/${state.userId}?select=point`)
      .then((result) => {
        if (isMounted) {
          setUserPoint(result.data.data);
        }
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404") {
          message = "Уучлаарай сэрвэр дахин ажилуулана уу";
        } else if (message === "Network Error") {
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        } else {
          message === err.response.data.error.message;
        }
        Alert.alert(message);
      });
  };
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + " мянга"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + " cая"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  useEffect(() => {
    UserProfileData();
    return () => {
      isMounted = false;
    };
  }, []);
  const boostPost = () => {
    axios
      .put(`${api}/api/v1/posts/${data._id}/boost`, {
        boost: boostDay,
      })
      .then((res) => {
        Alert.alert("Амжиллтай", "Таны нийтлэл идэвхжилээ", [
          {
            text: "Буцах",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      })
      .catch((err) => {
        const message = err.response.data.error.message;
        Alert.alert("Анхаар", message, [
          {
            text: "Болих",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Хэтэвч цэнэглэх",
            onPress: () =>
              navigation.navigate("ProfileStack", { screen: "WalletScreen" }),
          },
        ]);
      });
  };
  if (!userPoint) {
    return null;
  }
  return (
    <>
      <ScrollView>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            borderWidth: 1,
            marginTop: 20,
            borderColor: "#FFB6C1",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: "30%",
              position: "absolute",
              right: 10,
              top: 10,
            }}
            onPress={() =>
              navigation.navigate("WalletScreen", {
                point: userPoint.point,
              })
            }
          >
            <LinearGradient
              colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
              style={{
                padding: 4,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="wallet-outline"
                  size={24}
                  color={colors.primaryText}
                />

                <Text style={{ color: "white" }}>
                  {numFormatter(userPoint.point)}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-thin",
                  fontSize: 12,
                }}
              >
                Хэтэвч
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
            }}
          >
            <ImageBackground
              source={{
                uri: `${api}/upload/${data.profile}`,
              }}
              style={{ width: 50, height: 50 }}
              imageStyle={{ borderRadius: 50 }}
            >
              <Image
                style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                source={
                  data.status === "lookingForJob"
                    ? require("../../../../assets/looking.png")
                    : data.status === "opentowork"
                    ? require("../../../../assets/open.png")
                    : data.status === "getEmployee"
                    ? require("../../../../assets/hiring.png")
                    : null
                }
              />
            </ImageBackground>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                {data.lastName} {data.firstName}
                {data.isApproved && (
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 50,
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <AntDesign
                      name="check"
                      size={13}
                      color={colors.primaryText}
                    />
                  </View>
                )}
              </Text>

              <Text
                style={{
                  color: colors.secondaryText,
                }}
              >
                {data.profession}{" "}
                {data.workingCompany && `@${data.workingCompany}`}
              </Text>
              <Text
                style={{
                  color: colors.secondaryText,
                }}
              >
                Идэвхжүүлсэн
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              color: colors.primaryText,
            }}
          >
            {data.body}
          </Text>
          <Image
            source={
              data.photo
                ? { uri: `${api}/upload/${data.photo}` }
                : require("../../../../assets/header.png")
            }
            style={{
              width: "90%",
              height: 200,
              alignSelf: "center",
              marginVertical: 20,
            }}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
            onPress={() => setIsType(1)}
          >
            <MaterialCommunityIcons
              name={
                isType === 1
                  ? "checkbox-intermediate"
                  : "checkbox-blank-outline"
              }
              size={25}
              color={isType === 1 ? "#FFB6C1" : colors.primaryText}
            />
            <Text style={{ color: colors.primaryText }}>1 хоног - 5 пойнт</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => setIsType(2)}
          >
            <MaterialCommunityIcons
              name={
                isType === 2
                  ? "checkbox-intermediate"
                  : "checkbox-blank-outline"
              }
              size={25}
              color={isType === 2 ? "#FFB6C1" : colors.primaryText}
            />
            <Text style={{ color: colors.primaryText }}>
              3 хоног - 10 пойнт
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsType(3)}
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={
                isType === 3
                  ? "checkbox-intermediate"
                  : "checkbox-blank-outline"
              }
              size={25}
              color={isType === 3 ? "#FFB6C1" : colors.primaryText}
            />
            <Text style={{ color: colors.primaryText }}>
              7 хоног - 15 пойнт
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              color: colors.secondaryText,
              fontWeight: "100",
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            Энэхүү идэвхжүүлэлт нь таныг нийтлэлээ идэвхжүүлэх товч дарснаар
            хугацаа нь эхлэх бөгөөд нетворк хэсэгт хэрэглэгчдийн оруулсан 5
            нийтлэл тутамд санамсаргүй горимоор бусад бүх хэрэглэгчдэд үзэгдэх
            болно.
          </Text>
          <Text
            style={{
              color: "#FFB6C1",
              fontWeight: "100",
              marginHorizontal: 20,
            }}
          >
            Жич: Хууль бус, бусдын нэр хүндэд халдсан, садар самуун сурталчилсан
            гэх мэт зохимжгүй нийтлэл оруулсан хэрэглэгчийн хаягийг хааж
            холбогдох хэрэг хянан шийдвэрлэх газарт илгээх болно
          </Text>
        </View>
        <View style={{ marginVertical: 10 }} />
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.border,
            marginHorizontal: 10,
            backgroundColor: "#FFB6C1",
          }}
          onPress={boostPost}
        >
          <Text
            style={{
              textAlign: "center",
              color: "black",
            }}
          >
            Идэвхжүүлэх
          </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 10 }} />
      </ScrollView>
    </>
  );
};

export default BoostPost;

const styles = StyleSheet.create({});
