import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Loading from "../Loading";
const fullWidth = Dimensions.get("screen").width;
const PortfolioDetail = () => {
  const [data, setData] = useState(null);
  const navigation = useNavigation();
  const [portfolioImage1, setPortfolioImage1] = useState();
  const [portfolioImage2, setPortfolioImage2] = useState();
  const [portfolioImage3, setPortfolioImage3] = useState();
  const [portfolioImage4, setPortfolioImage4] = useState();
  const [portfolioImage5, setPortfolioImage5] = useState();
  const [portfolioImage6, setPortfolioImage6] = useState();
  const [uploadTotal, setUploadTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const state = useContext(UserContext);
  const { colors } = useTheme();
  let isMounted = true;
  const loadCompanyProfile = () => {
    axios
      .get(
        `${api}/api/v1/cvs/${
          state.isCompany ? state.companyId : state.userId
        }?select=portfolio`
      )
      .then((res) => {
        if (isMounted) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Image picker1
  const openPortfolioImage1 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!response.cancelled) {
        setPortfolioImage1(response.uri);
      }
    }
  };
  // Image picker2
  const openPortfolioImage2 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!response.cancelled) {
        setPortfolioImage2(response.uri);
      }
    }
  };
  // Image picker3
  const openPortfolioImage3 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!response.cancelled) {
        setPortfolioImage3(response.uri);
      }
    }
  };
  // Image picker4
  const openPortfolioImage4 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!response.cancelled) {
        setPortfolioImage4(response.uri);
      }
    }
  };
  // Image picker5
  const openPortfolioImage5 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!response.cancelled) {
        setPortfolioImage5(response.uri);
      }
    }
  };
  // Image picker6
  const openPortfolioImage6 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!response.cancelled) {
        setPortfolioImage6(response.uri);
      }
    }
  };
  // Backend dahi zurgiig ustgah
  const deletePortfolio = (item) => {
    Alert.alert(
      ``,
      `Зураг номер ${item.slice(4, 5)} устгахдаа итгэлтэй байна уу?`,
      [
        {
          text: "Үгүй",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            var url = `${api}/api/v1/cvs/portfolio`;
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", url);
            const formData = new FormData();
            formData.append(`${item}`, "A");
            xhr.send(formData);
            xhr.onload = function (e) {
              console.log("Request Status", xhr.status);
              if (xhr.status === 200) {
                setRefresh(true);
                Alert.alert("Амжилтай устлаа");
              }
            };
          },
        },
      ]
    );
  };
  // Backend luu yavuulah
  const sendNetworkingPost = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    if (portfolioImage1) {
      const fileExt =
        portfolioImage1 &&
        portfolioImage1.substring(portfolioImage1.lastIndexOf(".") + 1);
      formData.append("file1", {
        uri: portfolioImage1,
        type: `image/${fileExt}`,
        name: "portf__1",
      });
    }
    if (portfolioImage2) {
      const fileExt =
        portfolioImage2 &&
        portfolioImage2.substring(portfolioImage2.lastIndexOf(".") + 1);
      formData.append("file2", {
        uri: portfolioImage2,
        type: `image/${fileExt}`,
        name: "portf__2",
      });
    }
    if (portfolioImage3) {
      const fileExt =
        portfolioImage3 &&
        portfolioImage3.substring(portfolioImage3.lastIndexOf(".") + 1);
      formData.append("file3", {
        uri: portfolioImage3,
        type: `image/${fileExt}`,
        name: "portf__3",
      });
    }
    if (portfolioImage4) {
      const fileExt =
        portfolioImage4 &&
        portfolioImage4.substring(portfolioImage4.lastIndexOf(".") + 1);
      formData.append("file4", {
        uri: portfolioImage4,
        type: `image/${fileExt}`,
        name: "portf__4",
      });
    }
    if (portfolioImage5) {
      const fileExt =
        portfolioImage5 &&
        portfolioImage5.substring(portfolioImage5.lastIndexOf(".") + 1);
      formData.append("file5", {
        uri: portfolioImage5,
        type: `image/${fileExt}`,
        name: "portf__5",
      });
    }
    if (portfolioImage6) {
      const fileExt =
        portfolioImage6 &&
        portfolioImage6.substring(portfolioImage6.lastIndexOf(".") + 1);
      formData.append("file6", {
        uri: portfolioImage6,
        type: `image/${fileExt}`,
        name: "portf__6",
      });
    }
    xhr.open("PUT", `${api}/api/v1/cvs/portfolio`);
    xhr.send(formData);
    xhr.onload = function (e) {
      console.log("Request Status", xhr.status);
      if (xhr.status === 200) {
        Alert.alert("Амжилтай хадгалагдлаа");
      }
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

  useEffect(() => {
    loadCompanyProfile();
    setRefresh(false);
    return () => {
      isMounted = false;
    };
  }, [refresh]);
  if (uploadTotal > 0) {
    return <Loading />;
  }
  if (!data) {
    return null;
  }
  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        {/* 1,4 */}
        <View>
          {/* 1 */}
          {data.portfolio.image1 !== "1" ? (
            <ImageBackground
              source={{ uri: `${api}/upload/${data.portfolio.image1}` }}
              style={{ width: fullWidth / 3, height: 130 }}
            >
              <AntDesign
                name="delete"
                size={24}
                color={"#FFB6C1"}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: colors.border,
                  padding: 5,
                }}
                onPress={() => deletePortfolio("file1")}
              />
            </ImageBackground>
          ) : portfolioImage1 ? (
            <ImageBackground
              source={{ uri: portfolioImage1 }}
              style={{ width: fullWidth / 3, height: 130 }}
            >
              <AntDesign
                name="delete"
                size={24}
                color={"#FFB6C1"}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: colors.border,
                  padding: 5,
                }}
                onPress={() => setPortfolioImage1(undefined)}
              />
            </ImageBackground>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                width: fullWidth / 3,
                height: 130,
                borderColor: colors.border,
              }}
              onPress={openPortfolioImage1}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-thin",
                }}
              >
                Зураг оруулах
              </Text>
              <Entypo name="image" size={34} color={colors.primaryText} />
            </TouchableOpacity>
          )}
          {/* 4 */}
          {data.portfolio.image4 !== "1" ? (
            <ImageBackground
              source={{ uri: `${api}/upload/${data.portfolio.image4}` }}
              style={{ width: fullWidth / 3, height: 130 }}
            >
              <AntDesign
                name="delete"
                size={24}
                color={"#FFB6C1"}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: colors.border,
                  padding: 5,
                }}
                onPress={() => deletePortfolio("file4")}
              />
            </ImageBackground>
          ) : portfolioImage4 ? (
            <ImageBackground
              source={{ uri: portfolioImage4 }}
              style={{ width: fullWidth / 3, height: 130 }}
            >
              <AntDesign
                name="delete"
                size={24}
                color={"#FFB6C1"}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: colors.border,
                  padding: 5,
                }}
                onPress={() => setPortfolioImage4(undefined)}
              />
            </ImageBackground>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                width: fullWidth / 3,
                height: 130,
                borderColor: colors.border,
              }}
              onPress={openPortfolioImage4}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-thin",
                }}
              >
                Зураг оруулах
              </Text>
              <Entypo name="image" size={34} color={colors.primaryText} />
            </TouchableOpacity>
          )}
        </View>
        {/* 2,5 */}
        <View>
          {/* 2 */}
          <>
            {data.portfolio.image2 !== "1" ? (
              <ImageBackground
                source={{ uri: `${api}/upload/${data.portfolio.image2}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => deletePortfolio("file2")}
                />
              </ImageBackground>
            ) : portfolioImage2 ? (
              <ImageBackground
                source={{ uri: portfolioImage2 }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => setPortfolioImage2(undefined)}
                />
              </ImageBackground>
            ) : (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  width: fullWidth / 3,
                  height: 130,
                  borderColor: colors.border,
                }}
                onPress={openPortfolioImage2}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            )}
          </>
          {/* 5 */}
          <>
            {data.portfolio.image5 !== "1" ? (
              <ImageBackground
                source={{ uri: `${api}/upload/${data.portfolio.image5}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => deletePortfolio("file5")}
                />
              </ImageBackground>
            ) : portfolioImage5 ? (
              <ImageBackground
                source={{ uri: portfolioImage5 }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => setPortfolioImage5(undefined)}
                />
              </ImageBackground>
            ) : (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  width: fullWidth / 3,
                  height: 130,
                  borderColor: colors.border,
                }}
                onPress={openPortfolioImage5}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            )}
          </>
        </View>
        {/* 3,6 */}
        <View>
          {/* 3 */}
          <>
            {data.portfolio.image3 !== "1" ? (
              <ImageBackground
                source={{ uri: `${api}/upload/${data.portfolio.image3}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => deletePortfolio("file3")}
                />
              </ImageBackground>
            ) : portfolioImage3 ? (
              <ImageBackground
                source={{ uri: portfolioImage3 }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => setPortfolioImage3(undefined)}
                />
              </ImageBackground>
            ) : (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  width: fullWidth / 3,
                  height: 130,
                  borderColor: colors.border,
                }}
                onPress={openPortfolioImage3}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            )}
          </>
          {/* 6 */}
          <>
            {data.portfolio.image6 !== "1" ? (
              <ImageBackground
                source={{ uri: `${api}/upload/${data.portfolio.image6}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => deletePortfolio("file6")}
                />
              </ImageBackground>
            ) : portfolioImage6 ? (
              <ImageBackground
                source={{ uri: portfolioImage6 }}
                style={{ width: fullWidth / 3, height: 130 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={"#FFB6C1"}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.border,
                    padding: 5,
                  }}
                  onPress={() => setPortfolioImage6(undefined)}
                />
              </ImageBackground>
            ) : (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  width: fullWidth / 3,
                  height: 130,
                  borderColor: colors.border,
                }}
                onPress={openPortfolioImage6}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            )}
          </>
        </View>
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#FFB6C1",
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
        onPress={sendNetworkingPost}
      >
        <Text style={{ color: "black" }}>Хадгалах</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PortfolioDetail;

const styles = StyleSheet.create({
  imageStyle1: {
    width: fullWidth,
    height: 200,
  },
  imageStyle2: {
    width: fullWidth / 2,
    height: 200,
  },
  imageStyle3: { width: fullWidth / 3, height: 200 },
});
