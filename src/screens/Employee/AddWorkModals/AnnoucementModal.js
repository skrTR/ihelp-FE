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
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";

const OccupationModal = (props) => {
  const {
    occupationModal,
    setOccupationModal,
    setOccupationName,
    checkOccupation,
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
    const apiURL = `${api}/api/v1/occupations?select=name`;
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
        }}
        onPress={() => {
          setOccupationName(item.name);
          checkOccupation(item._id);
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
    <Modal
      animationType="slide"
      visible={occupationModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setOccupationModal(!occupationModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Мэргэжил"
          clicked={() => setOccupationModal(false)}
        />
        <TextInput
          placeholder="Хайх утга..."
          value={search}
          onChangeText={(text) => searchFilter(text)}
          style={{
            backgroundColor: colors.border,
            padding: 10,
            borderRadius: 20,
            marginBottom: 10,
            marginHorizontal: 10,
            color: colors.primaryText,
          }}
          placeholderTextColor={"#cccccccc"}
        />
        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={filterData}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            ListFooterComponent={<View style={{ marginBottom: 200 }} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OccupationModal;

const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 15,
    padding: 10,
    fontFamily: "Sf-bold",
  },
  border: {
    borderWidth: 1,
  },
});
