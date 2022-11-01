import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

export default () => {
  const [normalWork, setNormalWork] = useState([]);
  const [normalError, setNormalError] = useState(null);
  const [normalLoading, setNormalLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMounted = true;
  const NormalWorkData = () => {
    setNormalLoading(true);
    axios
      .get(`${api}/api/v1/jobs/unspecials`)
      .then((result) => {
        if (isMounted) {
          setNormalWork(result.data.data);
          setNormalError(null);
          setNormalLoading(false);
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
        setNormalError(message);
        setNormalLoading(false);
      });
  };
  useEffect(() => {
    NormalWorkData();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  return [normalWork, normalError, normalLoading];
};
