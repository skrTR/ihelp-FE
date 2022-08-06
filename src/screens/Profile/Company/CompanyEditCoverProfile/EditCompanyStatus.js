import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../../../Constants";
import CategoryModal from "../../../../components/Profile/Company/CategoryModal";
import UserContext from "../../../../context/UserContext";
const EditCompanyStatus = (props) => {
  const { profile, name, category } = props.route.params;

  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState(category);
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    axios
      .get(`${api}/api/v1/categories?limit=1000`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const sendCategory = () => {
    axios
      .put(`${api}/api/v1/profiles/${state.companyId}`, {
        category: categoryId,
      })
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCategories();
  }, []);

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
          onPress={() => setCategoryModal(true)}
        >
          <Text style={{ color: colors.primaryText }}>
            {categoryName ? categoryName : "Сонгох"}
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
          Та дээрх мэдээллийг оруулснаар өөрийгөө бусад хэрэглэгч нарт таниулах
          бөгөөд энэ нь тус платформыг хэрэглэх бүхий л явцад таны нэрний доор
          үзэгдэх болно.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: categoryName ? "#FFB6C1" : colors.border,
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
      <CategoryModal
        category={categories}
        categoryModal={categoryModal}
        setCategoryModal={setCategoryModal}
        setCategoryId={setCategoryId}
        setCategoryName={setCategoryName}
      />
    </>
  );
};

export default EditCompanyStatus;

const styles = StyleSheet.create({});
