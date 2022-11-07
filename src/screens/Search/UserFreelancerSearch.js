import { Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "../../../Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserData from "../../components/Search/User/UserData";
import UserContext from "../../context/UserContext";
import { FlashList } from "@shopify/flash-list";
import SearchTextInput from "../../components/SearchTextInput";
import Empty from "../../components/Empty";
import Notfound from "../../components/notfound";
import Loading from "../../components/Loading";
const UserFreelancerSearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(null);
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);

  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);
  const fetchUser = () => {
    setLoading(true);
    const apiURL = `${api}/api/v1/cvs?select=firstName lastName profile workingCompany isApproved profession isFollowing score&organization=false&type=Чөлөөт ажилтан&limit=1000`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        let message = error.message;
        setErrorMessage(message);
        setError(true);
        setLoading(false);
        console.log(message, "=> SearchStack>UserFreelancerSearch.JS");
      });
  };
  const searchFilter = (text) => {
    const newData = masterData.filter((item) => {
      const itemData = item.lastName
        ? item.lastName.toUpperCase()
        : "".toUpperCase();
      item.lastName ? item.lastName.toUpperCase() : "".toUpperCase();
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
  const filtered =
    filterData &&
    filterData.filter((obj) => {
      return obj.id !== state.userId;
    });
  const renderItem = ({ item }) => (
    <UserData
      item={item}
      isFollowing={item.isFollowing}
      status={`${item.profession} ${item.workingCompany}`}
    />
  );
  if (error) {
    return <Notfound message={errorMessage} />;
  }
  return (
    <View style={{ marginTop: insents.top, height: "100%" }}>
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
          marginVertical: 10,
        }}
      />
      {loading ? <Loading back={true} /> : null}
      {filterData.length > 0 ? (
        <FlashList
          data={filtered}
          renderItem={renderItem}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-bold",
                  fontSize: 20,
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}
              >
                Чөлөөт ажилтан хайх
              </Text>
            </>
          }
          ListFooterComponent={<View style={{ marginBottom: 200 }} />}
        />
      ) : (
        <Empty text={"Илэрц олдсонгүй"} />
      )}
    </View>
  );
};

export default UserFreelancerSearch;
