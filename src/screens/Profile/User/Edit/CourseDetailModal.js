import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyButton from "../../../../components/MyButton";
import CourseSchoolModal from "./EditModal/CourseSchoolModal";
import moment from "moment";
import EducationModal from "../../../../components/Modals/EducationModal";
import YearModal from "../../../../components/Modals/YearModal";
const CourseDetailModal = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [schoolModal, setSchoolModal] = useState(false);
  // Боловсрол сонгох
  const [educationModal, setEducationModal] = useState(false);
  const [education, setEducation] = useState("");
  // Элссэн огноо сонгох модал
  const [chooseYearModal, setChooseYearModal] = useState(false);
  const [chooseYear, setChooseYear] = useState("");
  // Төгссөн огноо сонгох модал
  const [chooseEndYearModal, setChooseEndYearModal] = useState(false);
  const [chooseEndYear, setChooseEndYear] = useState("");
  const [course, setCourse] = useState({
    description: data.description,
    field: data.field,
    school: data.school,
    grade: data.grade,
    isStudying: data.isStudying,
    activity: data.activity,
    start: data.start,
    end: data.end,
    school: data.school,
    schoolPhoto: data.schoolPhoto,
  });
  const [error, setError] = useState({
    description: false,
    field: false,
    school: false,
    grade: false,
    activity: false,
    start: false,
    end: false,
  });
  const sendPersonalDetail = () => {
    axios
      .put(`${api}/api/v1/questionnaires/${data._id}/course`, course)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const deleteCourse = () => {
    axios
      .delete(`${api}/api/v1/questionnaires/${data._id}/course`)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const checkField = (text) => {
    setError({
      ...error,
      field: text.length < 5,
    });

    setCourse({
      ...course,
      field: text,
    });
  };
  const checkGrade = (text) => {
    setError({
      ...error,
      grade: text.length < 5,
    });

    setCourse({
      ...course,
      grade: text,
    });
  };
  const checkStart = (text) => {
    setChooseYearModal(!chooseYearModal);
    setCourse({
      ...course,
      start: text,
    });
  };
  const checkEnd = (text) => {
    setChooseEndYearModal(!chooseEndYearModal);
    setCourse({
      ...course,
      end: text,
    });
  };
  const checkStudy = () => {
    setCourse({
      ...course,
      isStudying: !course.isStudying,
    });
  };
  const checkEducation = (text) => {
    setEducationModal(!educationModal);
    setCourse({
      ...course,
      education: text,
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
        {/* Surguuli */}
        <TouchableOpacity
          onPress={() => setSchoolModal(true)}
          style={{ marginTop: 10 }}
        >
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Сургууль сонгох
          </Text>
          <View
            style={{
              padding: 2,
              marginVertical: 5,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
              backgroundColor: colors.secondaryText,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {course.school && (
                <Image
                  source={{ uri: `${api}/upload/${course.schoolPhoto}` }}
                  style={{
                    width: 23,
                    height: 23,
                    marginRight: 10,
                    marginLeft: 5,
                    borderRadius: 10,
                  }}
                />
              )}
              {course.school ? (
                <Text style={{ color: "black" }}>{course.school}</Text>
              ) : (
                <Text
                  style={{
                    color: colors.secondaryText,
                    marginLeft: 10,
                  }}
                >
                  Жишээ нь: Монгол улсын их сургууль
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                setCourse({
                  ...course,
                  school: null,
                  schoolId: null,
                  schoolPhoto: null,
                });
              }}
              style={{ marginRight: 10 }}
            >
              {course.school && (
                <Ionicons name="backspace-outline" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEducationModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Боловсролын зэрэг
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {education ? education : course.education}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Mergejil */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Мэргэжил
        </Text>
        <FormText
          value={course.field}
          onChangeText={checkField}
          errorText="Мэргэжил 1-20 тэмдэгтээс тогтоно."
          errorShow={error.field}
        />
        {/* elssen ognoo */}
        <TouchableOpacity onPress={() => setChooseYearModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Элссэн огноо
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {chooseYear
                ? `${chooseYear} он`
                : moment(course.start).format("YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
        {/* surj bgaa eseh */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Суралцаж байгаа эсэх?
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Switch
            trackColor={{ false: "#FFB6C1", true: "#FFB6C1" }}
            thumbColor={course.isStudying ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={checkStudy}
            value={course.isStudying}
          />
          {!course.isStudying ? (
            <Text
              style={[
                styles.textTitle,
                { color: colors.primaryText, textAlign: "center" },
              ]}
            >
              {" "}
              Tөгссөн
            </Text>
          ) : (
            <Text
              style={[
                styles.textTitle,
                { color: colors.primaryText, textAlign: "center" },
              ]}
            >
              {" "}
              Суралцаж байгаа
            </Text>
          )}
        </View>
        {!course.isStudying && (
          <>
            <TouchableOpacity onPress={() => setChooseEndYearModal(true)}>
              <Text style={[styles.textTitle, { color: colors.primaryText }]}>
                Төгссөн огноо
              </Text>
              <View
                style={{
                  backgroundColor: colors.secondaryText,
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {chooseEndYear
                    ? `${chooseEndYear} он`
                    : moment(course.end).format("YYYY")}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        {/* голч дүн */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Голч дүн
        </Text>
        <FormText
          placeholder="Голч дүн"
          value={course.grade}
          onChangeText={checkGrade}
          errorText="Голч дүн урт 3-20 тэмдэгтээс тогтоно."
          errorShow={error.grade}
          keyboardType="numeric"
        />
        {/* Илгээх товч */}
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
        {/* Устгах товч */}
        <TouchableOpacity
          onPress={deleteCourse}
          style={{
            marginTop: 10,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            {" "}
            Устгах{" "}
          </Text>
        </TouchableOpacity>
        {/* Боловсрол нэмэх */}
        <MyButton
          onPress={() => navigation.navigate("CourseAddModal")}
          text="Боловсрол нэмэх"
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: 10,
          }}
        />
        {/* Сургуулийн модал цонх */}
        <CourseSchoolModal
          course={course}
          setCourse={setCourse}
          schoolModal={schoolModal}
          setSchoolModal={setSchoolModal}
        />
        {/* Боловсрол сонгох */}
        <EducationModal
          setEducation={setEducation}
          setEducationModal={setEducationModal}
          educationModal={educationModal}
          checkEducation={checkEducation}
        />
        {/* Элссэн огноо сонгох */}
        <YearModal
          setChooseYear={setChooseYear}
          setChooseYearModal={setChooseYearModal}
          chooseYearModal={chooseYearModal}
          checkYear={checkStart}
        />
        {/* Төгссөн огноо сонгох */}
        <YearModal
          setChooseYear={setChooseEndYear}
          setChooseYearModal={setChooseEndYearModal}
          chooseYearModal={chooseEndYearModal}
          checkYear={checkEnd}
        />
        <View style={{ marginBottom: 250 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CourseDetailModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
  },
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
