import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { api } from "../../../../Constants";

export default (userId) => {
  const [cv, setCv] = useState(null);
  const [cvError, setCvError] = useState(null);
  const [cvLoading, setCvLoading] = useState(false);

  const isFocused = useIsFocused();
  let isMounted = true;
  const UserProfileData = () => {
    setCvLoading(true);
    axios
      .get(`${api}/api/v1/questionnaires/${userId}`)
      .then((result) => {
        if (isMounted) {
          setCv(result.data.data);
          setCvError(null);
          setCvLoading(false);
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
        setCvError(message);
      });
  };
  useEffect(() => {
    UserProfileData();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);
  return [cv, cvLoading, cvError];
};
