import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import FormText from "../../components/FormText";
import SalaryModal from "./AddWorkModals/SalaryModal";
import MyButton from "../../components/MyButton";
import GenderModal from "./AddWorkModals/GenderModal";
import ExperienceModal from "./AddWorkModals/ExperienceModal";
import EducationModal from "./AddWorkModals/EducationModal";
import OccupationModal from "./AddWorkModals/OccupationModal";
import TypeModal from "./AddWorkModals/TypeModal";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import SpecialModal from "./AddWorkModals/SpecialModal";

const EmployerAddWork = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [specialModal, setSpecialModal] = useState(false);
  const navigation = useNavigation();
  // Цалин Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  // Хүйс modal
  const [genderModal, setGenderModal] = useState(false);
  const [gender, setGender] = useState("");

  // Туршлага сонгох
  const [experienceModal, setExperienceModal] = useState(false);
  const [experience, setExperience] = useState("");
  // Боловсрол сонгох
  const [educationModal, setEducationModal] = useState(false);
  const [education, setEducation] = useState("");
  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  // Цагийн төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);

  const [addWork, setAddWork] = useState({
    occupation: "",
    education: "Сонгох",
    experience: "Сонгох",
    type: "Сонгох",
    salary: "Сонгох",
    location: "",
    gender: "Сонгох",
    do: "",
    skill: "",
    language: "",
    schedule: "",
    order: 0,
    special: 0,
    urgent: 0,
  });
  const [error, setError] = useState({
    do: false,
    skill: false,
    location: false,
    occupation: false,
    order: false,
    schedule: false,
    language: false,
  });
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=notification`)
      .then((res) => {
        setNotification(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkOccupation = (id) => {
    setOccupationModal(!occupationModal);
    setAddWork({
      ...addWork,
      occupation: id,
    });
  };
  const checkEducation = (text) => {
    setEducationModal(!educationModal);
    setAddWork({
      ...addWork,
      education: text,
    });
  };
  const checkExperience = (text) => {
    setExperienceModal(!experienceModal);
    setAddWork({
      ...addWork,
      experience: text,
    });
  };

  const checkType = (text) => {
    setTypeModal(!typeModal);
    setAddWork({
      ...addWork,
      type: text,
    });
  };
  const checkLocation = (text) => {
    setError({
      ...error,
      location: text.length < 5,
    });

    setAddWork({
      ...addWork,
      location: text,
    });
  };
  const checkGender = (text) => {
    setGenderModal(!genderModal);
    setAddWork({
      ...addWork,
      gender: text,
    });
  };
  const checkSkill = (text) => {
    setError({
      ...error,
      skill: text.length < 5,
    });

    setAddWork({
      ...addWork,
      skill: text,
    });
  };
  const checkLanguage = (text) => {
    setError({
      ...error,
      language: text.length < 5,
    });

    setAddWork({
      ...addWork,
      language: text,
    });
  };
  const checkDo = (text) => {
    setError({
      ...error,
      do: text.length < 5,
    });

    setAddWork({
      ...addWork,
      do: text,
    });
  };

  const checkSchedule = (text) => {
    setError({
      ...error,
      schedule: text.length < 5,
    });

    setAddWork({
      ...addWork,
      schedule: text,
    });
  };

  const checkSalary = (text) => {
    setModalVisible(!modalVisible);
    setAddWork({
      ...addWork,
      salary: text,
    });
  };

  if (!notification) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#141414" }}>
      <CompanyHeader isBack={true} notification={notification.notification} />
      <View style={{ backgroundColor: colors.background }}>
        <ScrollView
          style={{ marginHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Мэргэжил сонгох
          </Text>
          <MyButton
            text={
              occupationName === "" ? "Мэргэжил сонгох" : `${occupationName}`
            }
            onPress={checkOccupation}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Боловсрол сонгох
          </Text>
          <MyButton
            text={education === "" ? "Боловсрол сонгох" : `${education}`}
            onPress={checkEducation}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Ажлын туршлага сонгох
          </Text>
          <MyButton
            text={
              experience === "" ? "Ажлын туршлага сонгох" : `${experience} жил`
            }
            onPress={checkExperience}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Цагийн төрөл сонгох
          </Text>
          <MyButton
            text={type === "" ? "Цагийн төрөл сонгох" : `${type}`}
            onPress={checkType}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Цалин сонгох
          </Text>
          <MyButton
            text={salary === "" ? "Цалин сонгох" : `${salary}₮`}
            onPress={checkSalary}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хаяг байршил
          </Text>

          <FormText
            placeholder="Хаяг байршил"
            value={addWork.location}
            onChangeText={checkLocation}
            errorText="Хаяг байршил урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.location}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хүйс сонгох
          </Text>
          <MyButton
            text={gender === "" ? "Хүйс сонгох" : gender}
            onPress={checkGender}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хийгдэх ажил
          </Text>
          <FormText
            placeholder="Хийгдэх ажил "
            value={addWork.do}
            onChangeText={checkDo}
            errorText="Хийгдэх ажил  урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.do}
          />

          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Шаардагдах чадвар
          </Text>
          <FormText
            placeholder="Чадвар"
            value={addWork.skill}
            onChangeText={checkSkill}
            errorText="Чадвар урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.skill}
          />

          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Гадаад хэл
          </Text>
          <FormText
            placeholder="Гадаад хэл"
            value={addWork.language}
            onChangeText={checkLanguage}
            errorText="Гадаад хэл урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.language}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Ажиллах цагийн хуваарь
          </Text>
          <FormText
            placeholder="Ажиллах цагийн хуваарь"
            value={addWork.schedule}
            onChangeText={checkSchedule}
            errorText="Ажиллах цагийн хуваарь урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.schedule}
          />

          <View style={{ marginVertical: 5 }} />
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.border,
              marginTop: 10,
            }}
            onPress={() => setSpecialModal(true)}
          >
            <Text style={{ textAlign: "center", color: "black" }}>Нийтлэх</Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </View>
      {/* Modals */}
      <View style={{ backgroundColor: colors.background }}>
        {/* Мэргэжил сонгох */}
        <OccupationModal
          setOccupationModal={setOccupationModal}
          occupationModal={occupationModal}
          setOccupationName={setOccupationName}
          checkOccupation={checkOccupation}
        />
        {/* Боловсрол сонгох */}
        <EducationModal
          setEducation={setEducation}
          setEducationModal={setEducationModal}
          educationModal={educationModal}
          checkEducation={checkEducation}
        />
        {/* Туршлага  сонгох */}
        <ExperienceModal
          setExperience={setExperience}
          experienceModal={experienceModal}
          setExperienceModal={setExperienceModal}
          checkExperience={checkExperience}
        />
        {/* type сонгох */}
        <TypeModal
          setTypeModal={setTypeModal}
          typeModal={typeModal}
          setType={setType}
          checkType={checkType}
        />
        {/* Цалин  */}
        <SalaryModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setSalary={setSalary}
          checkSalary={checkSalary}
        />
        {/* Хүйс */}
        <GenderModal
          setGender={setGender}
          setGenderModal={setGenderModal}
          genderModal={genderModal}
          checkGender={checkGender}
        />
        <SpecialModal
          specialModal={specialModal}
          setSpecialModal={setSpecialModal}
          data={addWork}
          occupationName={occupationName}
        />
      </View>
    </SafeAreaView>
  );
};

export default EmployerAddWork;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: 220,
    margin: 20,
  },
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 5,
    padding: 7,
  },
});
