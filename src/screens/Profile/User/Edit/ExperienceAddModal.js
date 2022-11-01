import {
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ExperienceCompanyModal from "./EditModal/ExperienceCompanyModal";
import TypeModal from "../../../../components/Modals/TypeModal";
import ProvinceModal from "../../../../components/Modals/ProvinceModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
const ExperienceAddModal = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  // Company songoh
  const [companyModal, setCompanyModal] = useState(false);
  // Цагийн төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);
  // Хаяг байршил сонгох
  const [province, setProvince] = useState("");
  const [provinceModal, setProvinceModal] = useState(false);
  // Ажилд орсон
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const showPicker = () => {
    setIsPickerShow(true);
  };
  // Ажилаас гарсан
  const [isPickerShow1, setIsPickerShow1] = useState(false);
  const [date1, setDate1] = useState(new Date(Date.now()));
  const showPicker1 = () => {
    setIsPickerShow1(true);
  };
  const [error, setError] = useState({
    description: false,
    do: false,
    exitCause: false,
    achievements: false,
    contactInfo: false,
    position: false,
    location: false,
    type: false,
    start: false,
  });
  const [experience, setExperience] = useState({
    description: "",
    do: "",
    exitCause: "",
    achievements: "",
    contactInfo: "",
    start: "",
    end: "",
    isWorking: false,
    company: null,
    companyId: null,
    companyPhoto: null,
    position: "",
    location: "",
    type: "",
  });
  const sendPersonalDetail = () => {
    if (experience.type.length < 1) {
      return Alert.alert("Ажилсан цагийн төрлөө оруулна уу");
    }
    if (!experience.company) {
      return Alert.alert("Ажилсан байгууллага оруулна уу");
    }
    if (experience.start.length < 1) {
      return Alert.alert("Ажилд орсон огноо оруулна уу");
    }
    axios
      .post(`${api}/api/v1/questionnaires/experience`, experience)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => Alert.alert(err.response.data.error.message));
  };
  const checkLocation = (text) => {
    setProvinceModal(!provinceModal);
    setExperience({
      ...experience,
      location: text,
    });
  };
  const checkDescription = (text) => {
    setError({
      ...error,
      description: text.length < 5,
    });

    setExperience({
      ...experience,
      description: text,
    });
  };
  const checkDo = (text) => {
    setError({
      ...error,
      do: text.length < 5,
    });

    setExperience({
      ...experience,
      do: text,
    });
  };
  const checkExitCause = (text) => {
    setError({
      ...error,
      exitCause: text.length < 5,
    });

    setExperience({
      ...experience,
      exitCause: text,
    });
  };
  const checkAchievements = (text) => {
    setError({
      ...error,
      achievements: text.length < 5,
    });

    setExperience({
      ...experience,
      achievements: text,
    });
  };
  const checkContactInfo = (text) => {
    setError({
      ...error,
      contactInfo: text.length < 5,
    });

    setExperience({
      ...experience,
      contactInfo: text,
    });
  };
  const checkPosition = (text) => {
    setError({
      ...error,
      position: text.length < 2,
    });

    setExperience({
      ...experience,
      position: text,
    });
  };

  const checkType = (text) => {
    setTypeModal(!typeModal);
    setExperience({
      ...experience,
      type: text,
    });
  };

  const checkEnd = (event, value) => {
    setDate1(value);
    setExperience({
      ...experience,
      end: date,
    });
    if (Platform.OS === "android") {
      setIsPickerShow1(false);
    }
  };
  const checkStart = (event, value) => {
    setDate(value);
    setExperience({
      ...experience,
      start: date,
    });
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const checkWorking = () => {
    setExperience({
      ...experience,
      isWorking: !experience.isWorking,
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => setCompanyModal(true)}
          style={{ marginTop: 10 }}
        >
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Байгууллага
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 2,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {experience.companyPhoto && (
                <Image
                  source={{ uri: `${api}/upload/${experience.companyPhoto}` }}
                  style={{
                    width: 23,
                    height: 23,
                    marginRight: 10,
                    marginLeft: 5,
                    borderRadius: 10,
                  }}
                />
              )}
              {experience.company ? (
                <Text style={{ color: "black" }}>{experience.company}</Text>
              ) : (
                <Text style={{ color: colors.secondaryText, marginLeft: 10 }}>
                  Жишээ нь: ihelp
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                setExperience({
                  ...experience,
                  company: null,
                  companyId: null,
                  companyPhoto: null,
                });
              }}
              style={{ marginRight: 10 }}
            >
              {experience.company && (
                <Ionicons name="backspace-outline" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Ажилд орсон огноо
        </Text>
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            maximumDate={new Date(2023, 15, 20)}
            onChange={checkStart}
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

        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Албан тушаал
        </Text>
        <FormText
          value={experience.position}
          onChangeText={checkPosition}
          errorText="Албан тушаал 2-20 тэмдэгтээс тогтоно."
          errorShow={error.position}
        />
        <TouchableOpacity onPress={checkType}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Төрөл
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{type && type}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setProvinceModal(true)}>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хаяг байршил
          </Text>
          <View
            style={{
              backgroundColor: colors.secondaryText,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{province && province}</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Хийсэн ажил
        </Text>
        <FormText
          value={experience.do}
          onChangeText={checkDo}
          errorText="Хийсэн ажил 3-20 тэмдэгтээс тогтоно."
          errorShow={error.do}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Шагнал медал
        </Text>
        <FormText
          value={experience.achievements}
          onChangeText={checkAchievements}
          errorText="Шагнал медал 3-20 тэмдэгтээс тогтоно."
          errorShow={error.achievements}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Холбогдох албан тушаалтан
        </Text>
        <FormText
          value={experience.contactInfo}
          onChangeText={checkContactInfo}
          errorText="Холбогдох албан тушаалтан 3-20 тэмдэгтээс тогтоно."
          errorShow={error.contactInfo}
        />
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Ажиллаж байгаа эсэх?
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            trackColor={{ false: "#FFB6C1", true: "#FFB6C1" }}
            thumbColor={experience.isWorking ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={checkWorking}
            value={experience.isWorking}
          />
          {experience.isWorking ? (
            <Text style={[{ color: colors.primaryText }]}> Ажиллаж байгаа</Text>
          ) : (
            <Text style={[{ color: colors.primaryText }]}> Ажлаас гарсан</Text>
          )}
        </View>

        {!experience.isWorking && (
          <>
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Гарсан шалтгаан
            </Text>
            <FormText
              value={experience.exitCause}
              onChangeText={checkExitCause}
              errorText="Гарсан шалтгаан 3-20 тэмдэгтээс тогтоно."
              errorShow={error.exitCause}
            />

            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Ажилаас гарсан огноо
            </Text>
            {isPickerShow1 && (
              <DateTimePicker
                value={date1}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                maximumDate={new Date(2023, 15, 20)}
                onChange={checkEnd}
                style={styles.datePicker}
                neutralButtonLabel="clear"
              />
            )}
            {!isPickerShow1 ? (
              <TouchableOpacity
                onPress={showPicker1}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "#C0C0C0",
                }}
              >
                <Text style={[{ fontSize: 16 }]}>
                  {moment(date1).format("YYYY-MM-DD")}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setIsPickerShow1(false)}
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
          </>
        )}
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          Тайлбар
        </Text>
        <FormText
          value={experience.description}
          onChangeText={checkDescription}
          errorText="Тайлбар 4-20 тэмдэгтээс тогтоно."
          errorShow={error.description}
        />

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
        <View style={{ marginBottom: 100 }} />
        {/* Modal */}
        <ExperienceCompanyModal
          companyModal={companyModal}
          setCompanyModal={setCompanyModal}
          setExperience={setExperience}
          experience={experience}
        />
        <TypeModal
          setTypeModal={setTypeModal}
          typeModal={typeModal}
          setType={setType}
          checkType={checkType}
        />
        <ProvinceModal
          provinceModal={provinceModal}
          setProvinceModal={setProvinceModal}
          setProvince={setProvince}
          checkProvince={checkLocation}
        />
        <View style={{ marginBottom: 250 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ExperienceAddModal;

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
