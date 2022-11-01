import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import { Alert } from "react-native";

export default (companyId) => {
  const [companyAnnoucement, setCompanyAnnoucement] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  let isMounted = true;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/api/v1/profiles/${companyId}/announcements`)
      .then((result) => {
        if (isMounted) {
          setCompanyAnnoucement(result.data.data);
          setErrorMessage(null);
          setLoading(false);
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
        setErrorMessage(message);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return [companyAnnoucement, errorMessage, loading];
};
