import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (refresh) => {
  const [urgentWork, setUrgentWork] = useState([]);
  const [urgentError, setUrgentError] = useState(null);
  const [urgentLoading, setUrgentLoading] = useState(false);

  useEffect(() => {
    setUrgentLoading(true);
    axios
      .get(`${api}/api/v1/announcements/urgents`)
      .then((result) => {
        setUrgentWork(result.data.data);
        setUrgentError(null);
        setUrgentLoading(false);
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
  }, [refresh]);

  return [urgentWork, urgentError, urgentLoading];
};
