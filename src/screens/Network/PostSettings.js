import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import Toast from "react-native-root-toast";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
const { height } = Dimensions.get("window");
const PostSettings = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [postData, setPostData] = useState([]);
  const state = useContext(UserContext);
  const getPost = () => {
    axios
      .get(`${api}/api/v1/posts/${id}`)
      .then((res) => {
        setPostData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = () => {
    axios
      .delete(`${api}/api/v1/posts/${id}`)
      .then((res) => {
        Toast.show("Амжилтай устгалаа", {
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
        navigation.navigate({
          name: "NetworkingScreen",
          params: { indexId: id },
          merge: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <View style={{ marginHorizontal: 20 }}>
      {state.userId === postData.createUser ? (
        <>
          {/* Edit */}
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() =>
                navigation.navigate("EditPost", { id: id, postData: postData })
              }
            >
              <Feather name="edit" size={26} color={colors.primaryText} />
              <Text
                style={{
                  color: colors.primaryText,
                  marginLeft: 20,
                  fontSize: 16,
                }}
              >
                Нийтлэл янзлах
              </Text>
            </TouchableOpacity>
            {/* Line */}
            <View
              style={{
                borderWidth: 0.5,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
          </View>
          {/* Boostleh */}
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() =>
                navigation.navigate("BoostPost", { data: postData })
              }
            >
              <SimpleLineIcons
                name="energy"
                size={26}
                color={colors.primaryText}
              />
              <Text
                style={{
                  color: colors.primaryText,
                  marginLeft: 20,
                  fontSize: 16,
                }}
              >
                Hийтлэл идэвхжүүлэх
              </Text>
            </TouchableOpacity>
            {/* Line */}
            <View
              style={{
                borderWidth: 0.5,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
          </View>
          {/* Устгах */}
          <View style={{}}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() =>
                Alert.alert("Та нийтлэлээ устгахдаа итгэлтэй байна уу?", "", [
                  {
                    text: "Болих",
                    style: "cancel",
                  },
                  { text: "Устгах", onPress: deletePost },
                ])
              }
            >
              <AntDesign name="delete" size={26} color={colors.primaryText} />
              <Text
                style={{
                  color: colors.primaryText,
                  marginLeft: 20,
                  fontSize: 16,
                }}
              >
                Нийтлэл устгах
              </Text>
            </TouchableOpacity>
            {/* Line */}
            <View
              style={{
                borderWidth: 0.5,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
          </View>
        </>
      ) : (
        <>
          {/* Report */}
          <View style={{}}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() =>
                Alert.alert(
                  "Та нийтлэлд гомдол илгээснээр манай админаас шалгаж нийтлэлд арга хэмжээ авах болно",
                  "",
                  [
                    {
                      text: "Үгүй",
                      style: "cancel",
                    },
                    {
                      text: "Тийм",
                      onPress: () => navigation.navigate("PostReport"),
                    },
                  ]
                )
              }
            >
              <AntDesign name="flag" size={26} color={colors.primaryText} />
              <Text
                style={{
                  color: colors.primaryText,
                  marginLeft: 20,
                  fontSize: 16,
                }}
              >
                Нийтлэлд гомдол мэдүүлэх
              </Text>
            </TouchableOpacity>
            {/* Line */}
            <View
              style={{
                borderWidth: 0.5,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default PostSettings;

const styles = StyleSheet.create({});
