import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";

export default (refresh) => {
  const [normalCompany, setNormalCompany] = useState([]);

  const [normalCompanyError, setNormalCompanyError] = useState(null);
  const [normalCompanyLoading, setNormalCompanyLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMounted = true;
  const getData = () => {
    axios
      .get(
        `${api}/api/v1/profiles/unspecials/employee?select=firstName jobNumber isApproved profile isEmployer isEmployee isFollowing&isApproved=true`
      )
      .then((result) => {
        if (isMounted) {
          setNormalCompany(result.data.data);
          setNormalCompanyError(null);
          setNormalCompanyLoading(false);
        }
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        setNormalCompanyError(message);
        setNormalCompanyLoading(false);
      });
  };
  useEffect(() => {
    setNormalCompanyLoading(true);
    getData();
    () => {
      isMounted = false;
    };
  }, [refresh, isFocused]);

  return [normalCompany, normalCompanyError, normalCompanyLoading];
};
