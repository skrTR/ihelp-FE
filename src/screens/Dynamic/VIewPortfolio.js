import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { api } from "../../../Constants";
import PagerView from "react-native-pager-view";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
const ViewPortfolio = (props) => {
  const { image1, image2, image3, image4, image5, image6 } = props.route.params;
  const [pageIndex, setPageIndex] = useState(0);
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        name="close"
        size={30}
        color={colors.primaryText}
        style={{ alignSelf: "flex-end", marginRight: 10 }}
        onPress={() => navigation.goBack()}
      />

      <PagerView
        initialPage={0}
        style={{ flex: 1 }}
        onPageSelected={(e) => {
          setPageIndex(e.nativeEvent.position);
        }}
      >
        <View key={"1"}>
          <Image
            source={{ uri: `${api}/upload/${image1}` }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View key={"2"}>
          <Image
            source={{ uri: `${api}/upload/${image2}` }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View key={"3"}>
          <Image
            source={{ uri: `${api}/upload/${image3}` }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View key={"4"}>
          <Image
            source={{ uri: `${api}/upload/${image4}` }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View key={"5"}>
          <Image
            source={{ uri: `${api}/upload/${image5}` }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View key={"6"}>
          <Image
            source={{ uri: `${api}/upload/${image6}` }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
      </PagerView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {pageIndex + 1}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewPortfolio;

const styles = StyleSheet.create({});
