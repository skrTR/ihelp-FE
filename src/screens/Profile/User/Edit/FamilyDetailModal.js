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
import MyButton from "../../../../components/MyButton";
import ProvinceModal from "../../../../components/Modals/ProvinceModal";
import YearModal from "../../../../components/Modals/YearModal";

const FamilyDetailModal = ({ route }) => {
  const { data } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  // Хаяг байршил сонгох
  const [province, setProvince] = useState("");
  const [provinceModal, setProvinceModal] = useState(false);
  // Төрсөн огноо сонгох модал
  const [chooseYearModal, setChooseYearModal] = useState(false);
  const [chooseYear, setChooseYear] = useState("");
  const sendPersonalDetail = () => {
    axios
      .put(`${api}/api/v1/questionnaires/${data._id}/family`, family)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const deleteFamily = () => {
    axios
      .delete(`${api}/api/v1/questionnaires/${data._id}/family`)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const [family, setFamily] = useState({
    birthPlace: data.birthPlace,
    birthYear: data.birthYear,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    profession: data.profession,
    who: data.who,
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
    setProvinceModal(!provinceModal);
    setFamily({
      ...family,
      birthPlace: text,
    });
  };
  const checkBirthYear = (text) => {
    setChooseYearModal(!chooseYearModal);
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
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
        <TouchableOpacity onPress={() => setProvinceModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Оршин суудаг хаяг
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {province ? province : family.birthPlace}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setChooseYearModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Төрсөн жил
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {chooseYear ? `${chooseYear} он` : family.birthYear}
            </Text>
          </View>
        </TouchableOpacity>

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
        <TouchableOpacity
          onPress={deleteFamily}
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
        <MyButton
          onPress={() => navigation.navigate("FamilyAddModal")}
          text="Гэр бүлийн мэдээлэл нэмэх"
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: 10,
          }}
        />
        <View style={{ marginBottom: 350 }} />
        <ProvinceModal
          provinceModal={provinceModal}
          setProvinceModal={setProvinceModal}
          setProvince={setProvince}
          checkProvince={checkBirthPlace}
        />
        {/* Төрсөн огноо сонгох */}
        <YearModal
          setChooseYear={setChooseYear}
          setChooseYearModal={setChooseYearModal}
          chooseYearModal={chooseYearModal}
          checkYear={checkBirthYear}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FamilyDetailModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
