import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import EmployeeData from "../../components/Search/Company/EmployeeData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserContext from "../../context/UserContext";
import SearchByCategory from "./Work/SearchByCategory";
import SearchTextInput from "../../components/SearchTextInput";
import Notfound from "../../components/notfound";
import { FlashList } from "@shopify/flash-list";
import Loading from "../../components/Loading";
import Empty from "../../components/Empty";
const EmployerSearch = () => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("undefined");
  const [choosedName, setChoosedName] = useState("Салбар сонгох");
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(null);
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insents = useSafeAreaInsets();
  useEffect(() => {
    setRefresh(false);
    fetchCompany();
    return () => {};
  }, [refresh]);
  const fetchCompany = () => {
    const apiURL = `${api}/api/v1/profiles?select=firstName profile categoryName organization isEmployer isEmployee isApproved isEmployerSpecial&limit=1000&isEmployee=true&sort=-special -createdAt${
      choosedId === "undefined" ? "" : `&category=${choosedId}`
    }`;
    setLoading(true);
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        let message = error.message;
        setLoading(false);
        setErrorMessage(message);
        setError(true);
        console.log(message, "EmployeeSearch -> searchStack");
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : "".toUpperCase();
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
  const renderItem = ({ item }) => (
    <EmployeeData item={item} isFollowing={item.isFollowing} />
  );
  if (error) {
    return <Notfound message={errorMessage} />;
  }
  return (
    <>
      <View style={{ marginTop: insents.top, height: "100%" }}>
        {loading ? <Loading /> : null}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <AntDesign
            name="left"
            size={24}
            color={colors.primaryText}
            onPress={() => navigation.goBack()}
          />
          <SearchTextInput searchFilter={searchFilter} search={search} />
        </View>

        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.border,
            marginTop: 10,
            marginHorizontal: 10,
            backgroundColor:
              choosedName === "Салбар сонгох"
                ? colors.background
                : colors.border,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            {choosedName}
          </Text>
        </TouchableOpacity>
        {filterData.length > 0 ? (
          <FlashList
            data={filterData}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            ListFooterComponent={<View style={{ marginBottom: 200 }} />}
            renderItem={renderItem}
            ListHeaderComponent={
              <>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-bold",
                    fontSize: 20,
                    marginHorizontal: 10,
                    marginVertical: 20,
                  }}
                >
                  Ажил олгогч байгууллага
                </Text>
              </>
            }
          />
        ) : (
          <Empty text="Илэрх олдсонгүй" />
        )}
      </View>
      <SearchByCategory
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setChoosedId={setChoosedId}
        setRefresh={setRefresh}
        setChoosedName={setChoosedName}
      />
    </>
  );
};

export default EmployerSearch;

const styles = StyleSheet.create({});
