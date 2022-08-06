import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import Portfolio from "./Portfolio";

const fullWidth = Dimensions.get("screen").width;
const CompanyPortfolia = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const state = useContext(UserContext);

  let isMounted = true;
  const loadCompanyProfile = () => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=portfolio`)
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
  }, []);

  if (!companyProfile) {
    return null;
  }
  return (
    <>
      {companyProfile.portfolio && (
        <>
          <Portfolio
            image1={companyProfile.portfolio.image1}
            image2={companyProfile.portfolio.image2}
            image3={companyProfile.portfolio.image3}
            image4={companyProfile.portfolio.image4}
            image5={companyProfile.portfolio.image5}
            image6={companyProfile.portfolio.image6}
          />
        </>
      )}
    </>
  );
};

export default CompanyPortfolia;

const styles = StyleSheet.create({});
