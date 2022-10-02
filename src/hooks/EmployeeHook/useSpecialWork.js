import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";

export default (refresh) => {
  const [specialWork, setSpecialWork] = useState([]);

  const [specialError, setSpecialError] = useState(null);
  const [specialLoading, setSpecialLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMoutned = true;
  const getData = () => {
    axios
      .get(`${api}/api/v1/announcements/specials`)
      .then((result) => {
        if (isMoutned) {
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
        setSpecialError(message);
        setSpecialLoading(false);
      });
  };
  useEffect(() => {
    setSpecialLoading(true);
    getData();
    () => {
      isMoutned = false;
    };
  }, [refresh, isFocused]);

  return [specialWork, specialError, specialLoading];
};
