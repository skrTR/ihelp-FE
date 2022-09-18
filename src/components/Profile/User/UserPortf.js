import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { api } from "../../../../Constants";
const fullWidth = Dimensions.get("screen").width;

const UserPortf = (props) => {
  const { image1, image2, image3, image4, image5, image6 } = props;
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: "Sf-bold",
            fontSize: 20,
            right: 5,
          }}
        >
          Хэрэглэгчийн портфолиа
        </Text>
        <SimpleLineIcons
          name="pencil"
          size={24}
          color={colors.primaryText}
          style={{}}
          onPress={() => navigation.navigate("UserPortfolio")}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ViewPortfolio", {
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
          })
        }
      >
        {image1 && image2 && image3 && image4 && image5 && image6 ? (
          <>
            {/* Бүгд */}
            {/* Portfolia 1-3*/}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image1}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image3}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
            </View>
            {/* Portfolia 3-6*/}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginTop: 3,
                marginBottom: 15,
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image4}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image5}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image6}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
            </View>
          </>
        ) : image1 && image2 && image3 && image4 && image5 ? (
          <>
            {/* 5зурагтай портфолио */}
            {/* Portfolia 1-3*/}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image1}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image3}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
            </View>
            {/* Portfolia 3-5*/}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginTop: 3,
                marginBottom: 15,
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image4}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image5}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
            </View>
          </>
        ) : image1 && image2 && image3 && image4 ? (
          <>
            {/* 4зурагтай портфолио */}
            {/* Portfolia 1-2*/}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image1}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
            </View>
            {/* Portfolia 3-4*/}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginTop: 3,
                marginBottom: 15,
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image3}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image4}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
            </View>
          </>
        ) : image1 && image2 && image3 ? (
          <>
            {/* 3зурагтай портфолио */}
            {/* Portfolia 1-2*/}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image1}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image3}` }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              />
            </View>
          </>
        ) : image1 && image2 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginTop: 3,
                marginBottom: 15,
              }}
            >
              <Image
                source={{ uri: `${api}/upload/${image1}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 2.1, height: 140, flex: 0.498 }}
              />
            </View>
          </>
        ) : image1 ? (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{ uri: `${api}/upload/${image1}` }}
              style={{ width: fullWidth, height: 300, flex: 1 }}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </>
  );
};

export default UserPortf;

const styles = StyleSheet.create({});
