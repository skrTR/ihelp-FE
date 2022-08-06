import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (refresh) => {
  const [normalWork, setNormalWork] = useState([]);

  const [normalError, setNormalError] = useState(null);
  const [normalLoading, setNormalLoading] = useState(false);

  useEffect(() => {
    setNormalLoading(true);
    axios
      .get(`${api}/api/v1/announcements/unspecials`)
      .then((result) => {
        setNormalWork(result.data.data);
        setNormalError(null);
        setNormalLoading(false);
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        setNormalError(message);
        setNormalLoading(false);
      });
  }, [refresh]);

  return [normalWork, normalError, normalLoading];
};
