import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

export default (type) => {
  const [specialWork, setSpecialWork] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  let isMoutned = true;
  const getData = () => {
    axios
      .get(
        `${api}/api/v1/announcements/specials?limit=1000${
          type ? `&certificate=${type}` : ""
        }`
      )
      .then((result) => {
        if (isMoutned) {
          setSpecialWork(result.data.data);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        else {
          message === err.response.data.error.message;
        }
        Alert.alert(message);
      });
  };
  useEffect(() => {
    getData();
    () => {
      isMoutned = false;
    };
  }, [refreshing, isFocused]);

  return [specialWork, refreshing, setRefreshing];
};
