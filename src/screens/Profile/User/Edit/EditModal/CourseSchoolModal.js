import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import ModalHeader from "../../../../../components/ModalHeader";
import { api } from "../../../../../../Constants";

const CourseSchoolModal = (props) => {
  const { schoolModal, setSchoolModal, setCourse, course } = props;
  const { colors } = useTheme();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchCompany();
    return () => {};
  }, []);
  const fetchCompany = () => {
    const apiURL = `${api}/api/v1/schools`;
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
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
        }}
        onPress={() => {
          setSchoolModal(!schoolModal);
          setCourse({
            ...course,
            school: item.name,
            schoolId: item._id,
            schoolPhoto: item.photo,
          });
        }}
      >
        <Image
          source={{ uri: `${api}/upload/${item.photo}` }}
          style={{ width: 50, height: 50, borderRadius: 30 }}
        />
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
  const searchFilter = (text) => {
    const newData = masterData.filter((item) => {
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (text) {
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={schoolModal}
      onRequestClose={() => {
        setSchoolModal(!schoolModal);
      }}
    >
      <View
        style={[
          styles.centeredView,
          { backgroundColor: colors.background, height: "100%" },
        ]}
      >
        <View
          style={[styles.modalView, { backgroundColor: colors.background }]}
        >
          <ModalHeader text="Сургууль" clicked={() => setSchoolModal(false)} />

          <TextInput
            placeholder="Жишээ нь: ihelp"
            value={search}
            onChangeText={(text) => searchFilter(text)}
            style={{
              color: colors.primaryText,
              marginHorizontal: 20,
              paddingVertical: 10,
            }}
            placeholderTextColor={colors.secondaryText}
          />

          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              marginVertical: 10,
            }}
          />
          {filterData.length > 0 ? (
            <FlatList
              data={filterData}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{ marginBottom: 200 }} />}
            />
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                alignItems: "center",
              }}
              onPress={() => {
                setSchoolModal(!schoolModal);
                setCourse({
                  ...course,
                  school: search,
                  schoolPhoto: "building.jpg",
                });
              }}
            >
              <Image
                source={require("../../../../../../assets/logo.png")}
                style={{ width: 50, height: 50, borderRadius: 30 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: colors.primaryText }}>{search}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CourseSchoolModal;

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
