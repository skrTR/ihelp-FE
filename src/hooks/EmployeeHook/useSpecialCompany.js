import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";

export default (refresh) => {
  const [specialCompany, setSpecialCompany] = useState([]);

  const [specialCompanyError, setSpecialCompanyError] = useState(null);
  const [specialCompanyLoading, setSpecialCompanyLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMoutned = true;
  const getData = () => {
    axios
      .get(`${api}/api/v1/profiles/specials/employee`)
      .then((result) => {
        if (isMoutned) {
          setSpecialCompany(result.data.data);
          setSpecialCompanyError(null);
          setSpecialCompanyLoading(false);
        }
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        setSpecialCompanyError(message);
        setSpecialCompanyLoading(false);
      });
  };
  useEffect(() => {
    setSpecialCompanyLoading(true);
    getData();
    () => {
      isMoutned = false;
    };
  }, [refresh, isFocused]);

  return [specialCompany, specialCompanyError, specialCompanyLoading];
};
