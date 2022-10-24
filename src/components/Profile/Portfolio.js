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
import { api } from "../../../Constants";
const fullWidth = Dimensions.get("screen").width;

const Portfolio = (props) => {
  const { image1, image2, image3, image4, image5, image6, isCompany, isUser } =
    props;
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
          Зурагт танилцуулга
        </Text>
        {isCompany ? (
          <SimpleLineIcons
            name="pencil"
            size={24}
            color={colors.primaryText}
            style={{}}
            onPress={() => navigation.navigate("PortfolioDetail")}
          />
        ) : null}
        {isUser ? (
          <SimpleLineIcons
            name="pencil"
            size={24}
            color={colors.primaryText}
            style={{}}
            onPress={() => navigation.navigate("PortfolioDetail")}
          />
        ) : null}
      </View>
      {/* Дангаараа байгаа зураг */}
      {image2 === "1" &&
        image3 === "1" &&
        image4 === "1" &&
        image5 === "1" &&
        image6 === "1" &&
        image1 !== "1" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewPortfolio", {
                image1: image1,
              })
            }
          >
            <Image
              source={{ uri: `${api}/upload/${image1}` }}
              style={styles.imageStyle1}
            />
          </TouchableOpacity>
        )}
      {/* 2 байгаа зураг */}
      {image3 === "1" &&
        image4 === "1" &&
        image5 === "1" &&
        image6 === "1" &&
        image1 !== "1" &&
        image2 !== "1" && (
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("ViewPortfolio", {
                image1: image1,
                image2: image2,
              })
            }
          >
            <Image
              source={{ uri: `${api}/upload/${image1}` }}
              style={styles.imageStyle2}
            />
            <Image
              source={{ uri: `${api}/upload/${image2}` }}
              style={styles.imageStyle2}
            />
          </TouchableOpacity>
        )}
      {/* 3 байгаа зураг */}
      {image4 === "1" &&
        image5 === "1" &&
        image6 === "1" &&
        image1 !== "1" &&
        image2 !== "1" &&
        image3 !== "1" && (
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("ViewPortfolio", {
                image1: image1,
                image2: image2,
                image3: image3,
              })
            }
          >
            <Image
              source={{ uri: `${api}/upload/${image1}` }}
              style={styles.imageStyle3}
            />
            <Image
              source={{ uri: `${api}/upload/${image2}` }}
              style={styles.imageStyle3}
            />
            <Image
              source={{ uri: `${api}/upload/${image3}` }}
              style={styles.imageStyle3}
            />
          </TouchableOpacity>
        )}
      {/* 4 байгаа зураг */}
      {image5 === "1" &&
        image6 === "1" &&
        image1 !== "1" &&
        image2 !== "1" &&
        image3 !== "1" &&
        image4 !== "1" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewPortfolio", {
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,
              })
            }
            style={{ flexDirection: "row" }}
          >
            <Image
              source={{ uri: `${api}/upload/${image1}` }}
              style={{ width: fullWidth / 3, height: 260 }}
            />
            <View>
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image3}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
            </View>
            <Image
              source={{ uri: `${api}/upload/${image4}` }}
              style={{ width: fullWidth / 3, height: 260 }}
            />
          </TouchableOpacity>
        )}
      {/* 5 байгаа зураг */}
      {image6 === "1" &&
        image1 !== "1" &&
        image2 !== "1" &&
        image3 !== "1" &&
        image4 !== "1" &&
        image5 !== "1" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewPortfolio", {
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,
                image5: image5,
              })
            }
            style={{ flexDirection: "row" }}
          >
            <Image
              source={{ uri: `${api}/upload/${image1}` }}
              style={{ width: fullWidth / 3, height: 260 }}
            />
            <View>
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image3}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
            </View>
            <View>
              <Image
                source={{ uri: `${api}/upload/${image4}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image5}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
            </View>
          </TouchableOpacity>
        )}
      {/* 6 байгаа зураг */}
      {image6 !== "1" &&
        image1 !== "1" &&
        image2 !== "1" &&
        image3 !== "1" &&
        image4 !== "1" &&
        image5 !== "1" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewPortfolio", {
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,
                image5: image5,
                image6: image6,
              })
            }
            style={{ flexDirection: "row" }}
          >
            <View>
              <Image
                source={{ uri: `${api}/upload/${image1}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image2}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
            </View>
            <View>
              <Image
                source={{ uri: `${api}/upload/${image3}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image4}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
            </View>
            <View>
              <Image
                source={{ uri: `${api}/upload/${image5}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
              <Image
                source={{ uri: `${api}/upload/${image6}` }}
                style={{ width: fullWidth / 3, height: 130 }}
              />
            </View>
          </TouchableOpacity>
        )}
    </>
  );
};

export default Portfolio;

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
