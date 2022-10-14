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
import SearchWorkByCateogry from "../../../../components/Modals/SearchWorkByCateogry";
import SearchByOccupation from "../../../../components/Modals/SearchByOccupation";
import GenderModal from "../../../../components/Modals/GenderModal";
import Loading from "../../../../components/Loading";
const PersonalDetailModal = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  // Хүйс modal
  const [genderModal, setGenderModal] = useState(false);
  const [gender, setGender] = useState("");
  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  // Туршлага сонгох
  const [experienceModal, setExperienceModal] = useState(false);
  const [experience, setExperience] = useState("");
  // Цалин Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  // Боловсрол сонгох
  const [educationModal, setEducationModal] = useState(false);
  const [education, setEducation] = useState("");
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const sendPersonalDetail = () => {
    setLoading(true);
    axios
      .post(`${api}/api/v1/questionnaires/${state.userId}`, personalCv)
      .then((res) => {
        navigation.goBack();
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };
  console.log(data);
  const [personalCv, setPersonalCv] = useState({
    lastName: data.lastName ? data.lastName : "",
    firstName: data.firstName ? data.firstName : "",
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
    occupation: null,
    occupationName: data.occupationName ? data.occupationName : "Сонгох",
    driverLicense: data.driverLicense,
    working: data.working,
  });
  const [error, setError] = useState({
    lastName: false,
    firstName: false,
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
  const checkOccupation = (id, name) => {
    console.log(id, name);
    setPersonalCv({
      ...personalCv,
      occupation: id,
      occupationName: name,
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: colors.header,
          }}
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

            {/* Ажлын туршлага */}
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
                  {experience ? experience : personalCv.experienceYear}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Цалингын хүлээлт */}
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
                <Text style={{ fontSize: 16 }}>
                  {salary ? salary : personalCv.salaryExpectation}
                </Text>
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
                <Text style={{ fontSize: 16 }}>
                  {education ? education : personalCv.education}
                </Text>
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
                <Text style={{ fontSize: 16 }}>
                  {gender ? gender : personalCv.gender}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Мэргэжил */}
            <TouchableOpacity onPress={() => setCategoryModal(true)}>
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
                  {occupationName ? occupationName : data.occupationName}
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
            setSalary={setSalary}
            checkSalary={checkSalary}
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
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default PersonalDetailModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 5,
  },
});
