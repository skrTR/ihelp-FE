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
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import LanguageModal from "./EditModal/LanguageModal";
import MyButton from "../../../../components/MyButton";
const LanguageDetailModal = (props) => {
  const { data } = props.route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  // Цагийн төрөл сонгох
  const [langText, setLangText] = useState("");
  const [languageModal, setLanguageModal] = useState(false);
  const [language, setLanguage] = useState({
    country: data.country,
    level: data.level,
  });
  const [error, setError] = useState({
    country: false,
    level: false,
  });
  const sendPersonalDetail = () => {
    axios
      .put(`${api}/api/v1/questionnaires/${data._id}/language`, language)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const deleteExperience = () => {
    axios
      .delete(`${api}/api/v1/questionnaires/${data._id}/language`)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };

  const checkLanguage = (text) => {
    setLanguageModal(!languageModal);
    setLanguage({
      ...language,
      level: text,
    });
  };
  const checkCountry = (text) => {
    setError({
      ...error,
      country: text.length < 1,
    });

    setLanguage({
      ...language,
      country: text,
    });
  };

  return (
    <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
      {/* Mergejil */}
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>Улс</Text>
      <FormText
        value={language.country}
        onChangeText={checkCountry}
        errorText="Улс 1-20 тэмдэгтээс тогтоно."
        errorShow={error.country}
      />
      <TouchableOpacity onPress={checkLanguage}>
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Хэлний чадвар
        </Text>
        <View
          style={{
            backgroundColor: colors.secondaryText,
            padding: 12,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {language.level && language.level}
          </Text>
        </View>
      </TouchableOpacity>
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
      <TouchableOpacity
        onPress={deleteExperience}
        style={{
          marginTop: 20,
          borderRadius: 10,
          paddingVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.primaryText, textAlign: "center" }}>
          {" "}
          Устгах{" "}
        </Text>
      </TouchableOpacity>

      <LanguageModal
        setLangText={setLangText}
        languageModal={languageModal}
        setLanguageModal={setLanguageModal}
        checkLangauge={checkLanguage}
      />
    </ScrollView>
  );
};

export default LanguageDetailModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
