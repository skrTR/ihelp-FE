import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import SpecialCompany from "../../components/Employer/SpecialCompany";
import axios from "axios";
import { api } from "../../../Constants";

const EmployerCompanyScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const getData = () => {
    setLoading(true);
    axios
      .get(
        `${api}/api/v1/profiles?select=firstName jobNumber isApproved profile isEmployer isEmployee isFollowing categoryName special&limit=10&sort=-special -createdAt&page=${currentPage}`
      )
      .then((result) => {
        setData([...data, ...result.data.data]);
        setLoading(false);
        setMaxPage(result.data.pagination.pageCount);
        console.log(result.data.pagination);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, [currentPage]);
  const renderLoader = () => {
    return (
      <View style={{ marginBottom: 100 }}>
        {loading ? <ActivityIndicator size="large" color="#FFB6C1" /> : null}
      </View>
    );
  };
  const loadMoreItem = () => {
    if (maxPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        return <SpecialCompany data={item} isFollowing={item.isFollowing} />;
      }}
      ListFooterComponent={renderLoader}
      onEndReachedThreshold={0}
      onEndReached={loadMoreItem}
    />
  );
};

export default EmployerCompanyScreen;

const styles = StyleSheet.create({});
