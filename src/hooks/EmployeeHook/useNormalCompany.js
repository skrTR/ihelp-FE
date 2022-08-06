import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (refresh) => {
  const [normalCompany, setNormalCompany] = useState([]);

  const [normalCompanyError, setNormalCompanyError] = useState(null);
  const [normalCompanyLoading, setNormalCompanyLoading] = useState(false);

  useEffect(() => {
    setNormalCompanyLoading(true);
    axios
      .get(`${api}/api/v1/profiles/unspecials/employee`)
      .then((result) => {
        setNormalCompany(result.data.data);
        setNormalCompanyError(null);
        setNormalCompanyLoading(false);
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
  }, [refresh]);

  return [normalCompany, normalCompanyError, normalCompanyLoading];
};
