import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (refresh) => {
  const [specialCompany, setSpecialCompany] = useState([]);

  const [specialCompanyError, setSpecialCompanyError] = useState(null);
  const [specialCompanyLoading, setSpecialCompanyLoading] = useState(false);

  useEffect(() => {
    setSpecialCompanyLoading(true);
    axios
      .get(`${api}/api/v1/profiles/specials/employee`)
      .then((result) => {
        setSpecialCompany(result.data.data);
        setSpecialCompanyError(null);
        setSpecialCompanyLoading(false);
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
  }, [refresh]);

  return [specialCompany, specialCompanyError, specialCompanyLoading];
};
