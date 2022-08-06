import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MyButton from "../../../../components/MyButton";
import { api } from "../../../../../Constants";
const AchievmentDetailModal = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const sendPersonalDetail = () => {
    axios
      .put(`${api}/api/v1/questionnaires/${data._id}/achievement`, achievement)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const deleteAchievement = () => {
    axios
      .delete(`${api}/api/v1/questionnaires/${data._id}/achievement`)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const [achievement, setAchievement] = useState({
    name: data.name,
    year: data.year,
    company: data.company,
  });
  const [error, setError] = useState({
    name: false,
    year: false,
    company: false,
  });
  const checkName = (text) => {
    setError({
      ...error,
      name: text.length < 1,
    });
    setAchievement({
      ...achievement,
      name: text,
    });
  };
  const checkYear = (text) => {
    setError({
      ...error,
      year: text.length < 3,
    });
    setAchievement({
      ...achievement,
      year: text,
    });
  };
  const checkCompany = (text) => {
    setError({
      ...error,
      year: text.length < 1,
    });
    setAchievement({
      ...achievement,
      company: text,
    });
  };
  return (
    <ScrollView style={{ marginHorizontal: 20 }}>
      <Text
        style={[styles.textTitle, { color: colors.primaryText, marginTop: 20 }]}
      >
        Шагналын нэр
      </Text>
      <FormText
        placeholder="Шагналын нэр"
        value={achievement.name}
        onChangeText={checkName}
        errorText="Шагналын нэр 2-20 тэмдэгтээс тогтоно."
        errorShow={error.name}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Шагнал авсан он
      </Text>
      <FormText
        placeholder="Шагнал авсан он"
        value={`${achievement.year}`}
        onChangeText={checkYear}
        errorText="Шагнал авсан он 4-10 тэмдэгтээс тогтоно."
        errorShow={error.year}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Шагнал гардуулсан компани
      </Text>
      <FormText
        placeholder="Шагнал гардуулсан компани"
        value={achievement.company}
        onChangeText={checkCompany}
        errorText="Шагнал гардуулсан компани урт 2-20 тэмдэгтээс тогтоно."
        errorShow={error.company}
      />

      <LinearGradient
        colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
        style={{ paddingHorizontal: 20, borderRadius: 20, marginTop: 20 }}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
      >
        <TouchableOpacity
          onPress={sendPersonalDetail}
          style={{
            alignSelf: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "white" }}> Хадгалах </Text>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity
        onPress={deleteAchievement}
        style={{
          marginTop: 20,
          borderRadius: 20,
          paddingVertical: 10,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.primaryText, textAlign: "center" }}>
          {" "}
          Устгах{" "}
        </Text>
      </TouchableOpacity>
      <MyButton
        onPress={() => navigation.navigate("AchievmentAddModal")}
        text="Гавьяа шагнал нэмэх"
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

export default AchievmentDetailModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
