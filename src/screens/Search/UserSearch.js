import { View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "../../../Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserData from "../../components/Search/User/UserData";
import UserContext from "../../context/UserContext";
import SearchTextInput from "../../components/SearchTextInput";
import BigList from "react-native-big-list";
import Loading from "../../components/Loading";
import Notfound from "../../components/notfound";
const UserSearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [error, setError] = useState(null);
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);
  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);
  const fetchUser = () => {
    setLoading(true);
    const apiURL = `${api}/api/v1/cvs?select=firstName lastName profile workingCompany isApproved profession isFollowing score&organization=false&limit=10000&sort=-isApproved -createdAt`;
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
        setErrorMessage(message);
        setLoading(false);
        setError(true);
        console.log(message, "=> SearchStack>UserSearch.JS");
      });
  };
  const searchFilter = (text) => {
    const newData = masterData.filter((item) => {
      const itemData = item.firstName
        ? item.firstName.toUpperCase()
        : "".toUpperCase();
      item.firstName ? item.firstName.toUpperCase() : "".toUpperCase();
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
  const filtered = filterData.filter((obj) => {
    return obj.id !== state.userId;
  });
  const renderItem = ({ item, index }) => (
    <UserData
      item={item}
      isFollowing={item.isFollowing}
      status={`${item.profession} ${item.workingCompany}`}
    />
  );
  const renderFooter = () => <View style={{ marginBottom: 100 }} />;
  if (error) {
    return <Notfound message={errorMessage} />;
  }
  return (
    <View style={{ marginTop: insents.top, height: "100%" }}>
      {loading ? <Loading back={true} /> : null}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
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
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginTop: 10,
        }}
      />
      <BigList
        data={filtered}
        renderItem={renderItem}
        itemHeight={75}
        footerHeight={100}
        renderFooter={renderFooter}
      />
    </View>
  );
};

export default UserSearch;
