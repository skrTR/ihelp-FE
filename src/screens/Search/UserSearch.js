import {
  Text,
  View,
  FlatList,
  TextInput,
  useColorScheme,
  Animated,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "../../../Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserData from "../../components/Search/User/UserData";
import UserContext from "../../context/UserContext";
import SearchTextInput from "../../components/SearchTextInput";
const UserSearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);
  const colorScheme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);
  const fetchUser = () => {
    // const apiURL = `${api}/api/v1/cvs`;
    const apiURL = `${api}/api/v1/cvs?select=firstName lastName profile workingCompany isApproved profession isFollowing score&organization=false&limit=1000`;
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
  const filtered = filterData.filter((obj) => {
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
        <SearchTextInput searchFilter={searchFilter} search={search} />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      {filterData.length > 0 && (
        <Animated.FlatList
          data={filtered.sort((a, b) => b.score - a.score)}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            const inputRange = [-1, 0, 80 * index, 80 * (index + 2)];
            const opacityInputRange = [-1, 0, 80 * index, 80 * (index + 2)];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Animated.View style={{ transform: [{ scale }], opacity }}>
                <UserData
                  item={item}
                  isFollowing={item.isFollowing}
                  status={`${item.profession} ${item.workingCompany}`}
                />
              </Animated.View>
            );
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
                Хэрэглэгч хайх
              </Text>
            </>
          }
          ListFooterComponent={<View style={{ marginBottom: 200 }} />}
        />
      )}
    </View>
  );
};

export default UserSearch;
