import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
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
import Spinner from "../../../../components/Spinner";
const CreateCvScreen = (props) => {
  const { id } = props.route.params;
  const [cv, cvLoading] = useCv(id);
  const [userProfile, profileLoading] = useUserProfile(id);
  const { colors } = useTheme();
  const navigation = useNavigation();
  // if (profileLoading || cvLoading) {
  //   return <Spinner />;
  // }

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
      <>
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
        <TouchableOpacity
          style={{
            backgroundColor: colors.border,
            padding: 10,
            justifyContent: "space-between",
            marginVertical: 2,
            borderRadius: 20,
          }}
          onPress={() =>
            navigation.navigate("PersonalDetailModal", { data: cv })
          }
        >
          <Text style={{ color: colors.primaryText, fontWeight: "200" }}>
            <Text style={{ fontFamily: "Sf-bold" }}>
              <FontAwesome5
                name="network-wired"
                size={14}
                color={colors.primary}
              />
              {""}
              Овог нэр:{" "}
            </Text>
            {cv.lastName} {cv.firstName}{" "}
          </Text>
          <Text
            style={{
              color: colors.primaryText,
              marginVertical: 5,
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
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "200",
            }}
          >
            <Text style={{ fontFamily: "Sf-bold" }}>
              <EvilIcons name="location" size={16} color={colors.primary} />{" "}
              Оршин суудаг хаяг:{" "}
            </Text>
            {cv.location}
          </Text>
          <Text
            style={{
              color: colors.primaryText,
              marginVertical: 5,
              fontWeight: "200",
            }}
          >
            <Text style={{ fontFamily: "Sf-bold" }}>
              <MaterialIcons
                name="self-improvement"
                size={16}
                color={colors.primary}
              />{" "}
              Мэргэжил:{" "}
            </Text>
            {cv.profession}
          </Text>
          <Text style={{ color: colors.primaryText, fontWeight: "200" }}>
            <Text style={{ fontFamily: "Sf-bold" }}>
              <MaterialIcons
                name="connect-without-contact"
                size={15}
                color={colors.primary}
              />{" "}
              Яааралтай үед холбоо барих:{" "}
            </Text>
            {cv.phoneEmergency ? cv.phoneEmergency : "Хоосон"}
          </Text>
          <Text
            style={{
              color: colors.primaryText,
              marginTop: 5,
              fontWeight: "200",
            }}
          >
            <Text style={{ fontFamily: "Sf-bold" }}>
              <AntDesign name="car" size={16} color={colors.primary} /> Жолооны
              үнэмлэх:{" "}
            </Text>
            {cv.driverLicense ? "Байгаа" : "Байхгүй"}
          </Text>
        </TouchableOpacity>
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
        {cv.achievement && (
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
                    borderRadius: 20,
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
                        Компани:{" "}
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
                      {item.year}
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
        )}
      </>
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
        {cv.course && (
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
                    borderRadius: 20,
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
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Мэргэжил: </Text>
                      {e.field}
                    </Text>

                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        Нэмэлт мэдээлэл:{" "}
                      </Text>
                      {e.description}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Голч дүн: </Text>
                      {e.grade}
                    </Text>

                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Эхэлсэн: </Text>
                      {e.start.slice(0, 4)}
                    </Text>
                    {!e.isStudying ? (
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Статус: </Text>
                        сурж бгаа
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginTop: 5,
                          fontWeight: "200",
                        }}
                      >
                        <Text style={{ fontFamily: "Sf-bold" }}>Статус:</Text>
                        {e.end && e.end.slice(0, 4)}
                      </Text>
                    )}
                  </View>
                  <SimpleLineIcons
                    name="pencil"
                    size={24}
                    color={colors.primaryText}
                  />
                </TouchableOpacity>
              );
            })}
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
        {cv.experience && (
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
                    borderRadius: 20,
                  }}
                >
                  <View>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Компани: </Text>
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
                        Албан тушаал:{" "}
                      </Text>
                      {item.position}
                    </Text>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>Төрөл: </Text>
                      {item.type}
                    </Text>
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
                      {item.start && item.start.slice(0, 4)}
                    </Text>
                    {item.isWorking ? (
                      <Text
                        style={{
                          color: colors.primaryText,
                          marginVertical: 5,
                          fontWeight: "200",
                        }}
                      >
                        Одоог хүртэл ажиллаж байгаа
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
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginVertical: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        Холбоо барих:{" "}
                      </Text>
                      {item.contactInfo}
                    </Text>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        Гарсан шалтгаан:{" "}
                      </Text>
                      {item.exitCause}
                    </Text>
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
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "200" }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        Хийсэн ажил:{" "}
                      </Text>
                      {item.do}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        marginTop: 5,
                        fontWeight: "200",
                      }}
                    >
                      <Text style={{ fontFamily: "Sf-bold" }}>
                        Дэлгэрэнгүй мэдээлэл:{" "}
                      </Text>
                      {item.description}
                    </Text>
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
                  />
                </TouchableOpacity>
              );
            })}
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
        {cv.family && (
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
                    borderRadius: 20,
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
                  />
                </TouchableOpacity>
              );
            })}
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
            Хэлний чадвар
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
          {cv.language && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LanguagePackageModal", {
                  data: cv.language,
                })
              }
              style={{ borderRadius: 20 }}
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
                      borderRadius: 20,
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
                      size={24}
                      color={colors.primaryText}
                      onPress={() =>
                        navigation.navigate("LanguagePackageModal", {
                          data: item,
                        })
                      }
                      style={{ marginRight: 5 }}
                    />
                  </View>
                );
              })}
            </TouchableOpacity>
          )}
        </View>
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
                  borderRadius: 20,
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
              style={{ marginRight: 10 }}
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
              borderRadius: 20,
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
                : "Та өөрийгөө таниулцана уу..."}
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
