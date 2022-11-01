import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

export default () => {
  const [urgentWork, setUrgentWork] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  let isMounted = true;
  const UrgentWorkData = () => {
    axios
      .get(`${api}/api/v1/jobs/urgents`)
      .then((result) => {
        if (isMounted) {
          setUrgentWork(result.data.data);
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
        setRefreshing(false);
        console.log(message);
      });
  };
  useEffect(() => {
    UrgentWorkData();
    return () => {
      isMounted = false;
    };
  }, [isFocused, refreshing]);

  return [urgentWork, refreshing, setRefreshing];
};
