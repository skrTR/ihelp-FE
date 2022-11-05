import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import {
  AntDesign,
  SimpleLineIcons,
  FontAwesome5,
  FontAwesome,
  EvilIcons,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import useCv from "../../../../hooks/ProfileDetail/User/useCv";
import useUserProfile from "../../../../hooks/ProfileDetail/User/useUserProfile";
const CreateCvScreen = (props) => {
  const { id } = props.route.params;
  const [cv] = useCv(id);
  const [userProfile] = useUserProfile(id);
  const { colors } = useTheme();
  const navigation = useNavigation();

  if (!cv) {
    return null;
  }
  if (!userProfile) {
    return null;
  }
  return (
    <ScrollView
      style={{ marginHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* name birth location register phoneEmergency driverlicence */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Хувийн мэдээлэл
        </Text>
        <SimpleLineIcons
          name="pencil"
          size={24}
          color={colors.primaryText}
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("PersonalDetailModal", { data: cv })
          }
        />
      </View>
      {/* Хувийн мэдээлэл */}
      <TouchableOpacity
        style={{
          backgroundColor: colors.border,
          padding: 10,
          justifyContent: "space-between",
          marginVertical: 2,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("PersonalDetailModal", { data: cv })}
      >
        <Text style={{ color: colors.primaryText, fontWeight: "200" }}>
          <Text style={{ fontFamily: "Sf-bold" }}>
            <FontAwesome5
              name="network-wired"
              size={14}
              color={colors.primary}
            />{" "}
            Овог нэр:{" "}
          </Text>
          {cv.lastName} {cv.firstName}{" "}
        </Text>
        {cv.birth && (
          <Text
            style={{
              color: colors.primaryText,
              marginTop: 5,
              fontWeight: "200",
            }}
          >
            <Text style={{ fontFamily: "Sf-bold", fontWeight: "200" }}>
              <FontAwesome
                name="birthday-cake"
                size={16}
                color={colors.primary}
              />{" "}
              Төрсөн өдөр:{" "}
            </Text>
            {moment(cv.birth).format("YYYY-MM-DD")}
          </Text>
        )}
        {!cv.location === "" && (
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "200",
              marginTop: 5,
            }}
          >
            <Text style={{ fontFamily: "Sf-bold" }}>
              <EvilIcons name="location" size={16} color={colors.primary} />{" "}
              Оршин суудаг хаяг:{" "}
            </Text>
            {cv.location}
          </Text>
        )}
        {cv.salaryExpectation === "Сонгох" ? null : (
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "200",
              marginTop: 5,
            }}
          >
            <Text style={{ fontFamily: "Sf-bold" }}>
              <MaterialCommunityIcons
                name="cash-lock"
                size={16}
                color={colors.primary}
              />{" "}
              Цалингийн хүлээлт:{" "}
            </Text>
            {cv.salaryExpectation} ₮
          </Text>
        )}
        {cv.occupationName === "Сонгох" ? null : (
          <Text
            style={{
              color: colors.primaryText,
              marginTop: 5,
              fontWeight: "200",
            }}
          >
            <Text style={{ fontFamily: "Sf-bold" }}>
              <MaterialIcons
                name="business-center"
                size={16}
                color={colors.primary}
              />{" "}
              Мэргэжил:{" "}
            </Text>
            {cv.occupationName}
          </Text>
        )}
        {cv.education && (
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "200",
              marginTop: 5,
            }}
          >
            <Text style={{ fontFamily: "Sf-bold" }}>
              <MaterialIcons
                name="self-improvement"
                size={16}
                color={colors.primary}
              />{" "}
              Боловсрол:{" "}
            </Text>
            {cv.education}
          </Text>
        )}
        <Text
          style={{
            color: colors.primaryText,
            fontWeight: "200",
            marginTop: 5,
          }}
        >
          <Text style={{ fontFamily: "Sf-bold" }}>
            <AntDesign name="car" size={16} color={colors.primary} /> Жолооны
            үнэмлэх:
          </Text>{" "}
          {cv.driverLicense ? "Байгаа" : "Байхгүй"}
        </Text>
        {cv.type !== "Сонгох" && (
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "200",
              marginTop: 5,
            }}
          >
            <Text style={{ fontFamily: "Sf-bold", alignItems: "center" }}>
              <MaterialIcons
                name="access-time"
                size={16}
                color={colors.primary}
              />{" "}
              Цагийн төрөл:{" "}
            </Text>
            {cv.type}
          </Text>
        )}
      </TouchableOpacity>
      {/* Course */}
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Боловсрол
          </Text>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("CourseAddModal")}
          />
        </View>
        {cv.course.length > 0 ? (
          <View>
            {cv.course.map((e) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CourseDetailModal", {
                      data: e,
                    })
                  }
                  key={e._id}
                  style={{
                    backgroundColor: colors.border,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 2,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Сургууль: </Text>
                      {e.school}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginTop: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Мэргэжил: </Text>
                      {e.field}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "200",
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Голч дүн: </Text>
                      {e.grade}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "200",
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Элссэн: </Text>
                      {/* {e.start.slice(0, 4)} */}
                      {moment(e.start).format("YYYY")}
                    </Text>
                    {e.isStudying ? (
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                          marginTop: 5,
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Статус: </Text>
                        Суралцаж байгаа
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginTop: 5,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Төгссөн:</Text>{" "}
                        {moment(e.end).format("YYYY")}
                      </Text>
                    )}
                  </View>
                  <SimpleLineIcons
                    name="pencil"
                    size={24}
                    color={colors.primaryText}
                    style={{ position: "absolute", right: 10 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              width: "90%",
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageBackground
                source={require("../../../../../assets/ihelp/ggwp1.png")}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 10 }}
              >
                <Ionicons
                  name={"school-outline"}
                  size={24}
                  color={colors.primaryText}
                />
              </ImageBackground>
              <Text style={{ fontSize: 30, color: colors.primaryText }}>
                {" "}
                Боловсрол
              </Text>
            </View>
            <Text style={{ color: colors.secondaryText, marginTop: 20 }}>
              Та өөрийн боловсролын талаар мэдээлэл оруулж анкетаа илүү
              дэлгэрүүлнэ үү
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 10,
                backgroundColor: "#FFB6C1",
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 15,
              }}
              onPress={() => navigation.navigate("CourseAddModal")}
            >
              <Text style={{ color: colors.border }}>Нэмэх</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
      {/* Experience */}
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            Туршлага
          </Text>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("ExperienceAddModal")}
          />
        </View>
        {cv.experience.length > 0 ? (
          <View>
            {cv.experience.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ExperienceDetailModal", {
                      data: item,
                    })
                  }
                  key={item._id}
                  style={{
                    backgroundColor: colors.border,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 2,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    {item.company && (
                      <Text
                        style={{ color: colors.primaryText, fontWeight: "200" }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          Байгууллага:{" "}
                        </Text>
                        {item.company}
                      </Text>
                    )}
                    {item.position && (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginVertical: 5,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          Албан тушаал:{" "}
                        </Text>
                        {item.position}
                      </Text>
                    )}
                    {item.type && (
                      <Text
                        style={{ color: colors.primaryText, fontWeight: "200" }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Төрөл: </Text>
                        {item.type}
                      </Text>
                    )}
                    {item.location && (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginVertical: 5,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Хаяг: </Text>
                        {item.location}
                      </Text>
                    )}
                    {item.start && (
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                          marginBottom: 5,
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          Ажилд орсон:{" "}
                        </Text>
                        {moment(item.start).format("YYYY")}
                      </Text>
                    )}
                    {item.isWorking ? (
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Статус: </Text>
                        Ажиллаж байгаa
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          Ажлаас гарсан:{" "}
                        </Text>
                        {item.end && item.end.slice(0, 4)}
                      </Text>
                    )}
                    {item.contactInfo && (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginVertical: 5,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          Холбогдох албан тушаалтан:{" "}
                        </Text>
                        {item.contactInfo}
                      </Text>
                    )}
                    {item.exitCause && (
                      <Text
                        style={{ color: colors.primaryText, fontWeight: "200" }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          Гарсан шалтгаан:{" "}
                        </Text>
                        {item.exitCause}
                      </Text>
                    )}
                    {item.achievements && (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginVertical: 5,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Шагнал: </Text>
                        {item.achievements}
                      </Text>
                    )}
                    {item.do && (
                      <Text
                        style={{ color: colors.primaryText, fontWeight: "200" }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          Хийсэн ажил:{" "}
                        </Text>
                        {item.do}
                      </Text>
                    )}
                    {item.description && (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginTop: 5,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Тайлбар: </Text>
                        {item.description}
                      </Text>
                    )}
                  </View>
                  <SimpleLineIcons
                    name="pencil"
                    size={24}
                    color={colors.primaryText}
                    onPress={() =>
                      navigation.navigate("ExperienceDetailModal", {
                        data: item,
                      })
                    }
                    style={{ position: "absolute", right: 10 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              width: "90%",
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageBackground
                source={require("../../../../../assets/ihelp/ggwp1.png")}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 10 }}
              >
                <Ionicons
                  name={"bar-chart-outline"}
                  size={24}
                  color={colors.primaryText}
                />
              </ImageBackground>
              <Text style={{ fontSize: 30, color: colors.primaryText }}>
                {" "}
                Туршлага
              </Text>
            </View>
            <Text style={{ color: colors.secondaryText, marginTop: 20 }}>
              Та өөрийн ажлын туршлагын талаар мэдээлэл оруулж анкетаа илүү
              дэлгэрүүлнэ үү
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 10,
                backgroundColor: "#FFB6C1",
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 15,
              }}
              onPress={() => navigation.navigate("ExperienceAddModal")}
            >
              <Text style={{ color: colors.border }}>Нэмэх</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
      {/* family */}
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            Гэр бүлийн мэдээлэл
          </Text>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("FamilyAddModal")}
          />
        </View>
        {cv.family.length > 0 ? (
          <View>
            {cv.family.map((item) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  style={{
                    backgroundColor: colors.border,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 2,
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("FamilyDetailModal", {
                      data: item,
                    })
                  }
                >
                  <View>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <FontAwesome5
                          name="people-arrows"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Хэн болох:{" "}
                      </Text>
                      {item.who}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <EvilIcons
                          name="pencil"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Овог нэр:{" "}
                      </Text>
                      {item.lastName} {item.firstName}
                    </Text>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign
                          name="phone"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Утасны дугаар:{" "}
                      </Text>
                      {item.phone}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign
                          name="calendar"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Төрсөн он сар өдөр:{" "}
                      </Text>
                      {item.birthYear}
                    </Text>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <MaterialIcons
                          name="self-improvement"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Мэргэжил:{" "}
                      </Text>
                      {item.profession}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginTop: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <EvilIcons
                          name="location"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Төрсөн газар:{" "}
                      </Text>
                      {item.birthPlace}
                    </Text>
                  </View>
                  <SimpleLineIcons
                    name="pencil"
                    size={24}
                    color={colors.primaryText}
                    onPress={() =>
                      navigation.navigate("FamilyDetailModal", {
                        data: item,
                      })
                    }
                    style={{ position: "absolute", right: 10 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              width: "90%",
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageBackground
                source={require("../../../../../assets/ihelp/ggwp1.png")}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 10 }}
              >
                <Ionicons
                  name={"md-people-outline"}
                  size={24}
                  color={colors.primaryText}
                />
              </ImageBackground>
              <Text style={{ fontSize: 30, color: colors.primaryText }}>
                {" "}
                Гэр бүл
              </Text>
            </View>
            <Text style={{ color: colors.secondaryText, marginTop: 20 }}>
              Та өөрийн гэр бүлийн талаар мэдээлэл оруулж анкетаа илүү
              дэлгэрүүлнэ үү
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 10,
                backgroundColor: "#FFB6C1",
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 15,
              }}
              onPress={() => navigation.navigate("FamilyAddModal")}
            >
              <Text style={{ color: colors.border }}>Нэмэх</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
      {/* Хэлний чадвар */}
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            Гадаад хэл
          </Text>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("LanguageAddModal")}
          />
        </View>
        <View>
          {cv.language.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LanguagePackageModal", {
                  data: cv.language,
                })
              }
              style={{ borderRadius: 10 }}
            >
              {cv.language.map((item) => {
                return (
                  <View
                    key={item._id}
                    style={{
                      backgroundColor: colors.border,
                      padding: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: 10,
                      marginBottom: 5,
                    }}
                  >
                    <View>
                      <Text
                        style={{ color: colors.primaryText, fontWeight: "200" }}
                      >
                        {item.country} - {item.level}
                      </Text>
                    </View>
                    <SimpleLineIcons
                      name="pencil"
                      size={20}
                      color={colors.primaryText}
                      onPress={() =>
                        navigation.navigate("LanguagePackageModal", {
                          data: cv.language,
                        })
                      }
                      style={{ position: "absolute", right: 10 }}
                    />
                  </View>
                );
              })}
            </TouchableOpacity>
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                width: "90%",
                marginHorizontal: 20,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ImageBackground
                  source={require("../../../../../assets/ihelp/ggwp1.png")}
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <Ionicons
                    name={"earth"}
                    size={24}
                    color={colors.primaryText}
                  />
                </ImageBackground>
                <Text style={{ fontSize: 30, color: colors.primaryText }}>
                  {" "}
                  Гадаад хэл
                </Text>
              </View>
              <Text style={{ color: colors.secondaryText, marginTop: 20 }}>
                Та өөрийн гадаад хэлний мэдлэгийн талаар мэдээлэл оруулж анкетаа
                илүү дэлгэрүүлнэ үү
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "#FFB6C1",
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 15,
                }}
                onPress={() => navigation.navigate("LanguageAddModal")}
              >
                <Text style={{ color: colors.border }}>Нэмэх</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </>
      {/* Achievment */}
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 20,
              paddingVertical: 10,
            }}
          >
            Гавьяа шагнал
          </Text>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("AchievmentAddModal")}
          />
        </View>
        {cv.achievement.length > 0 ? (
          <View>
            {cv.achievement.map((item) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  style={{
                    backgroundColor: colors.border,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 2,
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("AchievmentDetailModal", {
                      data: item,
                    })
                  }
                >
                  <View>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <MaterialCommunityIcons
                          name="home-plus-outline"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Байгууллага:{" "}
                      </Text>
                      {item.company}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign
                          name="calendar"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Он:{" "}
                      </Text>
                      {item.achievementYear}
                    </Text>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <Ionicons
                          name="medal-outline"
                          size={16}
                          color={colors.primary}
                        />{" "}
                        Шагналын нэр:{" "}
                      </Text>
                      {item.name}
                    </Text>
                  </View>
                  <SimpleLineIcons
                    name="pencil"
                    size={24}
                    color={colors.primaryText}
                    onPress={() =>
                      navigation.navigate("AchievmentDetailModal", {
                        data: item,
                      })
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              width: "90%",
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageBackground
                source={require("../../../../../assets/ihelp/ggwp1.png")}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 10 }}
              >
                <Ionicons
                  name={"medal-outline"}
                  size={24}
                  color={colors.primaryText}
                />
              </ImageBackground>
              <Text style={{ fontSize: 30, color: colors.primaryText }}>
                {" "}
                Гавьяа шагнал
              </Text>
            </View>
            <Text style={{ color: colors.secondaryText, marginTop: 20 }}>
              Та өөрийн гавьяа шагналын талаар мэдээлэл оруулж анкетаа илүү
              дэлгэрүүлнэ үү
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 10,
                backgroundColor: "#FFB6C1",
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 15,
              }}
              onPress={() => navigation.navigate("AchievmentAddModal")}
            >
              <Text style={{ color: colors.border }}>Нэмэх</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
      {/* skill */}
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            Ур чадвар
          </Text>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
            onPress={() =>
              navigation.navigate("SkillDetailModal", { data: cv.skill })
            }
          />
        </View>
        {cv.skill && (
          <View>
            {cv.skill.advantage1 && (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.border,
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 2,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("SkillDetailModal", { data: cv.skill })
                }
              >
                <View>
                  {cv.skill.advantage1 && (
                    <>
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>
                          <AntDesign
                            name="upcircleo"
                            size={16}
                            color={"#64e986"}
                          />{" "}
                          Чадвар 1:{" "}
                        </Text>
                        {cv.skill.advantage1}
                      </Text>
                    </>
                  )}
                  {cv.skill.advantage2 && (
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign
                          name="upcircleo"
                          size={16}
                          color={"#64e986"}
                        />{" "}
                        Чадвар 2:{" "}
                      </Text>
                      {cv.skill.advantage2}
                    </Text>
                  )}
                  {cv.skill.advantage3 && (
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign
                          name="upcircleo"
                          size={16}
                          color={"#64e986"}
                        />{" "}
                        Чадвар 3:{" "}
                      </Text>
                      {cv.skill.advantage3}
                    </Text>
                  )}
                  {cv.skill.advantage4 && (
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign
                          name="upcircleo"
                          size={16}
                          color={"#64e986"}
                        />{" "}
                        Чадвар 4:{" "}
                      </Text>
                      {cv.skill.advantage4}
                    </Text>
                  )}
                  {cv.skill.disAdvantage1 && (
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign name="downcircleo" size={16} color={"red"} />{" "}
                        Сул тал 1:{" "}
                      </Text>
                      {cv.skill.disAdvantage1}
                    </Text>
                  )}
                  {cv.skill.disAdvantage2 && (
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign name="downcircleo" size={16} color={"red"} />{" "}
                        Сул тал 2:{" "}
                      </Text>
                      {cv.skill.disAdvantage2}
                    </Text>
                  )}
                  {cv.skill.disAdvantage3 && (
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign name="downcircleo" size={16} color={"red"} />{" "}
                        Сул тал 3:{" "}
                      </Text>
                      {cv.skill.disAdvantage3}
                    </Text>
                  )}
                  {cv.skill.disAdvantage4 && (
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginTop: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        <AntDesign name="downcircleo" size={16} color={"red"} />{" "}
                        Сул тал 4:{" "}
                      </Text>
                      {cv.skill.disAdvantage4}
                    </Text>
                  )}
                </View>
                <SimpleLineIcons
                  name="pencil"
                  size={24}
                  color={colors.primaryText}
                  onPress={() =>
                    navigation.navigate("SkillDetailModal", {
                      data: cv.skill,
                    })
                  }
                  style={{ position: "absolute", right: 10 }}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </>
      {/* өөрийн тухай */}
      <View style={{ marginTop: 10 }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                // marginBottom: 20,
              }}
            >
              Өөрийн тухай
            </Text>
            <SimpleLineIcons
              name="pencil"
              size={24}
              color={colors.primaryText}
              style={{ position: "absolute", right: 10 }}
              onPress={() => {
                navigation.navigate("EditAbout", {
                  about: userProfile.about,
                });
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditAbout", {
                about: userProfile.about,
              });
            }}
            style={{
              backgroundColor: colors.border,
              borderRadius: 10,
              padding: 10,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                borderWidth: userProfile.about ? 0 : 1,
                borderColor: colors.border,
                color: userProfile.about
                  ? colors.primaryText
                  : colors.secondaryText,
                fontSize: 14,
                padding: 10,
                paddingBottom: 40,
                borderRadius: 10,
              }}
            >
              {userProfile.about
                ? userProfile.about
                : "Өөрийн тухай оруулна уу"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 200 }} />
    </ScrollView>
  );
};

export default CreateCvScreen;

const styles = StyleSheet.create({});
