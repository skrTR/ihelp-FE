import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useTheme } from "@react-navigation/native";

import FormText from "../../components/FormText";
import MyButton from "../../components/MyButton";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header";
import PriceModal from "../../components/Modals/PriceModal";
import TimeModal from "../../components/Modals/TimeModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Modals
import SearchWorkByCateogry from "../../components/Modals/SearchWorkByCateogry";
import SearchByOccupation from "../../components/Modals/SearchByOccupation";
import SpecialModal from "./AddWorkModals/SpecialModal";

const EmployeeAddWork = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [specialModal, setSpecialModal] = useState(false);
  const insents = useSafeAreaInsets();
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
      return Alert.alert("Чиглэлээ сонгоно уу");
    }
    if (addWork.price === "Сонгох") {
      return Alert.alert("Үнийн санал сонгоно уу");
    }
    if (addWork.time === "Сонгох") {
      return Alert.alert("Зарцуулах цаг хугацаа сонгоно уу");
    }
    {
      console.log(addWork.do.length);
    }
    if (addWork.do.length < 1) {
      return Alert.alert("Үндсэн үйлчилгээг оруулна уу");
    }

    setSpecialModal(true);
  };
  const [addWork, setAddWork] = useState({
    occupation: "",
    do: "",
    experience: "",
    price: "Сонгох",
    time: "Сонгох",
    description: "",
    isCompany: true,
    order: 0,
    special: 0,
  });

  const [error, setError] = useState({
    description: false,
    do: false,
    skill: false,
    location: false,
    experience: false,
    certificate: false,
    startDate: false,
  });

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
  const checkOccupation = (id) => {
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

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: insents.top,
        backgroundColor: colors.header,
      }}
    >
      <View style={{}}>
        <Header isBack={true} />
        <View style={{ backgroundColor: colors.background }}>
          <ScrollView
            style={{ marginHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Гарчиг
            </Text>
            <FormText
              placeholder="Гарчиг"
              value={addWork.do}
              onChangeText={checkDo}
              errorText="Үндсэн үйлчилгээ урт 4-20 тэмдэгтээс тогтоно."
              errorShow={error.do}
            />
            <Text style={[styles.textTitle, { color: colors.primaryText }]}>
              Чиглэл сонгох
            </Text>
            <MyButton
              text={
                occupationName === "" ? "Чиглэл сонгох" : `${occupationName}`
              }
              onPress={() => setCategoryModal(true)}
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
