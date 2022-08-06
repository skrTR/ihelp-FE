import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../../Constants";
import LinearGradientButton from "../../../../components/LinearGradientButton";
const AchievmentAddModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/achievement`, achievement)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [achievement, setAchievement] = useState({
    name: "",
    year: "",
    company: "",
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
        Шагнал авсан огноо
      </Text>
      <FormText
        placeholder="Шагнал авсан он"
        value={`${achievement.year}`}
        onChangeText={checkYear}
        errorText="Шагнал авсан он 4-10 тэмдэгтээс тогтоно."
        errorShow={error.year}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Шагнал гардуулсан газар
      </Text>
      <FormText
        placeholder="Шагнал гардуулсан компани"
        value={achievement.company}
        onChangeText={checkCompany}
        errorText="Шагнал гардуулсан компани урт 2-20 тэмдэгтээс тогтоно."
        errorShow={error.company}
      />
      <LinearGradientButton onClick={sendPersonalDetail} />
    </ScrollView>
  );
};

export default AchievmentAddModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
