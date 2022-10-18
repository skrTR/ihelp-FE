import { SafeAreaView, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import SpecialWork from "../../components/Employee/SpecialWork";
import NormalWork from "../../components/Employee/NormalWork";
const EmployeeResultSort = (props) => {
  const { occupationId, time, price, organization } = props.route.params;
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let info = organization === "Байгууллага" ? true : false;
  const getWorkSearch = () => {
    const test = `${api}/api/v1/announcements?limit=1000${
      occupationId ? `&occupation=${occupationId}` : ""
    }${time ? `&time=${time}` : ""}${price ? `&price=${price}` : ""}${
      organization ? `organization=${organization}` : ""
    }`;
    axios
      .get(
        `${api}/api/v1/announcements?limit=1000${
          occupationId ? `&occupation=${occupationId}` : ""
        }${time ? `&time=${time}` : ""}${price ? `&price=${price}` : ""}`
      )
      .then((res) => {
        setData(res.data.data);
        // console.log(res.data.data, "data");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    setRefresh(false);
    getWorkSearch();
  }, [refresh]);

  const sortedData = data.sort((a, b) => b.isSpecial - a.isSpecial);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#141414" }}>
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          {data.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={sortedData}
              keyExtractor={(item, index) => index}
              ListFooterComponent={<View style={{ marginVertical: 200 }} />}
              renderItem={({ item }) => {
                return (
                  <View style={{}}>
                    {item.isSpecial ? (
                      <SpecialWork
                        id={item._id}
                        createUserId={item.createUser}
                        createUserName={item.firstName}
                        createUserProfile={item.profile}
                        isEmployer={item.isEmployer}
                        isEmployee={item.isEmployee}
                        occupation={item.occupationName}
                        salary={item.price}
                        job={item.do}
                        special={item.special}
                      />
                    ) : (
                      <NormalWork
                        id={item._id}
                        createUserName={item.firstName}
                        createUserProfile={item.profile}
                        isEmployer={item.isEmployer}
                        isEmployee={item.isEmployee}
                        occupation={item.occupationName}
                        price={item.price}
                        job={item.do}
                        createUserId={item.createUser}
                        order={item.order}
                      />
                    )}
                  </View>
                );
              }}
            />
          ) : (
            <View>
              <Empty text="Илэрц байхгүй" />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default EmployeeResultSort;
