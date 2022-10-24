import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";

export default (type) => {
  const [normalWork, setNormalWork] = useState([]);
  const [refreshings, setRefreshings] = useState(false);

  const isFocused = useIsFocused();
  let isMoutned = true;
  const getData = () => {
    axios
      .get(
        `${api}/api/v1/announcements/unspecials?limit=100${
          type ? `&certificate=${type}` : ""
        }`
      )
      .then((result) => {
        if (isMoutned) {
          setNormalWork(result.data.data);
          setRefreshings(false);
        }
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
      });
  };
  useEffect(() => {
    getData();
    () => {
      isMoutned = false;
    };
  }, [isFocused]);

  return [normalWork, refreshings, setRefreshings];
};
