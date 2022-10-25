import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import EducationModal from "../../../components/Modals/EducationModal";
import ExperienceModal from "../../../components/Modals/ExperienceModal";
import GenderModal from "../../../components/Modals/GenderModal";
import SalaryModal from "../../../components/Modals/SalaryModal";
import TypeModal from "../../../components/Modals/TypeModal";
import { LinearGradient } from "expo-linear-gradient";
import SearchByOccupation from "../../../components/Modals/SearchByOccupation";
import SearchWorkByCateogry from "../../../components/Modals/SearchWorkByCateogry";
const CustomSearchModal = () => {
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
  const [refresh, setRefresh] = useState(false);
  // Цалин Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  // Цагийн төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);

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
          {/*  , , Цалин сонгох, Хүйс сонгох,  */}
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
          {/* Цагийн төрөл */}
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
              navigation.navigate("CustomSearchedModal", {
                salary: salary,
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
