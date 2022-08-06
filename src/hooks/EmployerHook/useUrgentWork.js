import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";

export default () => {
  const [urgentWork, setUrgentWork] = useState([]);
  const [urgentError, setUrgentError] = useState(null);
  const [urgentLoading, setUrgentLoading] = useState(false);
  const isFocused = useIsFocused();
  let isMounted = true;
  const UrgentWorkData = () => {
    setUrgentLoading(true);
    axios
      .get(`${api}/api/v1/jobs/urgents`)
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
    UrgentWorkData();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  return [urgentWork, urgentError, urgentLoading];
};
