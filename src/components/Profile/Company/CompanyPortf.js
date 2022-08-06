import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { api } from "../../../../Constants";
const fullWidth = Dimensions.get("screen").width;

const CompanyPortf = (props) => {
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
          }}
        >
          Компанийн портфолиа
        </Text>
        <SimpleLineIcons
          name="pencil"
          size={24}
          color={colors.primaryText}
          style={{}}
          onPress={() => navigation.navigate("CompanyPortfolia")}
        />
      </View>

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
  );
};

export default CompanyPortf;

const styles = StyleSheet.create({});
