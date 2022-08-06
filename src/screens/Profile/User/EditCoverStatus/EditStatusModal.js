import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../../../Constants";
const EditStatusModal = (props) => {
  const { data, cvData } = props.route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [personalCv, setPersonalCv] = useState({
    profession: cvData.profession,
    workingCompany: cvData.workingCompany,
  });
  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/${data._id}`, personalCv)
      .then((res) => {
        // navigation.goBack();
        Alert.alert("Амжиллтай");
      })
      .catch((err) => alert(err));
  };
  const checkWorkingCompany = (text) => {
    setPersonalCv({
      ...personalCv,
      workingCompany: text,
    });
  };
  const checkProfession = (text) => {
    setPersonalCv({
      ...personalCv,
      profession: text,
    });
  };
  return (
    <View>
      <Image
        source={{
          uri: `${api}/upload/${data.profile}`,
        }}
        style={{
          height: 150,
          width: 150,
          alignSelf: "center",
          borderRadius: 100,
          resizeMode: "contain",
          marginTop: 50,
          marginBottom: 20,
        }}
      />
      <Text
        style={{
          color: colors.primaryText,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {data.lastName.slice(0, 1)}.{data.firstName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginVertical: 5,
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Албан тушаал"
          style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 10,
            borderColor: colors.border,
            marginRight: 10,
            paddingHorizontal: 20,
            color: colors.primaryText,
          }}
          // value={}
          value={personalCv.profession}
          onChangeText={checkProfession}
        />

        <Text
          style={{
            color: colors.primaryText,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          @
        </Text>

        <TextInput
          placeholder="Ажлын газар"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            borderColor: colors.border,
            color: colors.primaryText,
            paddingHorizontal: 20,
          }}
          value={personalCv.workingCompany}
          onChangeText={checkWorkingCompany}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          color: colors.secondaryText,
          fontFamily: "Sf-thin",
          marginTop: 10,
          textAlign: "justify",
          marginHorizontal: 20,
        }}
      >
        Та дээрх мэдээллийг оруулснаар өөрийгөө бусад хэрэглэгч нарт таниулах
        бөгөөд энэ нь тус платформыг хэрэглэх бүхий л явцад таны нэрний доор
        үзэгдэх болно.
      </Text>
      <Text></Text>
      <Text
        style={{
          fontSize: 12,
          color: "#FFB6C1",
          fontFamily: "Sf-thin",
          textAlign: "justify",
          marginHorizontal: 20,
        }}
      >
        Ж/нь: Борлуулалтын менежер @ihelp.mn
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: personalCv.profession ? "#FFB6C1" : colors.border,
          padding: 6,
          borderRadius: 20,
          alignSelf: "flex-end",
          marginTop: 20,
          marginRight: 20,
        }}
        disabled={personalCv ? false : true}
        onPress={sendPersonalDetail}
      >
        <Text
          style={{
            fontSize: 18,
            color: personalCv.profession ? "black" : colors.secondaryText,
            paddingHorizontal: 10,
          }}
        >
          Хадгалах
        </Text>
      </TouchableOpacity>
      <View style={{ marginHorizontal: 20 }}>
        {/* Pro pic view */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() =>
            navigation.navigate("ProfilePictureView", { photo: data.profile })
          }
        >
          <SimpleLineIcons
            name="picture"
            size={28}
            color={colors.primaryText}
          />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
          >
            Зураг үзэх, шинэчлэх
          </Text>
        </TouchableOpacity>

        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
          }}
        />
        {/* Ирсэн ажлын санал */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() => {
            navigation.navigate("ProfilePictureFrame", { photo: data.profile });
          }}
        >
          <SimpleLineIcons name="frame" size={28} color={colors.primaryText} />

          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
          >
            Хүрээ янзлах
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

export default EditStatusModal;

const styles = StyleSheet.create({});
