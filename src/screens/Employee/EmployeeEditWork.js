import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import FormText from "../../components/FormText";
import MyButton from "../../components/MyButton";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import PriceModal from "./AddWorkModals/PriceModal";
import TimeModal from "./AddWorkModals/TimeModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SpecialPermissionModal from "./AddWorkModals/SpecialPermissionModal";
import SpecialModal from "./AddWorkModals/SpecialModal";
// Modals
import SearchWorkByCateogry from "../../components/Modals/SearchWorkByCateogry";
import SearchByOccupation from "../../components/Modals/SearchByOccupation";

const EmployeeAddWork = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [specialModal, setSpecialModal] = useState(false);
  const navigation = useNavigation();
  const insents = useSafeAreaInsets();
  // Тусгай зөвшөөрөл сонгох модал
  const [specialPermission, setSpecialPermission] = useState(false);
  const [permission, setPermission] = useState("");
  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // нас сонгох модал
  const [priceModal, setPriceModal] = useState(false);
  const [price, setPrice] = useState("");
  // time modal
  const [timeModal, setTimeModal] = useState(false);
  const [time, setTime] = useState("");

  const sendWork = () => {
    if (addWork.occupation === "") {
      return alert("Чиглэлээ сонгоно уу");
    }
    if (addWork.price === "Сонгох") {
      return alert("Үнийн санал сонгоно уу");
    }
    if (addWork.time === "Сонгох") {
      return alert("Зарцуулах цаг хугацаа сонгоно уу");
    }
    if (addWork.specialPermission === "Сонгох") {
      return alert("Тусгай зөвшөөрөл сонгоно уу");
    }
    axios
      .put(`${api}/api/v1/announcements/${data._id}`, addWork)
      .then((res) => {
        navigation.navigate("EmployeeStack", { screen: "EmployeeScreen" });
        alert("Амжилтай");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [addWork, setAddWork] = useState({
    occupation: data.occupation,
    occupationName: data.occupationName,
    do: data.do,
    experience: data.experience,
    price: data.price,
    time: data.time,
    specialPermission: data.specialPermission,
    description: data.description,
  });
  // 629093164be9675d77e523bd
  console.log(addWork);
  const [error, setError] = useState({
    description: false,
    do: false,
    skill: false,
    location: false,
    experience: false,
    specialPermission: false,
    certificate: false,
    startDate: false,
  });
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=notification`)
      .then((res) => {
        setNotification(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const checkDescription = (text) => {
    setError({
      ...error,
      description: text.length < 5,
    });

    setAddWork({
      ...addWork,
      description: text,
    });
  };
  const checkDo = (text) => {
    setError({
      ...error,
      do: text.length < 5,
    });

    setAddWork({
      ...addWork,
      do: text,
    });
  };
  const checkExperience = (text) => {
    setError({
      ...error,
      experience: text.length < 5,
    });

    setAddWork({
      ...addWork,
      experience: text,
    });
  };
  const checkOccupation = (id, name) => {
    setAddWork({
      ...addWork,
      occupation: id,
    });
    setAddWork({
      ...addWork,
      occupationName: name,
    });
  };
  const checkPrice = (text) => {
    setPriceModal(!priceModal);
    setAddWork({
      ...addWork,
      price: text,
    });
  };
  const checkTime = (text) => {
    setTimeModal(!timeModal);
    setAddWork({
      ...addWork,
      time: text,
    });
  };
  const checkSpecialPermission = (text) => {
    setSpecialPermission(!specialPermission);
    setAddWork({
      ...addWork,
      specialPermission: text,
    });
  };

  if (!notification) {
    return null;
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={{}}>
        <CompanyHeader isBack={true} notification={notification.notification} />
        <View style={{ backgroundColor: colors.background }}>
          <ScrollView
            style={{ marginHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Чиглэл сонгох
            </Text>
            <MyButton
              text={
                occupationName === ""
                  ? data.occupationName
                  : `${occupationName}`
              }
              onPress={() => setCategoryModal(true)}
            />
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Үндсэн үйлчилгээ
            </Text>
            <FormText
              placeholder="Үндсэн үйлчилгээ"
              value={addWork.do}
              onChangeText={checkDo}
              errorText="Үндсэн үйлчилгээ урт 4-20 тэмдэгтээс тогтоно."
              errorShow={error.do}
            />
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Туршлага
            </Text>
            <FormText
              placeholder="Туршлага"
              value={addWork.experience}
              onChangeText={checkExperience}
              errorText="Туршлага урт 4-20 тэмдэгтээс тогтоно."
              errorShow={error.experience}
            />

            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Үнийн санал
            </Text>
            <MyButton
              text={price === "" ? data.price : price}
              onPress={checkPrice}
            />
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Зарцуулах цаг хугацаа
            </Text>
            <MyButton
              text={time === "" ? data.time : time}
              onPress={checkTime}
            />
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Тусгай зөвшөөрөл
            </Text>
            <MyButton
              text={permission === "" ? data.specialPermission : permission}
              onPress={checkSpecialPermission}
            />

            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Нэмэлт тайлбар
            </Text>
            <FormText
              placeholder="Нэмэлт тайлбар"
              value={addWork.description}
              onChangeText={checkDescription}
              errorText="Нэмэлт тайлбар урт 4-20 тэмдэгтээс тогтоно."
              errorShow={error.description}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#FFB6C1",
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.border,
                marginTop: 10,
              }}
              onPress={sendWork}
            >
              <Text style={{ textAlign: "center", color: "black" }}>
                Нийтлэх
              </Text>
            </TouchableOpacity>
            <View style={{ marginBottom: 200 }} />
          </ScrollView>
        </View>
        {/* Мэргэжил сонгох */}
        <SearchWorkByCateogry
          setCategoryModal={setCategoryModal}
          categoryModal={categoryModal}
          setRefresh={setRefresh}
          setCategoryId={setCategoryId}
          setOccupationModal={setOccupationModal}
        />
        <SearchByOccupation
          setOccupationModal={setOccupationModal}
          occupationModal={occupationModal}
          setChoosedName={setOccupationName}
          refresh={refresh}
          setRefresh={setRefresh}
          setChoosedId={checkOccupation}
          categoryId={categoryId}
        />
        {/* Price сонгох */}
        <PriceModal
          setPrice={setPrice}
          priceModal={priceModal}
          setPriceModal={setPriceModal}
          checkPrice={checkPrice}
        />
        {/* Time сонгох */}
        <TimeModal
          setTime={setTime}
          timeModal={timeModal}
          setTimeModal={setTimeModal}
          checkTime={checkTime}
        />
        {/* Тусгай зөвшөөрөл сонгох */}
        <SpecialPermissionModal
          setSpecialPermission={setSpecialPermission}
          specialPermission={specialPermission}
          setPermission={setPermission}
          checkSpecialPermission={checkSpecialPermission}
        />
        <SpecialModal
          specialModal={specialModal}
          setSpecialModal={setSpecialModal}
          data={addWork}
          occupationName={occupationName}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmployeeAddWork;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: 220,
    margin: 20,
  },
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 5,
    padding: 7,
  },
});
