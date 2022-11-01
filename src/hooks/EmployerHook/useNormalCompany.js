import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

export default () => {
  const [normalCompany, setNormalCompany] = useState([]);
  const [normalCompanyError, setNormalCompanyError] = useState(null);
  const [normalCompanyLoading, setNormalCompanyLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMounted = true;
  const NormalCompanyData = () => {
    setNormalCompanyLoading(true);
    axios
      .get(
        `${api}/api/v1/profiles/unspecials/employer?select=firstName jobNumber isApproved profile isEmployer isEmployee isFollowing categoryName&isApproved=true&limit=1000`
      )
      .then((result) => {
        if (isMounted) {
          setNormalCompany(result.data.data);
          setNormalCompanyError(null);
          setNormalCompanyLoading(false);
          console.log(result.data.data);
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
        setNormalCompanyError(message);
        setNormalCompanyLoading(false);
      });
  };
  useEffect(() => {
    NormalCompanyData();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  return [normalCompany, normalCompanyError, normalCompanyLoading];
};
