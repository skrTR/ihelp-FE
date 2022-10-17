import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import Empty from "../../../../components/Empty";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
const UserRecievedJob = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [work, setWork] = useState([]);
  const getWorkRequest = () => {
    axios
      .get(`${api}/api/v1/invitations/${state.userId}/cv`)
      .then((res) => {
        setWork(res.data.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  useEffect(() => {
    getWorkRequest();
  }, []);

  return (
    <View>
      {work.length === 0 ? (
        <Empty text={"Танд ажлын санал ирээгүй байна"} />
      ) : (
        <FlatList
          data={work}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={{
                    backgroundColor: colors.background,
                    marginHorizontal: 10,
                    paddingVertical: 5,
                    marginVertical: 4,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        navigation.navigate("UserRecievedJobDetail", {
                          id: item._id,
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: `${api}/upload/${item.profile}`,
                        }}
                        style={{
                          width: 75,
                          height: 75,
                          borderRadius: 30,
                          marginHorizontal: 5,
                        }}
                      />

                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.primaryText,
                            fontFamily: "Sf-bold",
                            fontWeight: "bold",
                            width: "95%",
                          }}
                        >
                          {item.firstName}
                        </Text>

                        <Text
                          style={{
                            paddingVertical: 5,
                            color: colors.primaryText,
                            fontFamily: "Sf-thin",
                            fontSize: 14,
                          }}
                        >
                          Цалин: {item.salary}₮
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontFamily: "Sf-regular",
                            fontWeight: "200",
                          }}
                        >
                          Мэргэжил: {item.occupation}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        />
      )}
    </View>
  );
};

export default UserRecievedJob;

const styles = StyleSheet.create({});
