import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { api } from "../../../../Constants";

export default (userId) => {
  const [cv, setCv] = useState(null);
  const [cvLoading, setCvLoading] = useState(false);

  const isFocused = useIsFocused();
  let isMounted = true;
  const UserProfileData = () => {
    setCvLoading(true);
    axios
      .get(`${api}/api/v1/questionnaires/${userId}`)
      .then((result) => {
        if (isMounted) {
          setCv(result.data.data);
          setCvLoading(false);
        }
      })
      .catch((err) => {
        let message = err.message;
      });
  };
  useEffect(() => {
    UserProfileData();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);
  return [cv, cvLoading];
};
