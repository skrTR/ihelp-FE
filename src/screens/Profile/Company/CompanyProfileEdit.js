import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import moment from "moment";
import { api } from "../../../../Constants";
import FormText from "../../../components/FormText";

const CompanyProfileEdit = ({ route }) => {
  const { colors } = useTheme();
  const { data } = route.params;
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [companyProfile, setCompanyProfile] = useState({
    about: data.about,
    web: data.web,
    phone: data.phone,
    members: data.employerNumber,
    createdYear: data.createdYear,
    locaiton: data.location,
  });
  const [error, setError] = useState({
    about: false,
    web: false,
    phone: false,
    members: false,
    createdYear: false,
    locaiton: false,
  });
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
  const checkMembers = (text) => {
    setError({
      ...error,
      members: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      members: text,
    });
  };
  const checkCreatedYear = (text) => {
    setError({
      ...error,
      createdYear: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      createdYear: text,
    });
  };
  const checkLocaiton = (text) => {
    setError({
      ...error,
      locaiton: text.length < 2,
    });
    setCompanyProfile({
      ...companyProfile,
      locaiton: text,
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
        Ажилчдын тоо
      </Text>
      <FormText
        value={companyProfile.members}
        onChangeText={checkMembers}
        errorText="Ажилчдын тоо 2 оос дээш тэмдэгтээс тогтоно."
        errorShow={error.members}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Үүсгэн байгуулагдсан огноо
      </Text>
      <FormText
        value={moment(companyProfile.createdYear).format("YYYY")}
        onChangeText={checkCreatedYear}
        errorText="Үүсгэн байгуулагдсан огноо 4 оос дээш тэмдэгтээс тогтоно."
        errorShow={error.createdYear}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Хаяг байршил
      </Text>
      <FormText
        value={companyProfile.locaiton}
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
