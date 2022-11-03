import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import CompanyHeader from "../../components/Header/CompanyHeader";
import { api } from "../../../Constants";
import Cvs from "../../components/Cv/Cvs";
import UserContext from "../../context/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const CvScreen = () => {
  const [cvData, setCvData] = useState([]);
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [point, setPoint] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState();
  const insents = useSafeAreaInsets();
  let isMounted = true;
  const getPermision = () => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=point`)
      .then((res) => {
        if (isMounted) {
          setPoint(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCvs = () => {
    setIsLoading(true);

    axios
      .get(
        `${api}/api/v1/questionnaires?select=workingCompany working profession firstName lastName profile score experienceCount familyCount courseCount achievementCount birth createUser salaryExpectation experiences education gender occupation experienceYear occupationName&limit=10&sort=-score&page=${currentPage}`
      )
      .then((res) => {
        if (isMounted) {
          setCvData([...cvData, ...res.data.data]);
          setMaxPage(res.data.pagination.pageCount);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getCvs();
    getPermision();
    return () => {
      isMounted = false;
    };
  }, [currentPage]);
  const renderLoader = () => {
    return (
      <View style={{ marginBottom: 50 }}>
        {isLoading ? <ActivityIndicator size="large" color="#FFB6C1" /> : null}
      </View>
    );
  };
  const loadMoreItem = () => {
    if (maxPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  if (!point) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: colors.header,
        flex: 1,
        paddingTop: insents.top,
      }}
    >
      <CompanyHeader userSort={true} isNotification={true} />
      {point.point > 1000 ? (
        <View style={{ backgroundColor: colors.background }}>
          <FlatList
            data={cvData}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return <Cvs item={item} />;
            }}
            ListFooterComponent={renderLoader}
            onEndReachedThreshold={0}
            onEndReached={loadMoreItem}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
            opacity: 0.3,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: "#c4c4c4",
              padding: 20,
              width: "100%",

              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo name="lock" size={20} color="black" />
            <Text style={{ textAlign: "center" }}>
              Санамж: Таны хэтэвчинд 1,000+ ipoint байршсан байгаа нөхцөлд
              тодорхой хугацаа заахгүйгээр анкет санг тогтмол ашиглаж байх
              боломжтой.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CvScreen;

const styles = StyleSheet.create({});
