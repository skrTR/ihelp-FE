import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
const PostSettings = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [postData, setPostData] = useState([]);
  const getPost = () => {
    axios
      .get(`${api}/api/v1/posts/${id}`)
      .then((res) => {
        setPostData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = () => {
    axios
      .delete(`${api}/api/v1/posts/${id}`)
      .then((res) => {
        console.log(res.data.data);
        navigation.goBack();
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
      {/* Edit */}
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() =>
            navigation.navigate("EditPost", { id: id, postData: postData })
          }
        >
          <Feather name="edit" size={28} color={colors.primaryText} />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
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
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() => navigation.navigate("BoostPost", { data: postData })}
        >
          <SimpleLineIcons name="energy" size={28} color={colors.primaryText} />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
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
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
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
          <AntDesign name="delete" size={28} color={colors.primaryText} />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
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
    </View>
  );
};

export default PostSettings;

const styles = StyleSheet.create({});
