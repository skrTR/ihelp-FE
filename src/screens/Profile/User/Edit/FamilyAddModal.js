import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const FamilyAddModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/family`, family)
      .then((res) => navigation.goBack())
      .catch((err) => alert(err));
  };
  const [family, setFamily] = useState({
    birthPlace: "",
    birthYear: "",
    firstName: "",
    lastName: "",
    phone: "",
    profession: "",
    who: "",
  });

  const [error, setError] = useState({
    birthPlace: false,
    birthYear: false,
    firstName: false,
    lastName: false,
    phone: false,
    profession: false,
    who: false,
  });
  const checkBirthPlace = (text) => {
    setError({
      ...error,
      birthPlace: text.length < 2,
    });

    setFamily({
      ...family,
      birthPlace: text,
    });
  };
  const checkBirthYear = (text) => {
    setError({
      ...error,
      birthYear: text.length < 2,
    });

    setFamily({
      ...family,
      birthYear: text,
    });
  };
  const checkFirstName = (text) => {
    setError({
      ...error,
      firstName: text.length < 5,
    });

    setFamily({
      ...family,
      firstName: text,
    });
  };
  const checkLastName = (text) => {
    setError({
      ...error,
      lastName: text.length < 2,
    });

    setFamily({
      ...family,
      lastName: text,
    });
  };
  const checkPhone = (text) => {
    setError({
      ...error,
      phone: text.length < 5,
    });

    setFamily({
      ...family,
      phone: text,
    });
  };
  const checkProfession = (text) => {
    setError({
      ...error,
      profession: text.length < 2,
    });

    setFamily({
      ...family,
      profession: text,
    });
  };
  const checkWho = (text) => {
    setError({
      ...error,
      who: text.length < 2,
    });

    setFamily({
      ...family,
      who: text,
    });
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.header,
      }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 10 }} />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Таны хэн болох
        </Text>
        <FormText
          value={family.who}
          onChangeText={checkWho}
          errorText="Таны хэн болох 2-20 тэмдэгтээс тогтоно."
          errorShow={error.who}
        />

        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Овог
        </Text>
        <FormText
          value={family.lastName}
          onChangeText={checkLastName}
          errorText="Овог 2-20 тэмдэгтээс тогтоно."
          errorShow={error.lastName}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Нэр
        </Text>
        <FormText
          value={family.firstName}
          onChangeText={checkFirstName}
          errorText="Нэр  3-20 тэмдэгтээс тогтоно."
          errorShow={error.firstName}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Оршин суудаг хаяг
        </Text>
        <FormText
          value={family.birthPlace}
          onChangeText={checkBirthPlace}
          errorText="Оршин суудаг хаяг  4-20 тэмдэгтээс тогтоно."
          errorShow={error.birthPlace}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Төрсөн жил
        </Text>
        <FormText
          value={family.birthYear.toString()}
          onChangeText={checkBirthYear}
          errorText="Төрсөн жил 3-20 тэмдэгтээс тогтоно."
          errorShow={error.birthYear}
          keyboardType="numeric"
        />

        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Холбоо барих дугаар
        </Text>
        <FormText
          value={family.phone.toString()}
          onChangeText={checkPhone}
          errorText=" Холбоо барих дугаар 3-20 тэмдэгтээс тогтоно."
          errorShow={error.phone}
          keyboardType="numeric"
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Мэргэжил
        </Text>
        <FormText
          value={family.profession}
          onChangeText={checkProfession}
          errorText="Мэргэжил 3-20 тэмдэгтээс тогтоно."
          errorShow={error.profession}
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
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FamilyAddModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
