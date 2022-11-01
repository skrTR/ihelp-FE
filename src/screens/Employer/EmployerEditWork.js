import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import FormText from "../../components/FormText";
import MyButton from "../../components/MyButton";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
// Modals
import SearchByOccupation from "../../components/Modals/SearchByOccupation";
import SearchWorkByCateogry from "../../components/Modals/SearchWorkByCateogry";
import EducationModal from "../../components/Modals/EducationModal";
import ExperienceModal from "../../components/Modals/ExperienceModal";
import TypeModal from "../../components/Modals/TypeModal";
import SalaryModal from "../../components/Modals/SalaryModal";
import GenderModal from "../../components/Modals/GenderModal";

const EmployerEditWork = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
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
  const [categoryId, setCategoryId] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // Цагийн төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);
  const insents = useSafeAreaInsets();
  const [addWork, setAddWork] = useState({
    occupation: data.occupation,
    occupationName: data.occupationName,
    education: data.education,
    experience: data.experience,
    type: data.type,
    salary: data.salary,
    location: data.location,
    gender: data.gender,
    do: data.do,
    skill: data.skill,
    language: data.language,
    schedule: data.schedule,
  });
  const editWork = () => {
    axios
      .put(`${api}/api/v1/jobs/${data._id}`, addWork)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    setRefresh(false);
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=notification`)
      .then((res) => {
        setNotification(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const addNext = () => {
    if (addWork.occupation.length < 1) {
      return alert("Та мэргэжил заавал сонгоно уу");
    }
    if (addWork.education === "Сонгох") {
      return alert("Та боловсрол заавал сонгоно уу");
    }
    if (addWork.experience === "Сонгох") {
      return alert("Та ажлын туршлага заавал сонгоно уу");
    }
    if (addWork.education === "Сонгох") {
      return alert("Та цагийн төрөл заавал сонгоно уу");
    }
    if (addWork.salary === "Сонгох") {
      return alert("Та цалин заавал сонгоно уу");
    }
    if (addWork.gender === "Сонгох") {
      return alert("Та хүйс заавал сонгоно уу");
    }
    editWork();
  };
  const deleteWork = () => {
    Alert.alert(
      "Анхаар",
      "Та тийм гэж дарснаар таны зар бүүр устахыг анхаарна уу",
      [
        {
          text: "Үгүй",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            axios
              .delete(`${api}/api/v1/jobs/${data._id}`)
              .then((res) => {
                navigation.navigate("EmployerStack", {
                  screen: "EmployerScreen",
                });
                alert("Амжилтай устлаа");
              })
              .catch((err) => {
                Alert.alert(err.response.data.error.message);
              });
          },
        },
      ]
    );
  };
  const checkOccupation = (id, name) => {
    setAddWork({
      ...addWork,
      occupation: id,
    });
    setAddWork({
      ...addWork,
      occupationName: name,
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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: insents.top,
        backgroundColor: colors.header,
      }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      behavior={"padding"}
    >
      <View style={{}}>
        <CompanyHeader isBack={true} notification={notification.notification} />
        {/* Агуулга */}
        <View style={{ backgroundColor: colors.background }}>
          <ScrollView
            style={{ marginHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Мэргэжил сонгох модал = occupation */}
            <>
              <Text style={[styles.textTitle, { color: colors.primaryText }]}>
                Мэргэжил сонгох
              </Text>
              <MyButton
                text={
                  occupationName === ""
                    ? data.occupationName
                    : `${occupationName}`
                }
                onPress={() => setCategoryModal(true)}
              />
            </>
            {/* Боловсрол сонгох модал = education */}
            <>
              <Text style={[styles.textTitle, { color: colors.primaryText }]}>
                Боловсрол сонгох
              </Text>
              <MyButton
                text={education === "" ? data.education : `${education}`}
                onPress={checkEducation}
              />
            </>
            {/* Ажлын туршлага = experience */}
            <>
              <Text style={[styles.textTitle, { color: colors.primaryText }]}>
                Ажлын туршлага сонгох
              </Text>
              <MyButton
                text={!experience ? data.experience : `${experience} жил`}
                onPress={checkExperience}
              />
            </>
            {/* Цагийн төрөл сонгох = type */}
            <>
              <Text style={[styles.textTitle, { color: colors.primaryText }]}>
                Цагийн төрөл сонгох
              </Text>
              <MyButton
                text={type === "" ? data.type : `${type}`}
                onPress={checkType}
              />
            </>
            {/* Цалин сонгох = salary */}
            <>
              <Text style={[styles.textTitle, { color: colors.primaryText }]}>
                Цалин сонгох
              </Text>
              <MyButton
                text={salary === "" ? data.salary : `${salary}₮`}
                onPress={checkSalary}
              />
            </>
            {/* Хаяг байршил бичэх =location */}
            <>
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
            </>
            {/* Хүйс сонгох = gender */}
            <>
              <Text style={[styles.textTitle, { color: colors.primaryText }]}>
                Хүйс сонгох
              </Text>
              <MyButton
                text={gender === "" ? data.gender : gender}
                onPress={checkGender}
              />
            </>
            {/* Хийгдэх ажил бичэх = do */}
            <>
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
            </>
            {/* Шаардагдах чадвар бичэх = skill */}
            <>
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
            </>
            {/* Гадаад хэл бичэх = language */}
            <>
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
            </>
            {/* Ажиллах цагийн хуваарь бичэх = schedule */}
            <>
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
            </>
            {/* Үргэлжлүүлэх товч*/}
            <>
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
                onPress={addNext}
              >
                <Text style={{ textAlign: "center", color: "black" }}>
                  Үргэлжлүүлэх
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.background,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.border,
                  marginTop: 10,
                }}
                onPress={deleteWork}
              >
                <Text
                  style={{ textAlign: "center", color: colors.primaryText }}
                >
                  Устгах
                </Text>
              </TouchableOpacity>
              <View style={{ marginBottom: 120 }} />
            </>
          </ScrollView>
        </View>
        {/* Модалууд */}
        <View style={{ backgroundColor: colors.background }}>
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
          {/* Цагийн төрөл сонгох */}
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmployerEditWork;

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
