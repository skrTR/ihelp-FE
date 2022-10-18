import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../../Constants";
import YearModal from "../../../../components/Modals/YearModal";
const AchievmentAddModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  // Шагнал авсан огноо сонгох модал
  const [chooseYearModal, setChooseYearModal] = useState(false);
  const [chooseYear, setChooseYear] = useState("");
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
    achievementYear: "",
    company: "",
  });
  const [error, setError] = useState({
    name: false,
    achievementYear: false,
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
    setChooseYearModal(!chooseYearModal);
    setAchievement({
      ...achievement,
      achievementYear: text,
    });
  };

  const checkCompany = (text) => {
    setError({
      ...error,
      company: text.length < 1,
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
      <TouchableOpacity onPress={() => setChooseYearModal(true)}>
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Шагнал авсан огноо
        </Text>
        <View
          style={{
            backgroundColor: colors.secondaryText,
            padding: 12,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {chooseYear ? `${chooseYear} он` : "Шагнал авсан он сонгох"}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Шагнал гардуулсан газар
      </Text>
      <FormText
        placeholder="Шагнал гардуулсан байгууллага"
        value={achievement.company}
        onChangeText={checkCompany}
        errorText="Шагнал гардуулсан байгууллага урт 2-20 тэмдэгтээс тогтоно."
        errorShow={error.company}
      />
      <TouchableOpacity
        onPress={sendPersonalDetail}
        style={{
          marginTop: 10,
          borderRadius: 10,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: "#FFB6C1",
        }}
      >
        <Text style={{ color: "black", textAlign: "center" }}> Хадгалах </Text>
      </TouchableOpacity>
      {/* Төрсөн огноо сонгох */}
      <YearModal
        setChooseYear={setChooseYear}
        setChooseYearModal={setChooseYearModal}
        chooseYearModal={chooseYearModal}
        checkYear={checkYear}
      />
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
