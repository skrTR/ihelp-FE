import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { api } from "../../../../../Constants";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../../../../components/Loading";
const UserVerifyScreen = (props) => {
  const { data } = props.route.params;
  const [frontIdCard, setFrontIdCard] = useState();
  const [backIdCard, setBackIdCard] = useState();
  const [selfiePhoto, setSelfiePhoto] = useState();
  const [contractPhoto, setContractPhoto] = useState();

  const navigation = useNavigation();

  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { colors } = useTheme();
  const productCamera1 = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setFrontIdCard(response.uri);
      }
    }
  };
  const productCamera2 = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setBackIdCard(response.uri);
      }
    }
  };
  const productCamera3 = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setSelfiePhoto(response.uri);
      }
    }
  };
  const productCamera4 = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setContractPhoto(response.uri);
      }
    }
  };
  const openImageProfileLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setFrontIdCard(response.uri);
      }
    }
  };
  const openImageProfileLibrary1 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setBackIdCard(response.uri);
      }
    }
  };
  const openImageProfileLibrary2 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setSelfiePhoto(response.uri);
      }
    }
  };
  const openImageProfileLibrary3 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setContractPhoto(response.uri);
      }
    }
  };

  const deleteImage = () => {
    setFrontIdCard(undefined);
  };

  const deleteImage1 = () => {
    setBackIdCard(undefined);
  };

  const deleteImage2 = () => {
    setSelfiePhoto(undefined);
  };

  const deleteImage3 = () => {
    setContractPhoto(undefined);
  };

  const sendVerify = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    if (frontIdCard) {
      const fileExt =
        frontIdCard && frontIdCard.substring(frontIdCard.lastIndexOf(".") + 1);
      formData.append("file1", {
        uri: frontIdCard,
        type: `image/${fileExt}`,
        name: "portf__1",
      });
    }
    if (backIdCard) {
      const fileExt =
        backIdCard && backIdCard.substring(backIdCard.lastIndexOf(".") + 1);
      formData.append("file2", {
        uri: backIdCard,
        type: `image/${fileExt}`,
        name: "portf__2",
      });
    }
    if (selfiePhoto) {
      const fileExt =
        selfiePhoto && selfiePhoto.substring(selfiePhoto.lastIndexOf(".") + 1);
      formData.append("file3", {
        uri: selfiePhoto,
        type: `image/${fileExt}`,
        name: "portf__3",
      });
    }
    if (contractPhoto) {
      const fileExt =
        contractPhoto &&
        contractPhoto.substring(contractPhoto.lastIndexOf(".") + 1);
      formData.append("file4", {
        uri: contractPhoto,
        type: `image/${fileExt}`,
        name: "portf__4",
      });
    }

    xhr.open("PUT", `${api}/api/v1/cvs/auth-photo`);
    xhr.send(formData);
    xhr.onload = function (e) {
      console.log("Request Status", xhr.status);
    };
  };
  const handleUploadComplete = () => {
    setUploadProgress(0);
    setUploadTotal(0);
    navigation.goBack();
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };
  if (uploadTotal > 0) {
    return <Loading />;
  }

  return (
    <ScrollView style={{ marginTop: 20 }}>
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

      <Text
        style={{
          fontSize: 12,
          color: colors.secondaryText,
          fontFamily: "Sf-thin",
          textAlign: "justify",
          marginHorizontal: 15,
          marginVertical: 10,
        }}
      >
        Тайлбар: Та өөрийн хаягийг баталгажуулснаар цаашид ihelp платформыг
        ашиглахад нэмэлт давуу талууд танд үүсэх болно. Жишээ нь: Танд итгэж буй
        ажил олгогч нар санал тавих нь нэмэгдэх, хайлтанд дээгүүр үзэгдэх,
        бусдад санал болгогдох зэрэг платформыг бүрэн хэмжээнд ашиглах нөхцөл
        бүрдэнэ.
      </Text>
      {/* Front card  */}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />
      <Text
        style={{
          color: colors.primaryText,
          fontSize: 18,
          marginBottom: 10,
          marginLeft: 15,
        }}
      >
        Хүсэлт илгээх
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        1. Иргэний үнэмлэх (Урд тал)
      </Text>
      <TouchableOpacity
        onPress={openImageProfileLibrary}
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {frontIdCard ? (
          <ImageBackground
            source={{
              uri: frontIdCard,
            }}
            style={{ width: "100%", height: 200 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color="white"
              style={{ alignSelf: "flex-end" }}
              onPress={deleteImage}
            />
          </ImageBackground>
        ) : (
          <AntDesign
            name="camerao"
            size={30}
            color={"black"}
            style={{ marginTop: 80 }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={productCamera1}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг дарах
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageProfileLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг сонгох
          </Text>
        </TouchableOpacity>
      </View>

      {/* Front card end */}

      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />
      {/* back card  */}
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        2. Иргэний үнэмлэх (Ард тал)
      </Text>
      <TouchableOpacity
        onPress={openImageProfileLibrary}
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {backIdCard ? (
          <ImageBackground
            source={{
              uri: backIdCard,
            }}
            style={{ width: "100%", height: 200 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color="white"
              style={{ alignSelf: "flex-end" }}
              onPress={deleteImage1}
            />
          </ImageBackground>
        ) : (
          <AntDesign
            name="camerao"
            size={30}
            color={"black"}
            style={{ marginTop: 80 }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={productCamera2}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг дарах
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageProfileLibrary1}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг сонгох
          </Text>
        </TouchableOpacity>
      </View>
      {/* back card end */}
      {/* сэлфиэ camera */}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />
      {/* selfie  */}
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        3. Иргэний үнэмлэхийн хамт selfie зураг
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
          fontSize: 12,
        }}
      >
        Тайлбар: Иргэний үнэмлэхээ гартаа барин камер луу харуулан өөрийн selfie
        зургийг авч илгээх
      </Text>
      <TouchableOpacity
        onPress={openImageProfileLibrary}
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {selfiePhoto ? (
          <ImageBackground
            source={{
              uri: selfiePhoto,
            }}
            style={{ width: "100%", height: 200 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color="white"
              style={{ alignSelf: "flex-end" }}
              onPress={deleteImage2}
            />
          </ImageBackground>
        ) : (
          <AntDesign
            name="camerao"
            size={30}
            color={"black"}
            style={{ marginTop: 80 }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={productCamera3}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг дарах
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageProfileLibrary2}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг сонгох
          </Text>
        </TouchableOpacity>
      </View>
      {/* selfie end */}
      {/* Back Camera End */}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />
      {/* Өргөдөл */}
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        4. Гараар бичсэн өргөдөл
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
          fontSize: 12,
        }}
      >
        Тайлбар: Та дараах байдлаар өргөдлөө цаасан дээр бичин түүний дараагаар
        зургийг нь дарж илгээнэ үү.
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          fontFamily: "Sf-thin",
          fontSize: 12,
        }}
      >
        Жишээ нь:
      </Text>
      <View
        style={{
          backgroundColor: "white",
          marginVertical: 10,
          paddingVertical: 10,
          paddingBottom: 15,
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 10,
          borderColor: colors.border,
        }}
      >
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Новелист ХХК-д
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            marginLeft: 30,
          }}
        >
          Өргөдөл гаргах нь:
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            textAlign: "justify",
            marginHorizontal: 30,
          }}
        >
          {"     "}Миний бие ........ овогтой ....... нь (Регистерийн Nº:
          ............) Новелист ХХК-ийн ihelp платформын үйлчилгээний нөхцөлтөй
          танилцаж ойлгосон бөгөөд өөрийн үүсгэсэн хаяг түүнтэй холбоотойгоор
          илгээж буй материалуудын үнэн зөв байдлыг хариуцна. Иймд миний хаягийг
          баталгаажуулж албан ёсны болгож өгнө үү.
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            marginHorizontal: 30,
            textAlign: "right",
          }}
        >
          Өргөдөл гаргасан: (гарын үсэг)
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            marginHorizontal: 30,
            textAlign: "right",
          }}
        >
          Огноо: (Жил.Сар.Өдөр)
        </Text>
      </View>
      <TouchableOpacity
        onPress={openImageProfileLibrary}
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {contractPhoto ? (
          <ImageBackground
            source={{
              uri: contractPhoto,
            }}
            style={{ width: "100%", height: 200 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color="white"
              style={{ alignSelf: "flex-end" }}
              onPress={deleteImage3}
            />
          </ImageBackground>
        ) : (
          <AntDesign
            name="camerao"
            size={30}
            color={"black"}
            style={{ marginTop: 80 }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={productCamera4}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг дарах
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageProfileLibrary3}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Зураг сонгох
          </Text>
        </TouchableOpacity>
      </View>
      {/* Өргөдөл end*/}
      {/* Илгээх */}
      <TouchableOpacity
        onPress={sendVerify}
        style={{
          borderRadius: 10,
          paddingVertical: 10,
          marginBottom: 20,
          marginHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          paddingHorizontal: 20,
          backgroundColor: "#FFB6C1",
        }}
      >
        <Text style={{ color: "black", textAlign: "center" }}> Илгээх </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserVerifyScreen;

const styles = StyleSheet.create({});
