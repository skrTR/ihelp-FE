import { StyleSheet, ScrollView, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import Empty from "../../../../components/Empty";
import Cvs from "../../../../components/Cv/Cvs";
// api/v1/applies/id
const CompanyJobCvDetail = (props) => {
  const { id } = props.route.params;
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${api}/api/v1/applies/${id}/job`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {data ? (
        <FlatList
          data={data.sort((a, b) => b.score - a.score)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <Cvs
                item={item.questionnaire}
                needApply={true}
                applyId={item._id}
              />
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 100 }} />}
        />
      ) : (
        <Empty text={"Анкет ирээгүй байна"} />
      )}
    </>
  );
};

export default CompanyJobCvDetail;

const styles = StyleSheet.create({});
