import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import moment from "moment";
import { api } from "../../../../Constants";
import FormText from "../../../components/FormText";
import CompanyWorkerModal from "./CompanyWorkerModal";
import MyButton from "../../../components/MyButton";

const CompanyProfileEdit = ({ route }) => {
  const { colors } = useTheme();
  const { data } = route.params;
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [companyProfile, setCompanyProfile] = useState({
    about: data.about ? data.about : "Хоосон",
    web: data.web ? data.web : "Хоосон",
    phone: data.phone ? data.phone : "Хоосон",
    employerNumber: data.employerNumber ? data.employerNumber : "null",
    createYear: data.createYear ? data.createYear : "2022",
    location: data.location ? data.location : "Хоосон",
  });
  console.log(data);
  const [error, setError] = useState({
    about: false,
    web: false,
    phone: false,
    members: false,
    createYear: false,
    locaiton: false,
  });
  // ажилтан сонгох модал
  const [membersModal, setMembersModal] = useState(false);
  const [membersText, setMembersText] = useState("");
  const checkAbout = (text) => {
    setError({
      ...error,
      about: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      about: text,
    });
  };
  const checkWeb = (text) => {
    setError({
      ...error,
      web: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      web: text,
    });
  };
  const checkPhone = (text) => {
    setError({
      ...error,
      phone: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      phone: text,
    });
  };

  const checkCreatedYear = (text) => {
    setError({
      ...error,
      createYear: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      createYear: text,
    });
  };
  const checkLocaiton = (text) => {
    setError({
      ...error,
      location: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      location: text,
    });
  };
  const checkMembers = (text) => {
    setMembersModal(!membersModal);
    setCompanyProfile({
      ...companyProfile,
      employerNumber: text,
    });
  };
  const sendCompanyProfile = () => {
    axios
      .put(`${api}/api/v1/profiles/${state.companyId}`, companyProfile)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  return (
    <View style={{ marginHorizontal: 20 }}>
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Компани тухай
      </Text>
      <FormText
        value={companyProfile.about}
        onChangeText={checkAbout}
        errorText="Компани мэдээлэл 2 оос дээш тэмдэгтээс тогтоно."
        errorShow={error.about}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Веб хуудас
      </Text>
      <FormText
        value={companyProfile.web}
        onChangeText={checkWeb}
        errorText="Компани web 2 оос дээш тэмдэгтээс тогтоно."
        errorShow={error.web}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Утасны дугаар
      </Text>
      <FormText
        value={companyProfile.phone && companyProfile.phone.toString()}
        onChangeText={checkPhone}
        errorText="Утасны дугаар 6 аас дээш тоонд тогтоно."
        errorShow={error.phone}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Ажилтаны тоо
      </Text>
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: colors.border,
          backgroundColor: colors.secondaryText,
        }}
        onPress={() => setMembersModal(true)}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.primaryText,
          }}
        >
          {companyProfile.employerNumber === ""
            ? "Ажилтаны тоо"
            : `${companyProfile.employerNumber} Ажилтантай`}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Үүсгэн байгуулагдсан огноо
      </Text>
      <FormText
        value={moment(companyProfile.createYear).format("YYYY")}
        onChangeText={checkCreatedYear}
        errorText="Үүсгэн байгуулагдсан огноо 4 оос дээш тэмдэгтээс тогтоно."
        errorShow={error.createYear}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Хаяг байршил
      </Text>
      <FormText
        value={companyProfile.location}
        onChangeText={checkLocaiton}
        errorText="Хаяг байршил 2 оос дээш тэмдэгтээс тогтоно."
        errorShow={error.locaiton}
      />
      <TouchableOpacity
        onPress={sendCompanyProfile}
        style={{
          alignSelf: "center",
        }}
      >
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{
            borderRadius: 20,
            paddingHorizontal: 40,
            marginTop: 20,
            padding: 10,
          }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <Text style={{ color: "white" }}> Хадгалах </Text>
        </LinearGradient>
      </TouchableOpacity>
      <CompanyWorkerModal
        setMembersText={setMembersText}
        membersModal={membersModal}
        setMembersModal={setMembersModal}
        checkMembers={checkMembers}
      />
    </View>
  );
};

export default CompanyProfileEdit;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
