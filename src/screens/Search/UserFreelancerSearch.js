import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "../../../Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserData from "../../components/Search/User/UserData";
import UserContext from "../../context/UserContext";
const UserFreelancerSearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);
  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);
  const fetchUser = () => {
    // const apiURL = `${api}/api/v1/cvs`;
    const apiURL = `${api}/api/v1/cvs?select=firstName lastName profile workingCompany isApproved profession isFollowing score&organization=false&type=Чөлөөт ажилтан&limit=1000`;
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
        <TextInput
          placeholder="Хайх утга"
          value={search}
          onChangeText={(text) => searchFilter(text)}
          placeholderTextColor={"#cccccccc"}
          style={{
            backgroundColor: colors.border,
            padding: 10,
            width: "90%",
            marginLeft: 10,
            borderRadius: 20,
            color: colors.primaryText,
          }}
        />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      {filterData && (
        <FlatList
          data={filtered.sort((a, b) => b.score - a.score)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return <UserData item={item} isFollowing={item.isFollowing} />;
          }}
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
        />
      )}
    </View>
  );
};

export default UserFreelancerSearch;