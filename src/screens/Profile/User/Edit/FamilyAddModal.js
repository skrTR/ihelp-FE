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
import ProvinceModal from "../../../../components/Modals/ProvinceModal";
import YearModal from "../../../../components/Modals/YearModal";
import FamilyModal from "../../../../components/Modals/FamilyModal";
const FamilyAddModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  // Хаяг байршил сонгох
  const [province, setProvince] = useState("");
  const [provinceModal, setProvinceModal] = useState(false);
  // Төрсөн огноо сонгох модал
  const [chooseYearModal, setChooseYearModal] = useState(false);
  const [chooseYear, setChooseYear] = useState("");
  // Hen boloh
  const [familyModal, setFamilyModal] = useState(false);
  const [familyName, setFamilyName] = useState("");
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
  const checkWho = (text) => {
    setFamilyModal(!familyModal);
    setFamily({
      ...family,
      who: text,
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
        <TouchableOpacity onPress={() => setFamilyModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Таны хэн болох
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {familyName ? familyName : "Таны хэн болох"}
            </Text>
          </View>
        </TouchableOpacity>
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
            <Text style={{ fontSize: 16 }}>{province && province}</Text>
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
              {chooseYear ? `${chooseYear} он` : "Төрсөн огноо"}
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
        <View style={{ marginBottom: 250 }} />
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
        {/* Төрсөн огноо сонгох */}
        <FamilyModal
          setFamilyModal={setFamilyModal}
          familyModal={familyModal}
          setFamilyName={setFamilyName}
          checkFamily={checkWho}
        />
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
