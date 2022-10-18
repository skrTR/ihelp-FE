import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const SkillDetailModal = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/${state.userId}`, { skill: skills })
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };

  const [skills, setSkills] = useState({
    advantage1: data.advantage1,
    advantage2: data.advantage2,
    advantage3: data.advantage3,
    advantage4: data.advantage4,
    disAdvantage1: data.disAdvantage1,
    disAdvantage2: data.disAdvantage2,
    disAdvantage3: data.disAdvantage3,
    disAdvantage4: data.disAdvantage4,
  });
  const [error, setError] = useState({
    advantage1: false,
    advantage2: false,
    advantage3: false,
    advantage4: false,
    disAdvantage1: false,
    disAdvantage2: false,
    disAdvantage3: false,
    disAdvantage4: false,
  });

  const checkAdvantage1 = (text) => {
    setError({
      ...error,
      advantage1: text.length < 2,
    });
    setSkills({
      ...skills,
      advantage1: text,
    });
  };
  const checkAdvantage2 = (text) => {
    setError({
      ...error,
      advantage2: text.length < 2,
    });
    setSkills({
      ...skills,
      advantage2: text,
    });
  };
  const checkAdvantage3 = (text) => {
    setError({
      ...error,
      advantage3: text.length < 2,
    });
    setSkills({
      ...skills,
      advantage3: text,
    });
  };
  const checkAdvantage4 = (text) => {
    setError({
      ...error,
      advantage4: text.length < 2,
    });
    setSkills({
      ...skills,
      advantage4: text,
    });
  };
  const checkDisAdvantage1 = (text) => {
    setError({
      ...error,
      disAdvantage1: text.length < 2,
    });
    setSkills({
      ...skills,
      disAdvantage1: text,
    });
  };
  const checkDisAdvantage2 = (text) => {
    setError({
      ...error,
      disAdvantage2: text.length < 2,
    });
    setSkills({
      ...skills,
      disAdvantage2: text,
    });
  };
  const checkDisAdvantage3 = (text) => {
    setError({
      ...error,
      disAdvantage3: text.length < 2,
    });
    setSkills({
      ...skills,
      disAdvantage3: text,
    });
  };
  const checkDisAdvantage4 = (text) => {
    setError({
      ...error,
      disAdvantage4: text.length < 2,
    });
    setSkills({
      ...skills,
      disAdvantage4: text,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 10 }} />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Чадвар 1
        </Text>
        <FormText
          value={skills.advantage1}
          onChangeText={checkAdvantage1}
          errorText="Чадвар 2-20 тэмдэгтээс тогтоно."
          errorShow={error.advantage1}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Чадвар 2
        </Text>
        <FormText
          value={skills.advantage2}
          onChangeText={checkAdvantage2}
          errorText="Чадвар 2-20 тэмдэгтээс тогтоно."
          errorShow={error.advantage2}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Чадвар 3
        </Text>
        <FormText
          value={skills.advantage3}
          onChangeText={checkAdvantage3}
          errorText="Чадвар 3 2-20 тэмдэгтээс тогтоно."
          errorShow={error.advantage3}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Чадвар 4
        </Text>
        <FormText
          value={skills.advantage4}
          onChangeText={checkAdvantage4}
          errorText="Чадвар 4 2-20 тэмдэгтээс тогтоно."
          errorShow={error.advantage4}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Сул тал 1
        </Text>
        <FormText
          value={skills.disAdvantage1}
          onChangeText={checkDisAdvantage1}
          errorText="Сул тал 1 2-20 тэмдэгтээс тогтоно."
          errorShow={error.disAdvantage1}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Сул тал 2
        </Text>
        <FormText
          value={skills.disAdvantage2}
          onChangeText={checkDisAdvantage2}
          errorText="Сул тал 2 2-20 тэмдэгтээс тогтоно."
          errorShow={error.disAdvantage2}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Сул тал 3
        </Text>
        <FormText
          value={skills.disAdvantage3}
          onChangeText={checkDisAdvantage3}
          errorText="Сул тал 3 2-20 тэмдэгтээс тогтоно."
          errorShow={error.disAdvantage3}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Сул тал 4
        </Text>
        <FormText
          value={skills.disAdvantage4}
          onChangeText={checkDisAdvantage4}
          errorText="Сул тал 4 2-20 тэмдэгтээс тогтоно."
          errorShow={error.disAdvantage4}
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
          <Text style={{ color: "black", textAlign: "center" }}>
            {" "}
            Хадгалах{" "}
          </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 250 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SkillDetailModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
