import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../../Constants";
import { Alert, Platform } from "react-native";
import { useState, createContext, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const UserContext = createContext();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [token, setToken] = useState(null);
  const [companyToken, setCompanyToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [companyPassword, setCompanyPassword] = useState(null);
  const [userId, setUserId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content);
        navigation.navigate(response.notification.request.content.data.data1, {
          screen: response.notification.request.content.data.data,
          initial: false,
          params: { id: response.notification.request.content.data.postId },
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("company");
    await axios.get(`${api}/api/v1/cvs/logout`);
    await axios.get(`${api}/api/v1/profiles/logout`);
    setIsLoggedIn(false);
    setIsCompany(false);
    setToken(null);
    setCompanyToken(null);
    setEmail(null);
    setCompanyPassword(null);
    setPassword(null);
    setPhone(null);
    setUserId(null);
    setCompanyId(null);
    setExpoPushToken(null);
  };
  const companyLogout = async () => {
    await AsyncStorage.removeItem("company");
    await axios.get(`${api}/api/v1/profiles/logout`);
    setIsCompany(false);
    setCompanyToken(null);
    setEmail(null);
    setCompanyPassword(null);
    setCompanyId(null);
  };
  const login = (phone, password) => {
    axios
      .post(`${api}/api/v1/cvs/login`, {
        phone: phone,
        password: password,
        expoPushToken: expoPushToken,
      })
      .then((res) => {
        loginUserSuccessFul(
          res.data.token,
          phone,
          password,
          res.data.cv.organization,
          res.data.cv._id
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        let message = err.message;
        Alert.alert(message);
      });
  };
  const companyLogin = (email, password) => {
    axios
      .post(`${api}/api/v1/profiles/login`, {
        email: email,
        password: password,
        expoPushToken: expoPushToken,
      })
      .then((res) => {
        loginCompanySuccessFul(
          res.data.token,
          email,
          password,
          res.data.profile.organization,
          res.data.profile._id
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        let message = err.message;
        Alert.alert(message);
      });
  };

  const signUp = (phone, email, password, firstName, lastName, random) => {
    axios
      .post(`${api}/api/v1/cvs`, {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
        random: random,
        expoPushToken: expoPushToken,
      })
      .then((res) => {
        loginUserSuccessFul(
          res.data.token,
          phone,
          res.data.data.organization,
          res.data.data._id
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        Alert.alert(message);
      });
  };
  const companySignUp = (phone, email, password, name) => {
    axios
      .post(`${api}/api/v1/profiles`, {
        name: name,
        phone: phone,
        email: email,
        password: password,
        expoPushToken: expoPushToken,
      })
      .then((res) => {
        loginCompanySuccessFul(
          res.data.token,
          email,
          res.data.data.organization,
          res.data.data._id
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        Alert.alert(err);
      });
  };

  const loginFailed = (error) => {
    setIsLoggedIn(false);
    setIsCompany(false);
    setEmail(null);
    setPhone(null);
    setUserId(null);
    setCompanyId(null);
  };

  const loginUserSuccessFul = async (
    token,
    phone,
    password,
    isCompany,
    userId
  ) => {
    setToken(token);
    setPhone(phone);
    setPassword(password);
    setIsCompany(isCompany);
    setUserId(userId);
    setIsLoggedIn(true);

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ token, phone, password, userId, isCompany })
      );
    } catch (err) {
      alert("Утас руу хадгалж чадсангүй");
    }
  };
  const loginCompanySuccessFul = async (
    companyToken,
    email,
    companyPassword,
    isCompany,
    companyId
  ) => {
    setCompanyToken(companyToken);
    setEmail(email);
    setCompanyPassword(companyPassword);
    setIsCompany(isCompany);
    setCompanyId(companyId);
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem(
        "company",
        JSON.stringify({
          companyToken,
          email,
          companyPassword,
          companyId,
          isCompany,
        })
      );
    } catch (err) {
      console.log(err);
      alert("Утас руу хадгалж чадсангүй");
    }
  };
  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        companyLogout,
        companyLogin,
        signUp,
        companySignUp,
        logout,
        token,
        setToken,
        companyToken,
        setCompanyToken,
        isCompany,
        setIsCompany,
        setCompanyPassword,
        companyPassword,
        email,
        setEmail,
        phone,
        setPhone,
        userId,
        setUserId,
        companyId,
        setCompanyId,
        isLoading,
        setIsLoading,
        password,
        setPassword,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
