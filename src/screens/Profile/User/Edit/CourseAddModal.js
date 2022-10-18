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
import CourseSchoolModal from "./EditModal/CourseSchoolModal";
import EducationModal from "../../../../components/Modals/EducationModal";
import YearModal from "../../../../components/Modals/YearModal";
const CourseAddModal = () => {
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
    field: "",
    school: null,
    education: "",
    schoolId: null,
    schoolPhoto: null,
    grade: "",
    education: "",
    isStudying: false,
    start: "",
    end: "",
  });
  const [error, setError] = useState({
    field: false,
    grade: false,
    activity: false,
    start: false,
    end: false,
  });

  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/course`, course)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const checkEducation = (text) => {
    setEducationModal(!educationModal);
    setCourse({
      ...course,
      education: text,
    });
  };
  const checkField = (text) => {
    setError({
      ...error,
      field: text.length < 1,
    });

    setCourse({
      ...course,
      field: text,
    });
  };
  const checkGrade = (text) => {
    setError({
      ...error,
      grade: text.length < 1,
    });

    setCourse({
      ...course,
      grade: text,
    });
  };

  const checkStudy = () => {
    setCourse({
      ...course,
      isStudying: !course.isStudying,
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ marginHorizontal: 20, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
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
        {/* Боловсролын зэрэг */}
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
              {education ? education : "Боловсролын зэрэг сонгох"}
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
          errorText="Мэргэжил 1-20 тэмдэгтээс тогтоно"
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
              {chooseYear ? `${chooseYear} он` : "Элссэн огноо сонгох"}
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
            {/* 
              Төгссөн огноо
          
             */}
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
                    : "Төгссөн огноо сонгох"}
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
          errorText="Голч дүн 1-5 тэмдэгтээс тогтоно"
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
        {/* Сургуулын модал цонх */}
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

export default CourseAddModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
