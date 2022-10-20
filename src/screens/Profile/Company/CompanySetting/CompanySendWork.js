import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import Empty from "../../../../components/Empty";

const CompanySendWork = () => {
  const state = useContext(UserContext);
  const [cvData, setCvData] = useState([]);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const getCvData = () => {
    axios
      .get(`${api}/api/v1/invitations/${state.companyId}/sent`)
      .then((res) => {
        setCvData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCvData();
  }, []);
  return (
    <ScrollView>
      {cvData.length > 0 ? (
        cvData.map((e) => {
          return (
            <View
              style={{
                backgroundColor: "#454545",
                marginHorizontal: 10,
                paddingVertical: 15,
                marginVertical: 4,
                borderRadius: 10,
              }}
              key={e._id}
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
                    navigation.navigate("RecievedJobDetail", {
                      id: e._id,
                      owner: true,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `${api}/upload/${e.profile}`,
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
                      }}
                    >
                      {e.occupation}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                      }}
                    >
                      {e.lastName} овогтой {e.firstName}
                    </Text>
                    <Text
                      style={{
                        paddingVertical: 5,
                        color: colors.primaryText,
                        fontFamily: "Sf-thin",
                        fontSize: 14,
                      }}
                    >
                      Ажлын хөлс: {e.salary}₮
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{}}>
                  <Text
                    style={{
                      color:
                        e.approveStatus === "Зөвшөөрсөн"
                          ? "green"
                          : e.approveStatus === "Зөвшөөрөөгүй"
                          ? "red"
                          : colors.primaryText,
                      width: "100%",
                      textAlign: "center",
                      fontSize: 10,
                      marginRight: 20,
                    }}
                  >
                    {e.approveStatus}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <Empty text="Та ажлын санал илгээгүй байна" />
      )}
    </ScrollView>
  );
};

export default CompanySendWork;

const styles = StyleSheet.create({});
