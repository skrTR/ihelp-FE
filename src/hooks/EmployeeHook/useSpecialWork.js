import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (refresh) => {
  const [specialWork, setSpecialWork] = useState([]);

  const [specialError, setSpecialError] = useState(null);
  const [specialLoading, setSpecialLoading] = useState(false);

  useEffect(() => {
    setSpecialLoading(true);
    axios
      .get(`${api}/api/v1/announcements/specials`)
      .then((result) => {
        setSpecialWork(result.data.data);
        setSpecialError(null);
        setSpecialLoading(false);
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
  }, [refresh]);

  return [specialWork, specialError, specialLoading];
};
