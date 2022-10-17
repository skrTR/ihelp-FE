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
import moment from "moment";
const ExperienceDetailModal = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { data } = route.params;

  // Company songoh
  const [companyModal, setCompanyModal] = useState(false);
  // Цагийн төрөл сонгох
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
  const [experience, setExperience] = useState({
    description: data.description,
    do: data.do,
    exitCause: data.exitCause,
    achievements: data.achievements,
    contactInfo: data.contactInfo,
    start: data.start ? data.start : "2022",
    end: data.end ? data.end : "2022",
    isWorking: data.isWorking,
    company: data.company,
    position: data.position,
    location: data.location,
    type: data.type ? data.type : "Сонгох",
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
  const checkStart = (type) => {
    setExperience({
      ...experience,
      start: type,
    });
  };
  const checkWorking = () => {
    setExperience({
      ...experience,
      isWorking: !experience.isWorking,
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
        style={{
          flex: 1,
          backgroundColor: colors.header,
        }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
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
            Ажилд орсон он
          </Text>
          <FormText
            value={moment(experience.start).format("YYYY")}
            onChangeText={checkStart}
            errorText="Гарсан он урт 3-20 тэмдэгтээс тогтоно."
            errorShow={error.start}
            keyboardType="numeric"
          />
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
              <Text style={[{ color: colors.primaryText }]}>
                {" "}
                Ажиллаж байгаа
              </Text>
            ) : (
              <Text style={[{ color: colors.primaryText }]}>
                {" "}
                Ажлаас гарсан
              </Text>
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
                Гарсан он
              </Text>
              <FormText
                value={moment(experience.end).format("YYYY")}
                onChangeText={checkEnd}
                errorText="Гарсан он урт 3-20 тэмдэгтээс тогтоно."
                errorShow={error.end}
                keyboardType="numeric"
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
          <TouchableOpacity
            onPress={deleteExperience}
            style={{
              marginTop: 20,
              borderRadius: 10,
              paddingVertical: 10,
              borderRadius: 10,
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
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 10,
              padding: 10,
            }}
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
          <View style={{ marginBottom: 50 }} />
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
