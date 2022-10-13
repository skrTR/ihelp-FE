import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import FormText from "../../../../components/FormText";
import UserContext from "../../../../context/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { api } from "../../../../../Constants";
import moment from "moment";
import SalaryModal from "../../../Employer/AddWorkModals/SalaryModal";
import ExperienceModal from "../../../Employer/AddWorkModals/ExperienceModal";
import EducationModal from "../../../Employer/AddWorkModals/EducationModal";
import GenderModal from "../../../Employer/AddWorkModals/GenderModal";
import OccupationModal from "../../../Employer/AddWorkModals/OccupationModal";
const PersonalDetailModal = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [modalVisible, setModalVisible] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  const [education, setEducation] = useState("");
  console.log(data);
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/${state.userId}`, personalCv)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const [personalCv, setPersonalCv] = useState({
    lastName: data.lastName ? data.lastName : "",
    firstName: data.firstName ? data.firstName : "",
    profession: data.profession ? data.profession : "",
    birth: data.birth ? data.birth : "",
    humanId: data.humanId ? data.humanId : "",
    birthPlace: data.birthPlace ? data.birthPlace : "",
    location: data.location ? data.location : "",
    salaryExpectation: data.salaryExpectation
      ? data.salaryExpectation
      : "Сонгох",
    experienceYear: data.experienceYear ? data.experienceYear : "Сонгох",
    education: data.education ? data.education : "Сонгох",
    gender: data.gender ? data.gender : "Сонгох",
    occupation: data.occupation ? data.occupation : "Сонгох",
    driverLicense: data.driverLicense,
    working: data.working,
  });
  const [error, setError] = useState({
    lastName: false,
    firstName: false,
    profession: false,
    humanId: false,
    birthPlace: false,
    location: false,
  });

  const checkLastName = (text) => {
    setError({
      ...error,
      lastName: text.length < 2,
    });

    setPersonalCv({
      ...personalCv,
      lastName: text,
    });
  };
  const checkFirstName = (text) => {
    setError({
      ...error,
      firstName: text.length < 2,
    });

    setPersonalCv({
      ...personalCv,
      firstName: text,
    });
  };
  const checkProfession = (text) => {
    setError({
      ...error,
      profession: text.length < 5,
    });

    setPersonalCv({
      ...personalCv,
      profession: text,
    });
  };
  const checkHumanId = (text) => {
    setError({
      ...error,
      humanId: text.length < 7,
    });
    setPersonalCv({
      ...personalCv,
      humanId: text,
    });
  };
  const checkBirthPlace = (text) => {
    setError({
      ...error,
      birthPlace: text.length < 5,
    });
    setPersonalCv({
      ...personalCv,
      birthPlace: text,
    });
  };
  const checkLocation = (text) => {
    setError({
      ...error,
      location: text.length < 5,
    });
    setPersonalCv({
      ...personalCv,
      location: text,
    });
  };
  const checkBirth = (event, value) => {
    setDate(value);
    setPersonalCv({
      ...personalCv,
      birth: date,
    });
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };
  const checkDriveLicense = (text) => {
    setPersonalCv({
      ...personalCv,
      driverLicense: !personalCv.driverLicense,
    });
  };
  const checkWorking = (text) => {
    setPersonalCv({
      ...personalCv,
      working: !personalCv.working,
    });
  };
  const checkSalary = (text) => {
    setModalVisible(!modalVisible);
    setPersonalCv({
      ...personalCv,
      salaryExpectation: text,
    });
  };
  const checkEducation = (text) => {
    setEducationModal(!educationModal);
    setPersonalCv({
      ...personalCv,
      education: text,
    });
  };
  const checkGender = (text) => {
    setGenderModal(!genderModal);
    setPersonalCv({
      ...personalCv,
      gender: text,
    });
  };
  const checkOccupation = (text) => {
    setOccupationModal(!occupationModal);
    setPersonalCv({
      ...personalCv,
      occupation: text,
    });
  };
  const checkExperience = (text) => {
    setExperienceModal(!experienceModal);
    setPersonalCv({
      ...personalCv,
      experienceYear: text,
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Овог нэр */}
        <Text
          style={[
            styles.textTitle,
            { color: colors.primaryText, marginTop: 20 },
          ]}
        >
          Овог
        </Text>
        <FormText
          value={personalCv.lastName}
          onChangeText={checkLastName}
          errorText="Овог нэр 2-20 тэмдэгтээс тогтоно."
          errorShow={error.lastName}
          style={{ fontSize: 16 }}
        />
        {/* Өөрийн нэр */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Нэр
        </Text>
        <FormText
          value={personalCv.firstName}
          onChangeText={checkFirstName}
          errorText="Нэр 2-20 тэмдэгтээс тогтоно."
          errorShow={error.firstName}
          style={{ fontSize: 16 }}
        />
        {/* Рэгистэр */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Регистерийн дугаар
        </Text>
        <FormText
          value={personalCv.humanId}
          onChangeText={checkHumanId}
          errorText="Регистер 8-12 тэмдэгтээс тогтоно."
          errorShow={error.humanId}
          style={{ fontSize: 16 }}
        />
        {/* Төрсөн өдөр */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Төрсөн он сар
        </Text>
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            maximumDate={new Date(2023, 15, 20)}
            onChange={checkBirth}
            style={styles.datePicker}
            neutralButtonLabel="clear"
          />
        )}
        {!isPickerShow ? (
          <TouchableOpacity
            onPress={showPicker}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "#C0C0C0",
            }}
          >
            <Text style={[{ fontSize: 16 }]}>
              {moment(date).format("YYYY-MM-DD")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsPickerShow(false)}
            style={{
              padding: 10,
              backgroundColor: "#FFB6C1",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center" }}>Болсон</Text>
          </TouchableOpacity>
        )}

        {/*  birthPlace */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Төрсөн газар
        </Text>

        <FormText
          value={personalCv.birthPlace}
          onChangeText={checkBirthPlace}
          errorText="Төрсөн газар 4-20 тэмдэгтээс тогтоно."
          errorShow={error.birthPlace}
          style={{ fontSize: 16 }}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Одоо амьдарч байгаа хаяг
        </Text>

        <FormText
          value={personalCv.location}
          onChangeText={checkLocation}
          errorText="Одоо амьдарч байгаа газар 4-20 тэмдэгтээс тогтоно."
          errorShow={error.location}
          style={{ fontSize: 16 }}
        />
        {/* Ажил мэргэжил */}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Мэргэжил
        </Text>
        <FormText
          value={personalCv.profession}
          onChangeText={checkProfession}
          errorText="Мэргэжил 4-20 тэмдэгтээс тогтоно."
          errorShow={error.profession}
          style={{ fontSize: 16 }}
        />

        <TouchableOpacity onPress={() => setExperienceModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Ажлын туршлага
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {personalCv.experienceYear === ""
                ? "Ажлын туршлага жилээр"
                : personalCv.experienceYear}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Цалингийн хүлээлт
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{personalCv.salaryExpectation}</Text>
          </View>
        </TouchableOpacity>
        {/* Боловсрол */}
        <TouchableOpacity onPress={() => setEducationModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Боловсрол
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{personalCv.education}</Text>
          </View>
        </TouchableOpacity>
        {/* Хүйс */}
        <TouchableOpacity onPress={() => setGenderModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хүйс
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{personalCv.gender}</Text>
          </View>
        </TouchableOpacity>
        {/* Мэргэжил */}
        <TouchableOpacity onPress={() => setOccupationModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Мэргэжил
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {occupationName ? occupationName : "Сонгох"}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Жолооны үнэмлэх байгаа эсэх?
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Switch
            trackColor={{ false: "#f4f3f4", true: "#FFB6C1" }}
            thumbColor={personalCv.driverLicense ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={checkDriveLicense}
            value={personalCv.driverLicense}
          />
          {personalCv.driverLicense ? (
            <Text style={{ color: colors.primaryText, fontSize: 16 }}>
              {" "}
              Байгаа
            </Text>
          ) : (
            <Text style={{ color: colors.primaryText, fontSize: 16 }}>
              {" "}
              Байхгүй
            </Text>
          )}
        </View>
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Ажил хийдэг эсэх?
        </Text>
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
            // marginHorizontal: 40,
          }}
        >
          <Switch
            trackColor={{ false: "#f4f3f4", true: "#FFB6C1" }}
            thumbColor={personalCv.driverLicense ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={checkWorking}
            value={personalCv.working}
          />
          {!personalCv.working ? (
            <Text style={{ color: colors.primaryText, fontSize: 16 }}>
              {" "}
              Ажилгүй
            </Text>
          ) : (
            <Text style={[{ color: colors.primaryText, fontSize: 16 }]}>
              {" "}
              Ажилтай
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={sendPersonalDetail}
          style={{
            alignSelf: "center",
            backgroundColor: "#FFB6C1",
            borderRadius: 10,
            marginTop: 20,
            padding: 10,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "black" }}> Хадгалах </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
      {/* Цалин  */}
      <SalaryModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        checkSalary={checkSalary}
      />
      <ExperienceModal
        experienceModal={experienceModal}
        setExperienceModal={setExperienceModal}
        checkExperience={checkExperience}
      />
      <EducationModal
        educationModal={educationModal}
        setEducationModal={setEducationModal}
        checkEducation={checkEducation}
        setEducation={setEducation}
      />
      <GenderModal
        genderModal={genderModal}
        setGenderModal={setGenderModal}
        checkGender={checkGender}
      />
      <OccupationModal
        occupationModal={occupationModal}
        setOccupationModal={setOccupationModal}
        checkOccupation={checkOccupation}
        setOccupationName={setOccupationName}
      />
    </KeyboardAvoidingView>
  );
};

export default PersonalDetailModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 5,
  },
});
