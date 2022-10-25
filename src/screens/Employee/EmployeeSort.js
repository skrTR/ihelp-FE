import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import SearchWorkByCateogry from "../../components/Modals/SearchWorkByCateogry";
import SearchByOccupation from "../../components/Modals/SearchByOccupation";
import TimeModal from "../../components/Modals/TimeModal";
import PriceModal from "../../components/Modals/PriceModal";
import OrganizationModal from "../../components/Modals/OrganizationModal";
import WorkTypeModal from "../../components/Modals/WorkTypeModal";
const EmployeeSort = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Мэргэжил сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [occupationId, setOccupationId] = useState("");
  const [refresh, setRefresh] = useState(false);
  // Hас сонгох модал
  const [priceModal, setPriceModal] = useState(false);
  const [price, setPrice] = useState("");
  // time modal
  const [timeModal, setTimeModal] = useState(false);
  const [time, setTime] = useState("");
  // zariin torol modal
  const [workTypeModal, setWorkTypeModal] = useState(false);
  const [workType, setWorkType] = useState("");
  // huvi hun company songoh
  const [organizationModal, setOrganizationModal] = useState(false);
  const [organization, setOrganization] = useState("");
  const checkOccupation = (id) => {
    setOccupationId(id);
  };
  const checkPrice = (text) => {
    setPriceModal(!priceModal);
  };
  const checkTime = (text) => {
    setTimeModal(!timeModal);
  };
  const checkOrganization = (text) => {
    setOrganizationModal(!organizationModal);
  };
  const checkWorkType = (text) => {
    setWorkTypeModal(!workTypeModal);
  };
  return (
    <>
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <View
          style={{
            backgroundColor: colors.background,
            height: "100%",
            marginHorizontal: 10,
          }}
        >
          {/* 1.Мэргэжил */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => setCategoryModal(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {occupationName ? `${occupationName}` : "Мэргэжил сонгох"}
            </Text>
          </TouchableOpacity>
          {/* Үнийн санал */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={checkPrice}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {price ? `${price}` : "Үнийн санал"}
            </Text>
          </TouchableOpacity>
          {/* Зарцуулах хугацаа */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={checkTime}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {time ? `${time}` : "Зарцуулах хугацаа"}
            </Text>
          </TouchableOpacity>
          {/* Хувь хүн компани */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={checkOrganization}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {organization ? `${organization}` : "Байгууллага эсвэл хувь хүн"}
            </Text>
          </TouchableOpacity>
          {/* Ажил гүйцэтгэгч  */}
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={checkWorkType}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {workType
                ? `${workType}`
                : "Ажил гүйцэтгэгч эсвэл ажил захиалагч "}
            </Text>
          </TouchableOpacity>
          {/* Хайх */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EmployeeResultSort", {
                occupationId: occupationId,
                price: price,
                time: time,
                organization: organization,
                workType: workType,
              })
            }
            style={{
              backgroundColor: colors.button,
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: colors.border,
            }}
          >
            <Text style={{ textAlign: "center", color: "black" }}>Хайх</Text>
          </TouchableOpacity>
        </View>
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
      <TimeModal
        setTime={setTime}
        timeModal={timeModal}
        setTimeModal={setTimeModal}
        checkTime={checkTime}
      />
      <PriceModal
        setPrice={setPrice}
        priceModal={priceModal}
        setPriceModal={setPriceModal}
        checkPrice={checkPrice}
      />

      <OrganizationModal
        setOrganizationModal={setOrganizationModal}
        organizationModal={organizationModal}
        setOrganization={setOrganization}
        checkOrganization={checkOrganization}
      />
      <WorkTypeModal
        setWorkTypeModal={setWorkTypeModal}
        workTypeModal={workTypeModal}
        setWorkType={setWorkType}
        checkWorkType={checkWorkType}
      />
    </>
  );
};

export default EmployeeSort;

const styles = StyleSheet.create({});
