import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import ResultedCompanyData from "../../../components/Search/Company/ResultedCompanyData";
import Empty from "../../../components/Empty";
const ResultedCompanyModal = (props) => {
  const { occupationId, typeName } = props.route.params;
  const [data, setData] = useState([]);
  const getCompany = () => {
    axios
      .get(
        `${api}/api/v1/profiles?category=${occupationId}${
          typeName === "Ажил хийе" ? `&isEmployer=true` : ""
        }${typeName === "Ажил өгье" ? `&isEmployee=true` : ""}`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCompany();
  }, []);
  return (
    <View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <ResultedCompanyData
                item={item}
                isFollowing={item.isFollowing}
                typeName={typeName && typeName}
              />
            );
          }}
        />
      ) : (
        <Empty text="Таны хайсан салбарын профайл байхгүй байна" />
      )}
    </View>
  );
};

export default ResultedCompanyModal;

const styles = StyleSheet.create({});
