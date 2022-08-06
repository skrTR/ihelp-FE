import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { api } from "../../../../Constants";

export default (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const isFocused = useIsFocused();
  let isMounted = true;
  const UserProfileData = () => {
    setProfileLoading(true);
    axios
      .get(`${api}/api/v1/cvs/${userId}`)
      .then((result) => {
        if (isMounted) {
          setUserProfile(result.data.data);
          setProfileLoading(false);
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
  return [userProfile, profileLoading];
};
