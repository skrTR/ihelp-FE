import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

export default () => {
  const [specialWork, setSpecialWork] = useState([]);
  const [specialError, setSpecialError] = useState(null);
  const [specialLoading, setSpecialLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMounted = true;
  const SpecialWorkData = () => {
    setSpecialLoading(true);
    axios
      .get(`${api}/api/v1/jobs/specials`)
      .then((result) => {
        if (isMounted) {
          setSpecialWork(result.data.data);
          setSpecialError(null);
          setSpecialLoading(false);
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
        setSpecialError(message);
        setSpecialLoading(false);
      });
  };
  useEffect(() => {
    SpecialWorkData();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  return [specialWork, specialError, specialLoading];
};
