import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AgeModal from "../../Employer/AddWorkModals/AgeModal";
import EducationModal from "../../Employer/AddWorkModals/EducationModal";
import ExperienceModal from "../../Employer/AddWorkModals/ExperienceModal";
import GenderModal from "../../Employer/AddWorkModals/GenderModal";
import LevelModal from "../../Employer/AddWorkModals/LevelModal";
import OccupationModal from "../../Employer/AddWorkModals/OccupationModal";
import SalaryModal from "../../Employer/AddWorkModals/SalaryModal";
import TypeModal from "../../Employer/AddWorkModals/TypeModal";
import { LinearGradient } from "expo-linear-gradient";
const CustomSearchModal = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  // нас сонгох модал
  const [ageModal, setAgeModal] = useState(false);
  const [age, setAge] = useState("");
  // Боловсрол сонгох
  const [educationModal, setEducationModal] = useState(false);
  const [education, setEducation] = useState("");
  // Туршлага сонгох
  const [experienceModal, setExperienceModal] = useState(false);
  const [experience, setExperience] = useState("");
  // Хүйс modal
  const [genderModal, setGenderModal] = useState(false);
  const [gender, setGender] = useState("");
  // Level сонгох
  const [level, setLevel] = useState("");
  const [levelModal, setLevelModal] = useState(false);
  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  // Цалин Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  // Цагын төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);
  const checkAge = (text) => {
    setAgeModal(!ageModal);
    // setAddWork({
    //   ...addWork,
    //   age: text,
    // });
  };
  const checkEducation = (text) => {
    setEducationModal(!educationModal);
    // setAddWork({
    //   ...addWork,
    //   education: text,
    // });
  };
  const checkExperience = (text) => {
    setExperienceModal(!experienceModal);
    // setAddWork({
    //   ...addWork,
    //   experience: text,
    // });
  };
  const checkGender = (text) => {
    setGenderModal(!genderModal);
    // setAddWork({
    //   ...addWork,
    //   gender: text,
    // });
  };
  const checkLevel = (text) => {
    setLevelModal(!levelModal);
    // setAddWork({
    //   ...addWork,
    //   level: text,
    // });
  };
  const checkOccupation = (id) => {
    setOccupationModal(!occupationModal);
    // setAddWork({
    //   ...addWork,
    //   occupation: id,
    // });
  };
  const checkSalary = (text) => {
    setModalVisible(!modalVisible);
    // setAddWork({
    //   ...addWork,
    //   salary: text,
    // });
  };
  const checkType = (text) => {
    setTypeModal(!typeModal);
    // setAddWork({
    //   ...addWork,
    //   type: text,
    // });
  };
  return (
    <>
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <View style={{ backgroundColor: colors.background, height: "100%" }}>
          {/* Нас */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setAgeModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {age ? `${age} нас` : "Hас"}
            </Text>
          </TouchableOpacity>
          {/* Боловсрол */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
              backgroundColor: education && "#FFB6C1",
            }}
            onPress={() => setEducationModal(true)}
          >
            <Text
              style={{
                textAlign: "center",
                color: !education ? colors.primaryText : "black",
              }}
            >
              {education ? `${education}` : "Боловсрол"}
            </Text>
          </TouchableOpacity>
          {/* Туршлага жилээр */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setExperienceModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {experience ? `${experience} жил` : "Туршлага"}
            </Text>
          </TouchableOpacity>
          {/* Хүйс */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setGenderModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {gender ? `${gender}` : "Хүйс"}
            </Text>
          </TouchableOpacity>
          {/* Level */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setLevelModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {level ? `${level}` : "Албан тушаал"}
            </Text>
          </TouchableOpacity>
          {/* Цалин */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {salary ? `${salary}` : "Цалин"}
            </Text>
          </TouchableOpacity>
          {/* Mergejil */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setOccupationModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {occupationName ? `${occupationName}` : "Мэргэжил"}
            </Text>
          </TouchableOpacity>
          {/* Цагын төрөл */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setTypeModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {type ? `${type}` : "Цагийн төрөл"}
            </Text>
          </TouchableOpacity>
          {/* Хайх */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CustomSearchedModal", {
                salary: salary,
                age: age,
                level: level,
                education: education,
                experience: experience,
                gender: gender,
                type: type,
              })
            }
          >
            <LinearGradient
              colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                borderRadius: 18,
                padding: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                Хайх
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {/* Nas songoh */}
      <AgeModal
        setAge={setAge}
        ageModal={ageModal}
        setAgeModal={setAgeModal}
        checkAge={checkAge}
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
      {/* Хүйс */}
      <GenderModal
        setGender={setGender}
        setGenderModal={setGenderModal}
        genderModal={genderModal}
        checkGender={checkGender}
      />
      {/* Level сонгох */}
      <LevelModal
        setLevelModal={setLevelModal}
        levelModal={levelModal}
        setLevel={setLevel}
        checkLevel={checkLevel}
      />
      {/* Mergejil */}
      <OccupationModal
        setOccupationModal={setOccupationModal}
        occupationModal={occupationModal}
        setOccupationName={setOccupationName}
        checkOccupation={checkOccupation}
      />
      {/* Цалин  */}
      <SalaryModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setSalary={setSalary}
        checkSalary={checkSalary}
      />
      {/* type сонгох */}
      <TypeModal
        setTypeModal={setTypeModal}
        typeModal={typeModal}
        setType={setType}
        checkType={checkType}
      />
    </>
  );
};

export default CustomSearchModal;

const styles = StyleSheet.create({});
