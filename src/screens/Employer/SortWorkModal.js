import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";

import EducationModal from "../../components/Modals/EducationModal";
import ExperienceModal from "../../components/Modals/ExperienceModal";
import GenderModal from "../../components/Modals/GenderModal";

import SalaryModal from "../../components/Modals/SalaryModal";
import SearchWorkByCateogry from "../../components/Modals/SearchWorkByCateogry";
import SearchByOccupation from "../../components/Modals/SearchByOccupation";
import TypeModal from "../../components/Modals/TypeModal";
const SortWorkModal = () => {
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
  const [categoryId, setCategoryId] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [occupationId, setOccupationId] = useState("");
  const [refresh, setRefresh] = useState(false);
  // Цалин Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  // Цагийн төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);
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
    setOccupationId(id);
  };
  const checkSalary = (text) => {
    setModalVisible(!modalVisible);
  };
  const checkType = (text) => {
    setTypeModal(!typeModal);
  };
  return (
    <>
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <View
          style={{
            backgroundColor: colors.background,
            height: "100%",
            marginHorizontal: 10,
          }}
        >
          {/* 1.Мэргэжил */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setCategoryModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {occupationName ? `${occupationName}` : "Мэргэжил сонгох"}
            </Text>
          </TouchableOpacity>
          {/* 2.Боловсрол */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setEducationModal(true)}
          >
            <Text
              style={{
                textAlign: "center",
                color: colors.primaryText,
              }}
            >
              {education ? `${education}` : "Боловсрол сонгох"}
            </Text>
          </TouchableOpacity>
          {/* 3.Ажлын туршлага */}
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
          {/* 4.Цагийн төрөл */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setTypeModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {type ? `${type}` : "Цагийн төрөл"}
            </Text>
          </TouchableOpacity>
          {/* 5.Цалин */}
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
          {/* 6.Хүйс */}
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
              navigation.navigate("ResultWorkModal", {
                occupationId: occupationId,
                salary: salary,
                education: education,
                experience: experience,
                gender: gender,
                type: type,
              })
            }
            style={{
              backgroundColor: "#FFB6C1",
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
          >
            <Text style={{ textAlign: "center", color: "black" }}>Хайх</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 100 }} />
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

      {/* Мэргэжил сонгох */}
      <SearchWorkByCateogry
        setCategoryModal={setCategoryModal}
        categoryModal={categoryModal}
        setRefresh={setRefresh}
        setCategoryId={setCategoryId}
        setOccupationModal={setOccupationModal}
      />
      <SearchByOccupation
        setOccupationModal={setOccupationModal}
        occupationModal={occupationModal}
        setChoosedName={setOccupationName}
        refresh={refresh}
        setRefresh={setRefresh}
        setChoosedId={checkOccupation}
        categoryId={categoryId}
      />
      {/* Цалин  */}
      <SalaryModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setSalary={setSalary}
        checkSalary={checkSalary}
      />
      {/* Цагийн төрөл */}
      <TypeModal
        setTypeModal={setTypeModal}
        typeModal={typeModal}
        setType={setType}
        checkType={checkType}
      />
    </>
  );
};

export default SortWorkModal;

const styles = StyleSheet.create({});
