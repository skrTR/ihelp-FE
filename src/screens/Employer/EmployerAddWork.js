import { StyleSheet, Text, View } from "react-native";
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
import AgeModal from "./AddWorkModals/AgeModal";
import ExperienceModal from "./AddWorkModals/ExperienceModal";
import EducationModal from "./AddWorkModals/EducationModal";
import OccupationModal from "./AddWorkModals/OccupationModal";
import LevelModal from "./AddWorkModals/LevelModal";
import TypeModal from "./AddWorkModals/TypeModal";
import UserContext from "../../context/UserContext";
import SpecialModal from "./AddWorkModals/SpecialModal";
import CompanyHeader from "../../components/Header/CompanyHeader";

const EmployerAddWork = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [normalDay, setNormalDay] = useState(7);
  const [isType, setIsType] = useState(1);
  const navigation = useNavigation();
  // Цалин Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  // Хүйс modal
  const [genderModal, setGenderModal] = useState(false);
  const [gender, setGender] = useState("");
  // нас сонгох модал
  const [ageModal, setAgeModal] = useState(false);
  const [age, setAge] = useState("");
  // Туршлага сонгох
  const [experienceModal, setExperienceModal] = useState(false);
  const [experience, setExperience] = useState("");
  // Боловсрол сонгох
  const [educationModal, setEducationModal] = useState(false);
  const [education, setEducation] = useState("");
  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  // Level сонгох
  const [level, setLevel] = useState("");
  const [levelModal, setLevelModal] = useState(false);
  // Цагын төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);
  // Ontsloh yaaraltai bolgoh eseh
  const [specialModal, setSpecialModal] = useState(false);
  const sendWork = () => {
    axios
      .post(`${api}/api/v1/jobs/${state.companyId}`, addWork)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const [addWork, setAddWork] = useState({
    title: "",
    description: "",
    do: "",
    do1: "",
    do2: "",
    do3: "",
    schedule: "",
    language: "",
    skill: "",
    skill1: "",
    skill2: "",
    skill3: "",
    contact: "",
    location: "",
    benefit: "",
    salary: "",
    gender: "",
    age: "",
    education: "",
    experience: "",
    occupation: "",
    level: "",
    type: "",
    order: null,
    special: null,
    urgent: null,
  });
  const [error, setError] = useState({
    title: false,
    description: false,
    do: false,
    do1: false,
    do2: false,
    do3: false,
    skill: false,
    skill1: false,
    skill2: false,
    skill3: false,
    contact: false,
    location: false,
    benefit: false,
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
  const checkTitle = (text) => {
    setError({
      ...error,
      title: text.length < 5,
    });

    setAddWork({
      ...addWork,
      title: text,
    });
  };
  const checkDescription = (text) => {
    setError({
      ...error,
      description: text.length < 5,
    });

    setAddWork({
      ...addWork,
      description: text,
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
  const checkDo1 = (text) => {
    setError({
      ...error,
      do1: text.length < 5,
    });

    setAddWork({
      ...addWork,
      do1: text,
    });
  };
  const checkDo2 = (text) => {
    setError({
      ...error,
      do2: text.length < 5,
    });

    setAddWork({
      ...addWork,
      do2: text,
    });
  };
  const checkDo3 = (text) => {
    setError({
      ...error,
      do3: text.length < 5,
    });

    setAddWork({
      ...addWork,
      do3: text,
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
  const checkSkill1 = (text) => {
    setError({
      ...error,
      skill1: text.length < 5,
    });

    setAddWork({
      ...addWork,
      skill1: text,
    });
  };
  const checkSkill2 = (text) => {
    setError({
      ...error,
      skill2: text.length < 5,
    });

    setAddWork({
      ...addWork,
      skill2: text,
    });
  };
  const checkSkill3 = (text) => {
    setError({
      ...error,
      skill3: text.length < 5,
    });

    setAddWork({
      ...addWork,
      skill3: text,
    });
  };
  const checkContact = (text) => {
    setError({
      ...error,
      contact: text.length < 5,
    });

    setAddWork({
      ...addWork,
      contact: text,
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
  const checkBenefit = (text) => {
    setError({
      ...error,
      benefit: text.length < 5,
    });

    setAddWork({
      ...addWork,
      benefit: text,
    });
  };
  const checkSalary = (text) => {
    setModalVisible(!modalVisible);
    setAddWork({
      ...addWork,
      salary: text,
    });
  };
  const checkGender = (text) => {
    setGenderModal(!genderModal);
    setAddWork({
      ...addWork,
      gender: text,
    });
  };
  const checkAge = (text) => {
    setAgeModal(!ageModal);
    setAddWork({
      ...addWork,
      age: text,
    });
  };
  const checkExperience = (text) => {
    setExperienceModal(!experienceModal);
    setAddWork({
      ...addWork,
      experience: text,
    });
  };
  const checkEducation = (text) => {
    setEducationModal(!educationModal);
    setAddWork({
      ...addWork,
      education: text,
    });
  };
  const checkOccupation = (id) => {
    setOccupationModal(!occupationModal);
    setAddWork({
      ...addWork,
      occupation: id,
    });
  };
  const checkLevel = (text) => {
    setLevelModal(!levelModal);
    setAddWork({
      ...addWork,
      level: text,
    });
  };
  const checkType = (text) => {
    setTypeModal(!typeModal);
    setAddWork({
      ...addWork,
      type: text,
    });
  };
  const checkOrders = (text, type) => {
    setSpecialModal(!specialModal);
    if (type === "normal") {
      setAddWork({
        ...addWork,
        order: text,
      });
    } else if (type === "special") {
      setAddWork({
        ...addWork,
        special: text,
      });
    } else if (type === "urgent") {
      setAddWork({
        ...addWork,
        urgent: text,
      });
    }
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
            Гарчиг
          </Text>
          <FormText
            placeholder="Гарчиг"
            value={addWork.title}
            onChangeText={checkTitle}
            errorText="Гарчиг урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.title}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Тайлбар
          </Text>
          <FormText
            placeholder="Тайлбар"
            value={addWork.description}
            onChangeText={checkDescription}
            errorText="Тайлбар урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.description}
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
            Хийгдэх ажил 2
          </Text>
          <FormText
            placeholder="Хийгдэх ажил 2"
            value={addWork.do1}
            onChangeText={checkDo1}
            errorText="Хийгдэх ажил 2 урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.do1}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хийгдэх ажил 3
          </Text>
          <FormText
            placeholder="Хийгдэх ажил 3"
            value={addWork.do2}
            onChangeText={checkDo2}
            errorText="Хийгдэх ажил 3 урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.do2}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хийгдэх ажил 4
          </Text>
          <FormText
            placeholder="Хийгдэх ажил 4"
            value={addWork.do3}
            onChangeText={checkDo3}
            errorText="Хийгдэх ажил 4 урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.do3}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хэлний шаардлага
          </Text>
          <FormText
            placeholder="Хэлний шаардлага"
            value={addWork.language}
            onChangeText={checkLanguage}
            errorText="Хэлний шаардлага урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.language}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Ажилах цагын хуваарь
          </Text>
          <FormText
            placeholder="Ажилах цагын хуваарь "
            value={addWork.schedule}
            onChangeText={checkSchedule}
            errorText="Ажилах цагын хуваарь  урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.schedule}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Чадвар
          </Text>
          <FormText
            placeholder="Чадвар"
            value={addWork.skill}
            onChangeText={checkSkill}
            errorText="Чадвар урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.skill}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Чадвар 2
          </Text>
          <FormText
            placeholder="Чадвар 2"
            value={addWork.skill1}
            onChangeText={checkSkill1}
            errorText="Чадвар 2 урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.skill1}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Чадвар 3
          </Text>
          <FormText
            placeholder="Чадвар 3"
            value={addWork.skill2}
            onChangeText={checkSkill2}
            errorText="Чадвар 3 урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.skill2}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Чадвар 4
          </Text>
          <FormText
            placeholder="Чадвар 4 "
            value={addWork.skill3}
            onChangeText={checkSkill3}
            errorText="Чадвар 4 урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.skill3}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Холбоо барих
          </Text>
          <FormText
            placeholder="Холбоо барих"
            value={addWork.contact}
            onChangeText={checkContact}
            errorText="Холбоо барих урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.contact}
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
            Урамшуулал
          </Text>
          <FormText
            placeholder="Урамшуулал"
            value={addWork.benefit}
            onChangeText={checkBenefit}
            errorText="Урамшуулал урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.benefit}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Цалин сонгох
          </Text>
          <MyButton
            text={salary === "" ? "Цалин сонгох" : `${salary}₮`}
            onPress={checkSalary}
            style={{ padding: 7 }}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хүйс сонгох
          </Text>
          <MyButton
            text={gender === "" ? "Хүйс сонгох" : gender}
            onPress={checkGender}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Нас сонгох
          </Text>
          <MyButton text={age === "" ? "Нас сонгох" : age} onPress={checkAge} />
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
            Боловсрол сонгох
          </Text>
          <MyButton
            text={education === "" ? "Боловсрол сонгох" : `${education}`}
            onPress={checkEducation}
          />
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
            Level сонгох
          </Text>
          <MyButton
            text={level === "" ? "Level сонгох" : `${level}`}
            onPress={checkLevel}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Цагын төрөл сонгох
          </Text>
          <MyButton
            text={type === "" ? "Цагын төрөл сонгох" : `${type}`}
            onPress={checkType}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Зарын төрөл
          </Text>
          <MyButton
            text={
              isType === 1
                ? `Энгийн ${normalDay} хоног`
                : isType === 2
                ? `Онцгой ${normalDay} хоног`
                : isType === 3
                ? `Яааралтай ${normalDay} хоног`
                : "Зарын төрөл сонгох"
            }
            onPress={checkOrders}
          />
          <View style={{ marginVertical: 5 }} />
          <MyButton text="Илгээх" onPress={sendWork} />
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </View>
      {/* Modals */}
      <View style={{ backgroundColor: colors.background }}>
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
        {/* Нас сонгох */}
        <AgeModal
          setAge={setAge}
          ageModal={ageModal}
          setAgeModal={setAgeModal}
          checkAge={checkAge}
        />
        {/* Туршлага  сонгох */}
        <ExperienceModal
          setExperience={setExperience}
          experienceModal={experienceModal}
          setExperienceModal={setExperienceModal}
          checkExperience={checkExperience}
        />
        {/* Боловсрол сонгох */}
        <EducationModal
          setEducation={setEducation}
          setEducationModal={setEducationModal}
          educationModal={educationModal}
          checkEducation={checkEducation}
        />
        {/* Мэргэжил сонгох */}
        <OccupationModal
          setOccupationModal={setOccupationModal}
          occupationModal={occupationModal}
          setOccupationName={setOccupationName}
          checkOccupation={checkOccupation}
        />
        {/* Level songoh */}
        <LevelModal
          setLevelModal={setLevelModal}
          levelModal={levelModal}
          setLevel={setLevel}
          checkLevel={checkLevel}
        />
        {/* type сонгох */}
        <TypeModal
          setTypeModal={setTypeModal}
          typeModal={typeModal}
          setType={setType}
          checkType={checkType}
        />
        <SpecialModal
          setSpecialModal={setSpecialModal}
          specialModal={specialModal}
          occupationName={occupationName}
          type={type}
          salary={salary}
          normalDay={normalDay}
          setNormalDay={setNormalDay}
          checkOrders={checkOrders}
          isType={isType}
          setIsType={setIsType}
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
