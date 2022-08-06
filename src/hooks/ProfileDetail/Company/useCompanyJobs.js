import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../../Constants";

export default (companyId) => {
  const [companyJobs, setCompanyJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  let isMounted = true;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/api/v1/profiles/${companyId}/jobs`)
      .then((result) => {
        if (isMounted) {
          setCompanyJobs(result.data.data);
          setErrorMessage(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        setErrorMessage(message);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return [companyJobs, errorMessage, loading];
};
