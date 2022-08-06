import {
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Switch,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyButton from "../../../../components/MyButton";
import ExperienceCompanyModal from "./EditModal/ExperienceCompanyModal";
import TypeModal from "../../../Employer/AddWorkModals/TypeModal";
const ExperienceDetailModal = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { data } = route.params;

  // Company songoh
  const [companyModal, setCompanyModal] = useState(false);
  // Цагын төрөл сонгох
  const [type, setType] = useState("");
  const [typeModal, setTypeModal] = useState(false);
  const sendPersonalDetail = () => {
    axios
      .put(`${api}/api/v1/questionnaires/${data._id}/experience`, experience)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const deleteExperience = () => {
    axios
      .delete(`${api}/api/v1/questionnaires/${data._id}/experience`)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const [isEnabled, setIsEnabled] = useState(data.isWorking);
  const [experience, setExperience] = useState({
    description: data.description,
    do: data.do,
    exitCause: data.exitCause,
    achievements: data.achievements,
    contactInfo: data.contactInfo,
    start: data.start,
    end: data.end,
    isWorking: isEnabled,
    company: data.company,
    position: data.position,
    location: data.location,
    type: data.type,
    company: data.company,
    companyPhoto: data.companyPhoto,
  });
  const [error, setError] = useState({
    description: false,
    do: false,
    exitCause: false,
    achievements: false,
    contactInfo: false,
    company: false,
    occupation: false,
    position: false,
    location: false,
    type: false,
  });
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
  const checkLocation = (text) => {
    setError({
      ...error,
      locaiton: text.length < 3,
    });

    setExperience({
      ...experience,
      location: text,
    });
  };
  const checkType = (text) => {
    setTypeModal(!typeModal);
    setExperience({
      ...experience,
      type: text,
    });
  };
  const checkEnd = (type) => {
    setExperience({
      ...experience,
      end: type,
    });
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
          <TouchableOpacity onPress={() => setCompanyModal(true)}>
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Компани нэр
            </Text>
            <View
              style={{
                backgroundColor: colors.secondaryText,
                padding: 2,
                marginVertical: 5,
                borderRadius: 20,
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
              Цагийн төрөл
            </Text>
            <View
              style={{
                backgroundColor: colors.secondaryText,
                padding: 12,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 16 }}>{type}</Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хаяг байршил
          </Text>
          <FormText
            value={experience.location}
            onChangeText={checkLocation}
            errorText="Хаяг байршил 3-20 тэмдэгтээс тогтоно."
            errorShow={error.location}
          />
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch
              trackColor={{ false: "#FFB6C1", true: "#FFB6C1" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginTop: 16, marginBottom: 5 }}
            />
            {isEnabled && (
              <Text style={[{ color: colors.primaryText }]}>
                {" "}
                Ажиллаж байгаа
              </Text>
            )}
          </View>
          {!isEnabled && (
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
                Гарсан он
              </Text>
              <FormText
                value={experience.end && experience.end.slice(0, 10)}
                onChangeText={checkEnd}
                errorText="Гарсан он урт 3-20 тэмдэгтээс тогтоно."
                errorShow={error.end}
              />
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
          <TouchableOpacity
            onPress={deleteExperience}
            style={{
              marginTop: 20,
              borderRadius: 20,
              paddingVertical: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ color: colors.primaryText, textAlign: "center" }}>
              {" "}
              Устгах{" "}
            </Text>
          </TouchableOpacity>
          <MyButton
            onPress={() => navigation.navigate("ExperienceAddModal")}
            text="Туршлага нэмэх"
            style={{ marginTop: 20, marginBottom: 50 }}
          />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ExperienceDetailModal;

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
