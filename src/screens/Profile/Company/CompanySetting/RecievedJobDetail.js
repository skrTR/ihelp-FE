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
import { api } from "../../../../../Constants";
import * as Linking from "expo-linking";
import ApproveModal from "./Modals/ApproveModal";
const RecievedJobDetail = ({ route }) => {
  const { id, owner } = route.params;
  const [approveModal, setApproveModal] = useState(false);
  const [approve, setApprove] = useState("");
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getWorkRequest = () => {
    axios
      .get(`${api}/api/v1/invitations/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  useEffect(() => {
    setRefresh(false);
    getWorkRequest();
  }, []);
  const changeStatus = () => {
    axios
      .put(`${api}/api/v1/invitations/${id}`, { approveStatus: approve })
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {
        setRefresh(true);
      });
  };
  return (
    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: `${api}/upload/${data.profile}`,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 30,
          }}
        />
        <View style={{}}>
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 5,
            }}
          >
            {data.firstName}
          </Text>

          <Text
            style={{
              color: colors.primaryText,
              marginTop: 5,
              marginLeft: 5,
              fontSize: 15,
            }}
          >
            Гарчиг: {data.name}
          </Text>
          <Text
            style={{
              color: colors.primaryText,
              marginTop: 5,
              marginLeft: 5,
              fontSize: 15,
            }}
          >
            Цалин: {data.salary}
          </Text>
          <Text
            style={{
              color: colors.primaryText,
              marginTop: 5,
              marginLeft: 5,
              fontSize: 15,
            }}
          >
            Статус: {data.approveStatus}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: colors.primaryText,
          marginTop: 10,
        }}
      >
        Тайлбар
      </Text>
      <Text
        style={{
          fontWeight: "200",
          fontSize: 20,
          color: colors.primaryText,
          marginTop: 10,
        }}
      >
        {data.description}
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: colors.primaryText,
          marginTop: 10,
        }}
      >
        Холбоо барих
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel: ${data.phone}`)}
          style={{ alignItems: "center" }}
        >
          <Text
            style={{
              fontWeight: "200",
              fontSize: 20,
              color: colors.primaryText,
              marginTop: 10,
            }}
          >
            {data.phone}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              color: colors.primaryText,
            }}
          >
            Утас
          </Text>
        </TouchableOpacity>
        <View style={{ borderWidth: 1, borderColor: colors.border }} />
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto: ${data.phone}`)}
          style={{ alignItems: "center" }}
        >
          <Text
            style={{
              fontWeight: "200",
              fontSize: 20,
              color: colors.primaryText,
              marginTop: 10,
            }}
          >
            {data.email}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              color: colors.primaryText,
            }}
          >
            И-мэйл
          </Text>
        </TouchableOpacity>
      </View>
      {!owner && (
        <>
          <TouchableOpacity
            onPress={() => {
              setApproveModal(true);
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              marginTop: 20,
              backgroundColor: "#FFB6C1",
            }}
          >
            <Text>{approve ? approve : data.approveStatus}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EmployerSendWorkModal", {
                id: data.createUser,
              });
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              marginTop: 10,
              backgroundColor: "#FFB6C1",
            }}
          >
            <Text>Анкет илгээх</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changeStatus}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              marginTop: 10,
              backgroundColor: "#FFB6C1",
            }}
          >
            <Text>Хадгалах</Text>
          </TouchableOpacity>
        </>
      )}

      <ApproveModal
        setApprove={setApprove}
        approveModal={approveModal}
        setApproveModal={setApproveModal}
      />
    </View>
  );
};

export default RecievedJobDetail;

const styles = StyleSheet.create({});
