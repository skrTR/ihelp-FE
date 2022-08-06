import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import UserContext from "../../context/UserContext";
const SpecialCompany = (props) => {
  const { data, isFollowing } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [follow, setFollow] = useState(isFollowing);
  const onFollow = () => {
    if (follow) {
      setFollow(false);
      axios
        .post(
          `${api}/api/v1/follows/${data._id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFollow(true);
      axios
        .post(
          `${api}/api/v1/follows/${data._id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#454545",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 4,
      }}
      key={data._id}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() =>
          navigation.navigate("ViewCompanyProfile", { id: data._id })
        }
      >
        <ImageBackground
          source={{
            uri: `${api}/upload/${data.profile}`,
          }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 30,
          }}
          imageStyle={{ borderRadius: 30 }}
        >
          {data.isEmployer && (
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
          {data.isEmployee && (
            <View
              style={{
                backgroundColor: "#3da4e3",
                borderRadius: 20,
                alignItems: "center",
                position: "absolute",
                alignSelf: "flex-end",
                bottom: 0,
                padding: 5,
                right: data.isEmployer ? 20 : 0,
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
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {data.name}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Sf-thin",
              marginVertical: 5,
            }}
          >
            {data.categoryName}
          </Text>
          <Text style={{ color: "white" }}>
            Нийт ажлын байр: {data.jobNumber}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: !follow ? "#FFB6C1" : null,
          marginHorizontal: 5,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
          width: "25%",
          alignContent: "center",
          height: "50%",
        }}
        onPress={onFollow}
      >
        <View
          style={{
            flexDirection: "row",
            top: 5,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <AntDesign
            name={follow ? "deleteuser" : "adduser"}
            size={24}
            color={!follow ? colors.border : colors.primaryText}
          />
          <Text
            style={{
              textAlign: "center",

              color: !follow ? colors.border : colors.primaryText,
            }}
          >
            {" "}
            {follow ? "Дагадаг" : "Дагах"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SpecialCompany;

const styles = StyleSheet.create({});
