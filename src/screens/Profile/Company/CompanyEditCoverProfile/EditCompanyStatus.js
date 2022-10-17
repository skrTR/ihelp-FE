import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import SearchByCategory from "../../../../components/Modals/SearchByCategory";
const EditCompanyStatus = (props) => {
  const { profile, name, category } = props.route.params;
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("");
  const [choosedName, setChoosedName] = useState("Салбар сонгох");
  const [refresh, setRefresh] = useState(false);
  const sendCategory = () => {
    axios
      .put(`${api}/api/v1/profiles/${state.companyId}`, {
        category: choosedId,
        categoryName: choosedName,
      })
      .then((res) => {
        navigation.goBack();
        alert("Статус амжилтай солигдлоо");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View>
        <Image
          source={{
            uri: `${api}/upload/${profile}`,
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
          {name}
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginVertical: 5,
            alignItems: "center",
            borderWidth: 1,
            padding: 10,
            borderRadius: 20,
            borderColor: colors.border,
          }}
          onPress={() => setModalVisible(true)}
        >
          {console.log(choosedName, category)}
          <Text style={{ color: colors.primaryText }}>
            {category ? category : choosedName}
          </Text>
        </TouchableOpacity>
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
          Та өөрийн байгууллагын үйл ажиллагааны чиглэлийг сонгон хадгална уу.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: choosedName ? "#FFB6C1" : colors.border,
            padding: 6,
            borderRadius: 20,
            alignSelf: "center",
            marginTop: 20,
          }}
          onPress={sendCategory}
        >
          <Text
            style={{
              fontSize: 18,
              // color: personalCv.profession ? "black" : colors.secondaryText,
              paddingHorizontal: 10,
            }}
          >
            Хадгалах
          </Text>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20 }}>
          {/* Pro pic view */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() =>
              navigation.navigate("CompanyProfilePicture", { photo: profile })
            }
          >
            <SimpleLineIcons
              name="picture"
              size={28}
              color={colors.primaryText}
            />
            <Text
              style={{
                color: colors.primaryText,
                marginLeft: 20,
                fontSize: 18,
              }}
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
        </View>
      </View>
      <SearchByCategory
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setChoosedId={setChoosedId}
        setRefresh={setRefresh}
        setChoosedName={setChoosedName}
      />
    </>
  );
};

export default EditCompanyStatus;

const styles = StyleSheet.create({});
