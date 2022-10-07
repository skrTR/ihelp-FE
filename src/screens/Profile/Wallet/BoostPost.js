import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
import MyButton from "../../../components/MyButton";

const BoostPost = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const [boostDay, setBoostDay] = useState(1);
  const [userPoint, setUserPoint] = useState([]);
  const state = useContext(UserContext);
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
        }
      });
  };
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
        console.log(err);
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
            marginHorizontal: 20,
            borderWidth: 1,
            marginTop: 20,
            borderColor: boostDay === 1 ? "green" : colors.border,
          }}
          onPress={() => setBoostDay(1)}
        >
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
              marginTop: 20,
            }}
          />
          <Text
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              color: colors.primaryText,
            }}
          >
            {data.body}
          </Text>
          <Text
            style={{
              textAlign: "right",
              margin: 10,
              color: colors.primaryText,
            }}
          >
            Таны данснаас хасагдах пойнт:{" "}
            <Text style={{ fontFamily: "Sf-bold" }}>1</Text>
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginHorizontal: 10,
              marginBottom: 10,
              color: colors.primaryText,
            }}
          >
            {userPoint.point > 1 && "Таны дансанд үлдэх пойнт:"}{" "}
            <Text
              style={{
                fontFamily: "Sf-bold",
                color: userPoint.point < 1 ? "red" : colors.primaryText,
              }}
            >
              {userPoint.point > 1
                ? userPoint.point - 1
                : "Үлдэгдэл хүрэлцэхгүй байна"}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            borderWidth: 1,
            marginTop: 20,
            borderColor: boostDay === 3 ? "green" : colors.border,
          }}
          onPress={() => setBoostDay(3)}
        >
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
              marginTop: 20,
            }}
          />
          <Text
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              color: colors.primaryText,
            }}
          >
            {data.body}
          </Text>
          <Text
            style={{
              textAlign: "right",
              margin: 10,
              color: colors.primaryText,
            }}
          >
            Таны данснаас хасагдах пойнт:{" "}
            <Text style={{ fontFamily: "Sf-bold" }}>3</Text>
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginHorizontal: 10,
              marginBottom: 10,
              color: colors.primaryText,
            }}
          >
            {userPoint.point > 3 && "Таны дансанд үлдэх пойнт:"}{" "}
            <Text
              style={{
                fontFamily: "Sf-bold",
                color: userPoint.point < 3 ? "red" : colors.primaryText,
              }}
            >
              {userPoint.point > 3
                ? userPoint.point - 3
                : "Үлдэгдэл хүрэлцэхгүй байна"}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            borderWidth: 1,
            marginTop: 20,
            borderColor: boostDay === 7 ? "green" : colors.border,
          }}
          onPress={() => setBoostDay(7)}
        >
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
              marginTop: 20,
            }}
          />
          <Text
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              color: colors.primaryText,
            }}
          >
            {data.body}
          </Text>
          <Text
            style={{
              textAlign: "right",
              margin: 10,
              color: colors.primaryText,
            }}
          >
            Таны данснаас хасагдах пойнт:{" "}
            <Text style={{ fontFamily: "Sf-bold" }}>7</Text>
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginHorizontal: 10,
              marginBottom: 10,
              color: colors.primaryText,
            }}
          >
            {userPoint.point > 7 && "Таны дансанд үлдэх пойнт:"}{" "}
            <Text
              style={{
                fontFamily: "Sf-bold",
                color: userPoint.point < 7 ? "red" : colors.primaryText,
              }}
            >
              {userPoint.point > 7
                ? userPoint.point - 7
                : "Үлдэгдэл хүрэлцэхгүй байна"}
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 10 }} />
        <MyButton text={"Бүүстлэх"} onPress={boostPost} />
        <View style={{ marginBottom: 10 }} />
      </ScrollView>
    </>
  );
};

export default BoostPost;

const styles = StyleSheet.create({});
