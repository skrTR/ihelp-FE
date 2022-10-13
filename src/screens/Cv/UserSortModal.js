import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import EducationModal from "../Employer/AddWorkModals/EducationModal";
import ExperienceModal from "../Employer/AddWorkModals/ExperienceModal";
import GenderModal from "../Employer/AddWorkModals/GenderModal";
import OccupationModal from "../Employer/AddWorkModals/OccupationModal";
import SalaryModal from "../Employer/AddWorkModals/SalaryModal";
const UserSortModal = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Боловсрол сонгох
  const [educationModal, setEducationModal] = useState(false);
  const [education, setEducation] = useState("");
  // Туршлага сонгох
  const [experienceModal, setExperienceModal] = useState(false);
  const [experience, setExperience] = useState("");
  // Хүйс modal
  const [genderModal, setGenderModal] = useState(false);
  const [gender, setGender] = useState("");

  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  // Цалин Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [salary, setSalary] = useState("");

  const checkEducation = (text) => {
    setEducationModal(!educationModal);
  };
  const checkExperience = (text) => {
    setExperienceModal(!experienceModal);
  };
  const checkGender = (text) => {
    setGenderModal(!genderModal);
  };

  const checkOccupation = (id) => {
    setOccupationModal(!occupationModal);
  };
  const checkSalary = (text) => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.background,
            height: "100%",
            marginHorizontal: 10,
          }}
        >
          {/* Мэргэжил */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setOccupationModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {occupationName ? `${occupationName}` : "Мэргэжил сонгох"}
            </Text>
          </TouchableOpacity>
          {/* Боловсрол */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
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
              {education ? `${education}` : "Боловсрол сонгох"}
            </Text>
          </TouchableOpacity>
          {/* Ажлын туршлага */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setExperienceModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {experience ? `${experience} жил` : "Ажлын туршлага"}
            </Text>
          </TouchableOpacity>

          {/* Цалин */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {salary ? `${salary}` : "Цалин"}
            </Text>
          </TouchableOpacity>
          {/* Хүйс */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setGenderModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {gender ? `${gender}` : "Хүйс"}
            </Text>
          </TouchableOpacity>
          {/* Хайх */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SortResultModal", {
                salary: salary,
                education: education,
                experience: experience,
                gender: gender,
              })
            }
          >
            <LinearGradient
              colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                borderRadius: 10,
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
    </>
  );
};

export default UserSortModal;

const styles = StyleSheet.create({});
