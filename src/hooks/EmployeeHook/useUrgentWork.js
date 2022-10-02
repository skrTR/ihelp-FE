import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";

export default (refresh) => {
  const [urgentWork, setUrgentWork] = useState([]);
  const [urgentError, setUrgentError] = useState(null);
  const [urgentLoading, setUrgentLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMounted = true;
  const getData = () => {
    axios
      .get(`${api}/api/v1/announcements/urgents`)
      .then((result) => {
        if (isMounted) {
          setUrgentWork(result.data.data);
          setUrgentError(null);
          setUrgentLoading(false);
        }
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        setUrgentError(message);
        setUrgentLoading(false);
      });
  };
  useEffect(() => {
    getData();
    () => {
      isMounted = false;
    };
  }, [refresh, isFocused]);

  return [urgentWork, urgentError, urgentLoading];
};
