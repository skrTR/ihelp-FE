import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CourseSchoolModal from "./EditModal/CourseSchoolModal";
const CourseAddModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isEnabled, setIsEnabled] = useState(true);
  const [schoolModal, setSchoolModal] = useState(false);
  const [course, setCourse] = useState({
    field: "",
    school: null,
    schoolId: null,
    schoolPhoto: null,
    grade: "",
    isStudying: isEnabled,
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

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/course`, course)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
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

  const checkStart = (text) => {
    setError({
      ...error,
      start: text.length < 4,
    });

    setCourse({
      ...course,
      start: text,
    });
  };
  const checkEnd = (text) => {
    setError({
      ...error,
      end: text.length < 3,
    });

    setCourse({
      ...course,
      end: text,
    });
  };

  return (
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
            borderRadius: 20,
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
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Элссэн огноо
      </Text>
      <FormText
        value={course.start}
        onChangeText={checkStart}
        errorText="Элссэн огноо 4-10 тэмдэгтээс тогтоно."
        errorShow={error.start}
      />
      {/* surj bgaa eseh */}
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Суралцаж байгаа эсэх?
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Switch
          trackColor={{ false: "#FFB6C1", true: "#FFB6C1" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {isEnabled ? (
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
      {isEnabled && (
        <>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Төгссөн огноо
          </Text>
          <FormText
            placeholder="Төгссөн огноо"
            value={course.end && course.end.slice(0, 10)}
            onChangeText={checkEnd}
            errorText="Төгссөн огноо урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.end}
          />
        </>
      )}
      {/* golch dun */}
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Голч дүн
      </Text>
      <FormText
        placeholder="Голч дүн"
        value={course.grade}
        onChangeText={checkGrade}
        errorText="Голч дүн урт 3-20 тэмдэгтээс тогтоно."
        errorShow={error.grade}
      />
      <TouchableOpacity
        onPress={sendPersonalDetail}
        style={{
          marginTop: 20,
          borderRadius: 20,
        }}
      >
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{
            paddingVertical: 10,
            borderRadius: 20,
          }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <Text style={{ color: colors.primaryText, textAlign: "center" }}>
            {" "}
            Хадгалах{" "}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <CourseSchoolModal
        course={course}
        setCourse={setCourse}
        schoolModal={schoolModal}
        setSchoolModal={setSchoolModal}
      />
    </ScrollView>
  );
};

export default CourseAddModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
