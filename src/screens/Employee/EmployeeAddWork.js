import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import FormText from "../../components/FormText";
import MyButton from "../../components/MyButton";

import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import OccupationModal from "../Employer/AddWorkModals/OccupationModal";
import PriceModal from "./AddWorkModals/PriceModal";
import TimeModal from "./AddWorkModals/TimeModal";
import WorketNumberModal from "./AddWorkModals/WorkerNumberModal";
import SpecialModal from "../Employee/AddWorkModals/SpecialModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EmployeeAddWork = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [isType, setIsType] = useState(1);
  const [normalDay, setNormalDay] = useState(7);
  const [specialModal, setSpecialModal] = useState(false);
  const navigation = useNavigation();
  const insents = useSafeAreaInsets();
  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  // нас сонгох модал
  const [priceModal, setPriceModal] = useState(false);
  const [price, setPrice] = useState("");
  // time modal
  const [timeModal, setTimeModal] = useState(false);
  const [time, setTime] = useState("");
  // ажилчдийн тоо
  const [workerNumberModal, setWorkerNumberModal] = useState(false);
  const [workerNumber, setWorkerNumber] = useState("");
  const sendWork = () => {
    axios
      .post(`${api}/api/v1/announcements`, addWork)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const [addWork, setAddWork] = useState({
    description: "",
    do: "",
    skill: "",
    location: "",
    experience: "",
    specialPermission: "",
    certificate: "",
    price: "Сонгох",
    time: "Сонгох",
    workerNumber: "Сонгох",
    occupation: "",
    isCompany: true,
    startDate: "",
    order: 0,
    urgent: 0,
    special: 0,
  });

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
  const checkSkill = (text) => {
    setError({
      ...error,
      skill: text.length < 5,
    });

    setAddWork({
      ...addWork,
      skill: text,
    });
  };
  const checkLocation = (text) => {
    setError({
      ...error,
      location: text.length < 5,
    });

    setAddWork({
      ...addWork,
      location: text,
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
  const checkSpecialPermission = (text) => {
    setError({
      ...error,
      specialPermission: text.length < 5,
    });

    setAddWork({
      ...addWork,
      specialPermission: text,
    });
  };
  const checkCertificate = (text) => {
    setError({
      ...error,
      certificate: text.length < 5,
    });

    setAddWork({
      ...addWork,
      certificate: text,
    });
  };
  const checkStartDate = (text) => {
    setError({
      ...error,
      startDate: text.length < 5,
    });

    setAddWork({
      ...addWork,
      startDate: text,
    });
  };
  const checkOccupation = (id) => {
    setOccupationModal(!occupationModal);
    setAddWork({
      ...addWork,
      occupation: id,
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
  const checkWorkerNumber = (text) => {
    setWorkerNumberModal(!workerNumberModal);
    setAddWork({
      ...addWork,
      workerNumber: text,
    });
  };
  const checkOrders = (text, type) => {
    setSpecialModal(!specialModal);
    if (type === "normal") {
      setAddWork({
        ...addWork,
        order: text,
      });
    } else if (type === "special") {
      setAddWork({
        ...addWork,
        special: text,
      });
    } else if (type === "urgent") {
      setAddWork({
        ...addWork,
        urgent: text,
      });
    }
  };
  if (!notification) {
    return null;
  }
  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
      <CompanyHeader isBack={true} notification={notification.notification} />
      <View style={{ backgroundColor: colors.background }}>
        <ScrollView
          style={{ marginHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Тайлбар
          </Text>
          <FormText
            placeholder="Тайлбар"
            value={addWork.description}
            onChangeText={checkDescription}
            errorText="Тайлбар урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.description}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хийх ажил
          </Text>
          <FormText
            placeholder="Хийх ажил"
            value={addWork.do}
            onChangeText={checkDo}
            errorText="Хийх ажил урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.do}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Ур чадвар
          </Text>
          <FormText
            placeholder=" Ур чадвар"
            value={addWork.skill}
            onChangeText={checkSkill}
            errorText=" Ур чадвар урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.skill}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Хаяг
          </Text>
          <FormText
            placeholder="Хаяг"
            value={addWork.location}
            onChangeText={checkLocation}
            errorText="Хаяг урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.location}
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
            Тусгай зөвшөөрөл
          </Text>
          <FormText
            placeholder="Тусгай зөвшөөрөл"
            value={addWork.specialPermission}
            onChangeText={checkSpecialPermission}
            errorText="Тусгай зөвшөөрөл урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.specialPermission}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Батламж
          </Text>
          <FormText
            placeholder=" Батламж"
            value={addWork.certificate}
            onChangeText={checkCertificate}
            errorText=" Батламж урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.certificate}
          />

          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Эхлэх хугацаа
          </Text>
          <FormText
            placeholder="Эхлэх хугацаа"
            value={addWork.startDate}
            onChangeText={checkStartDate}
            errorText="Эхлэх хугацаа зөвшөөрөл урт 4-20 тэмдэгтээс тогтоно."
            errorShow={error.startDate}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Мэргэжил сонгох
          </Text>
          <MyButton
            text={
              occupationName === "" ? "Мэргэжил сонгох" : `${occupationName}`
            }
            onPress={checkOccupation}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Үнийн санал
          </Text>
          <MyButton
            text={price === "" ? "Үнийн санал" : price}
            onPress={checkPrice}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Зарцуулах цаг хугацаа
          </Text>
          <MyButton
            text={time === "" ? "Зарцуулах цаг хугацаа" : time}
            onPress={checkTime}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Ажилчдын тоо
          </Text>
          <MyButton
            text={workerNumber === "" ? "Ажилчдын тоо" : workerNumber}
            onPress={checkWorkerNumber}
          />
          <Text style={[styles.textTitle, { color: colors.primaryText }]}>
            Зарын төрөл
          </Text>
          <MyButton
            text={
              isType === 1
                ? `Энгийн ${normalDay} хоног`
                : isType === 2
                ? `Онцгой ${normalDay} хоног`
                : isType === 3
                ? `Яаралтай ${normalDay} хоног`
                : "Зарын төрөл сонгох"
            }
            onPress={checkOrders}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: colors.border,
              marginTop: 10,
            }}
            onPress={sendWork}
          >
            <Text style={{ textAlign: "center", color: "black" }}>Нийтлэх</Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 200 }} />
        </ScrollView>
      </View>
      {/* Мэргэжил сонгох */}
      <OccupationModal
        setOccupationModal={setOccupationModal}
        occupationModal={occupationModal}
        setOccupationName={setOccupationName}
        checkOccupation={checkOccupation}
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
      {/* WorkerNumber сонгох */}
      <WorketNumberModal
        setWorkerNumber={setWorkerNumber}
        workerNumberModal={workerNumberModal}
        setWorkerNumberModal={setWorkerNumberModal}
        checkWorkerNumber={checkWorkerNumber}
      />
      <SpecialModal
        setSpecialModal={setSpecialModal}
        specialModal={specialModal}
        occupationName={occupationName}
        salary={price}
        normalDay={normalDay}
        setNormalDay={setNormalDay}
        checkOrders={checkOrders}
        isType={isType}
        setIsType={setIsType}
      />
    </View>
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
