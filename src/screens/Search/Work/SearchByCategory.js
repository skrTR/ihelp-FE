import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";
const SearchByCategory = (props) => {
  const {
    modalVisible,
    setModalVisible,
    setChoosedId,
    setRefresh,
    setChoosedName,
  } = props;
  const { colors } = useTheme();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);
  const fetchUser = () => {
    const apiURL = `${api}/api/v1/categories?select=id name`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
          width: "100%",
          backgroundColor: colors.background,
        }}
        onPress={() => {
          setRefresh(true);
          setChoosedId(item._id);
          setModalVisible(false);
          setChoosedName(item.name);
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: colors.primaryText }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: colors.border,
          marginVertical: 10,
        }}
      />
    );
  };
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        presentationStyle="formSheet"
      >
        <View style={{ backgroundColor: colors.background, height: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 10,
              backgroundColor: colors.background,
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color={colors.primaryText}
              onPress={() => setModalVisible(false)}
            />
            <TextInput
              placeholder="Хайх утга"
              value={search}
              placeholderTextColor={"#cccccccc"}
              onChangeText={(text) => searchFilter(text)}
              style={{
                backgroundColor: colors.border,
                padding: 10,
                width: "90%",
                marginLeft: 10,
                borderRadius: 10,
              }}
            />
          </View>
          <FlatList
            data={
              filterData &&
              filterData.sort((a, b) => a.name.localeCompare(b.name))
            }
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={{ backgroundColor: colors.background }}
            ListFooterComponent={<View style={{ marginBottom: 200 }} />}
          />
        </View>
      </Modal>
    </View>
  );
};

export default SearchByCategory;

const styles = StyleSheet.create({});
