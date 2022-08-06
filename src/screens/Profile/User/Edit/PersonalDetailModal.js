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
import { LinearGradient } from "expo-linear-gradient";
import SalaryExpectationModal from "./EditModal/SalaryExpectationModal";
import ExperienceYearModal from "./EditModal/ExperienceYearModal";
const PersonalDetailModal = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  // tsalingiin huleelt
  const [salText, setSalText] = useState("");
  const [salModal, setSalModal] = useState(false);
  // ajliin turshlaga
  const [expText, setExpText] = useState("");
  const [expModal, setExpModal] = useState(false);
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
    lastName: data.lastName,
    firstName: data.firstName,
    profession: data.profession,
    birth: data.birth,
    humanId: data.humanId,
    birthPlace: data.birthPlace,
    location: data.location,
    salaryExpectation: data.salaryExpectation,
    experienceYear: data.experienceYear,
    gender: data.gender,
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
  const checkSalaryExpectation = (text) => {
    setSalModal(!salModal);
    setPersonalCv({
      ...personalCv,
      salaryExpectation: text,
    });
  };
  const checkExperienceYear = (text) => {
    setExpModal(!expModal);
    setPersonalCv({
      ...personalCv,
      experienceYear: text,
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
              borderRadius: 20,
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
              borderRadius: 20,
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
          Одоо амьдарж байгаа
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

        <TouchableOpacity onPress={checkExperienceYear}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Ажлын туршлага
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {expText === "Байхгүй" ? expText : expText && `${expText} жил`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={checkSalaryExpectation}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Цалингийн хүлээлт
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>{salText}</Text>
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
            trackColor={{ false: "#FFB6C1", true: "#FFB6C1" }}
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
            trackColor={{ false: "#FFB6C1", true: "#FFB6C1" }}
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

        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{ paddingHorizontal: 20, borderRadius: 20, marginTop: 20 }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <TouchableOpacity
            onPress={sendPersonalDetail}
            style={{
              alignSelf: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}> Хадгалах </Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
      {/* Modal */}
      <SalaryExpectationModal
        setSalText={setSalText}
        checkSalaryExpectation={checkSalaryExpectation}
        salModal={salModal}
        setSalModal={setSalModal}
      />
      <ExperienceYearModal
        setExpText={setExpText}
        checkExperienceYear={checkExperienceYear}
        expModal={expModal}
        setExpModal={setExpModal}
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
