import { SafeAreaView, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import Cvs from "../../components/Cv/Cvs";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
const SortResultModal = (props) => {
  const { salary, education, experience, gender } = props.route.params;
  const { colors } = useTheme();
  const [cvs, setCvs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getWorkSearch = () => {
    axios
      .get(
        `${api}/api/v1/questionnaires?limit=1000${
          salary ? `&salary=${salary}` : ""
        }${education ? `&education=${education}` : ""}${
          experience ? `&experience=${experience}` : ""
        }${gender ? `&gender=${gender}` : ""}`
      )
      .then((res) => {
        setCvs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setRefresh(false);
    getWorkSearch();
  }, [refresh]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#141414" }}>
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          {cvs.length > 0 ? (
            <FlatList
              data={cvs.sort((a, b) => b.score - a.score)}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return <Cvs item={item} />;
              }}
              ListFooterComponent={<View style={{ marginBottom: 100 }} />}
            />
          ) : (
            <View>
              <Empty text="Таны хайсан ажлын байр одоогоор байхгүй байна" />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SortResultModal;
