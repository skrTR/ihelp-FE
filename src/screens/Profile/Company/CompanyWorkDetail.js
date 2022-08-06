import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const CompanyWorkDetail = (props) => {
  const { id } = props.route.params;
  const [workDetail, setWorkDetail] = useState();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const getWorkDetail = () => {
    axios
      .get(`${api}/api/v1/jobs/${id}`)
      .then((res) => {
        setWorkDetail(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getWorkDetail();
  }, []);
  if (!workDetail) {
    return null;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.background }}
    >
      <View style={{ margin: 10 }}>
        {/* Company */}

        {workDetail.createUser && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#2c3539",
              paddingVertical: 10,
              justifyContent: "space-between",
              borderRadius: 20,
            }}
            onPress={() =>
              navigation.navigate("ViewCompanyProfile", {
                id: workDetail.createUser,
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={{
                  uri: `${api}/upload/${workDetail.profile}`,
                }}
                style={{ width: 80, height: 80, borderRadius: 30 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Sf-bold",
                  }}
                >
                  {workDetail.firstName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Sf-thin",
                    marginVertical: 7,
                  }}
                >
                  {workDetail.comCategoryName}
                </Text>
                <Text style={{ color: "white", fontFamily: "Sf-bold" }}>
                  Нийт ажлын байр: {workDetail.comJobNumber}
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={50} color={colors.primaryText} />
          </TouchableOpacity>
        )}
        <View
          style={{
            backgroundColor: "#454545",
            padding: 30,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginVertical: 10,
                color: "white",
                bottom: 8,
              }}
            >
              Үндсэн мэдээлэл
            </Text>
          </View>
          <View style={{ flexDirection: "row", bottom: 8 }}>
            <View>
              <Text style={{ marginVertical: 4, color: "white" }}>Төрөл</Text>
              <Text style={{ marginVertical: 4, color: "white" }}>
                Цагийн хуваарь
              </Text>
              <Text style={{ marginVertical: 4, color: "white" }}>Цалин</Text>
              <Text style={{ marginVertical: 4, color: "white" }}>Байршил</Text>
            </View>
            <View style={{ marginLeft: 30 }}>
              <Text style={{ marginVertical: 4, color: "white" }}>
                {workDetail.type}
              </Text>
              <Text style={{ marginVertical: 4, color: "white" }}>
                {workDetail.schedule}
              </Text>
              <Text style={{ marginVertical: 4, color: "white" }}>
                {workDetail.salary}
              </Text>

              <Text
                style={{
                  width: workDetail.location.length > 40 ? "30%" : "90%",
                  color: "white",
                  top: 4,
                }}
              >
                {workDetail.location}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10,
              color: "white",
            }}
          >
            Гүйцэтгэх үндсэн үүрэг
          </Text>
          <View style={{ marginLeft: 10 }}>
            {workDetail.do && (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white" }}>
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={24}
                    color={colors.primary}
                  />
                </Text>
                <Text style={{ color: "white" }}>{workDetail.do}</Text>
              </View>
            )}
            {workDetail.do1 && (
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Text style={{ color: "white" }}>
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={24}
                    color={colors.primary}
                  />
                </Text>
                <Text style={{ color: "white" }}>{workDetail.do1}</Text>
              </View>
            )}
            {workDetail.do2 && (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white" }}>
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={24}
                    color={colors.primary}
                  />
                </Text>
                <Text style={{ color: "white" }}>{workDetail.do2}</Text>
              </View>
            )}
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10,
              color: "white",
            }}
          >
            Tавигдах шаардлага
          </Text>

          <View style={{ marginLeft: 10 }}>
            {workDetail.skill && (
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.skill}
                </Text>
              </View>
            )}
            {workDetail.skill1 && (
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.skill1}
                </Text>
              </View>
            )}
            {workDetail.skill2 && (
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.skill2}
                </Text>
              </View>
            )}
            {workDetail.skill3 && (
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.skill3}
                </Text>
              </View>
            )}

            {workDetail.education && (
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.education}
                </Text>
              </View>
            )}

            {workDetail.gender && (
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.gender}
                </Text>
              </View>
            )}

            {workDetail.language && (
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.language}
                </Text>
              </View>
            )}
            {workDetail.experience && (
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <MaterialCommunityIcons
                  name="head-dots-horizontal-outline"
                  size={20}
                  color={"#64e986"}
                />
                <Text style={{ color: "white", left: 5, top: 3 }}>
                  {workDetail.experience}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 20,
          marginBottom: 50,
        }}
        // onPress={props.onPress}
      >
        <Text style={{ textAlign: "center" }}>Устгах</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CompanyWorkDetail;

const styles = StyleSheet.create({});
