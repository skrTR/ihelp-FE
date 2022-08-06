import { useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { api } from "../../../../Constants";

export default (companyId) => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const isFocused = useIsFocused();
  let isMounted = true;
  const loadCompanyProfile = () => {
    axios
      .get(`${api}/api/v1/profiles/${companyId}`)
      .then((res) => {
        if (isMounted) {
          setCompanyProfile(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCompanyProfile();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  return [companyProfile];
};
