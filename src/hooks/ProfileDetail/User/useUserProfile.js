import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
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
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        else {
          message === err.response.data.error.message;
        }
        Alert.alert(message);
        console.log(err.message, "useUserProfile");
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
