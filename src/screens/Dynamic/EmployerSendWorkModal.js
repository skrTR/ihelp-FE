import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { api } from "../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import Border from "../../components/Border";
import UserContext from "../../context/UserContext";

const EmployerSendWorkModal = (props) => {
  const { id, isSentCv } = props.route.params;
  const state = useContext(UserContext);
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const [userProfile] = useUserProfile(state.userId);
  const navigation = useNavigation();
  const getCvData = () => {
    axios
      .get(`${api}/api/v1/questionnaires/${state.userId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendCv = () => {
    axios
      .post(`${api}/api/v1/applies/${id}/profile`)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCvData();
  }, []);
  if (!userProfile) {
    return null;
  }

  const html = `
    <html lang="en">
  
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <style>
        * {
      box-sizing: border-box;
    }   
        p {
            font-size: 18px;
        }
        .column {
      float: left;
      width: 50%;
      padding: 10px;
      height: 300px; 
      align-items: center;
    }
    .row:after {
      content: "";
      display: table;
      clear: both;
      align-items: center;
    }
    </style> 
    <body>
        <div style="font-family:Arial, Helvetica, sans-serif;">
            <h1 style="margin-top: 120px;">
                ${data.lastName} ${data.firstName}
            </h1>
            <div class="row">
            <div class="column">
                <img width="63%" src="${api}/upload/${data.profile}" alt="">
            </div>
            <div class="column"  style="float:right; padding-right: 15%; ">
                <h3 style="color: #338DFF;"> CONTACTS</h3>
                <p">Born in Erdenet city, Mongolia <br>
                    Lives in Ulaanbaatar, Mongolia <br>
                    <span style="font-size:12px;"> address </span> </p>
                <br>
                <a  href="naki.mongolia@gmail.com">naki.mongolia@gmail.com</a> <br>
                <a  href="namkhaidorj@ihelp.mn">namkhaidorj@ihelp.mn</a> <br>
                <span  style="font-size: 12px;"> e-mail </span>      
                <p> 
                    976-99757475 <br>
                    <span style="font-size: 12px;"> phone number </span>
                </p>
            </div>
        </div>
            <h3> <span style="color: #338DFF;">⭐EXPERIENCES </span></h3>
            <div>
              ${
                data.experience &&
                data.experience.map((e) => {
                  return e.end;
                })
              }
              </div>
            <h3 style="color: #338DFF;">🎓 EDUCATION</h3>
            <div>
                <p>· International Business Management & Marketing, Pre-master’s program, University of Sheffield, UK,
                    2019-2020</p>
                <p>· Bachelor of International Economic Relations, National University of Mongolia (NUM), School of
                    International Relations and Public Administration (SIRPA), 2012 to 2016</p>
                <p>· High school education, Erdmiin san school, Erdenet city, Mongolia, 2009-2012</p>
            </div>
            <h3 style="color: #338DFF;">👑 AWARDS</h3>
            <div>
                <p>· Best of the year, Bloomberg TV Mongolia, National News Corporation LLC, 2019 </p>
                <p>· The Leader Youngman of the Year, Mongolian Youth Organization, 2018</p>
                <p>· The first place in the essay contest, “Passport to the world”, Education USA /EARC/, 2016</p>
                <p>· The best delegate prize of the Model United Nations, awarded by NUM-SIRPA, 2015</p>
                <p>· Student’s scholarship awarded by Zorig Foundation & LG, 2014 </p>
                <p>· 3rd place in essay contest of World peaceful day, 2012</p>
            </div>
            <h3 style="color: #338DFF;">💻 COMPUTER SKILLS</h3>
            <div>
                <p>· <span style="color: blue;">Basic: </span>Windows software, macOS</p>
                <p>· <span style="color: blue;">Intermediate: </span>Camtasia Studio, Microsoft Dynamic NAV</p>
                <p>· <span style="color: blue;">Advanced: </span>Google apps; Microsoft office; other online platforms</p>
            </div>
            <h3 style="color: #338DFF;">✏️ LANGUAGE</h3>
            <div>
                <p>· <span style="color: blue;">Native: </span> Mongolian, <span style="color: blue;"> Advanced:
                    </span>English</p>
            </div>
            <h3 style="color: #338DFF;">🎲 HOBBIES AND INTERESTS</h3>
            <div>
                <p>· <span style="color: blue;"> Hosting: </span>Morning View Series – Motivational & inspirational content
                    that interviews successful leaders to share their experience, principles & philosophy to youth -
                    <br> <span><a href=" www.youtube.com/c/morningviewseries"> www.youtube.com/c/morningviewseries</a>
                    </span>
                </p>
                <p>· <span style="color: blue;"> Volunteering: </span>One Asia 2015</p>
                <p>· <span style="color: blue;"> Public speaking: </span>World Speech day 2016; NUM-SIRPA UN Model 2015;
                    Mongolian National Orator Championship 2015; Scientific conferences etc.</p>
            </div>
            <h2 style="color:#338DFF ;">DETAILED SKILLS & ACHIEVEMENTS</h2>
            <p>✓ Experienced in business planning, customer acquisition, negotiation, communication and event organization
            </p>
            <p>✓ Expanded acquaintance and communication</p>
            <p>✓ Increased interpretation skills and ability to make understand individual</p>
            <p>✓ Improved leadership skills</p>
            <p>✓ Enhanced skills in research and development</p>
            <p>✓ Strengthened motivation to reach targeted goals and ambition</p>
        </div>
    </body>
    </html>
    `;
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ marginHorizontal: 10, flexDirection: "row", marginTop: 10 }}
        >
          <Image
            source={{ uri: `${api}/upload/${data.profile}` }}
            style={{ width: 100, height: 100 }}
          />
          {/* Holboo barih */}
          <View
            style={{
              alignContent: "flex-end",
              width: "75%",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 18,
                textAlign: "right",
              }}
            >
              Холбоо барих
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              Born in {data.birthPlace}
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              Lives in {data.location}
            </Text>
            <Text style={{ color: colors.primary, textAlign: "right" }}>
              {userProfile.email}
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              И-мэйл
            </Text>
            <Text style={{ color: colors.primary, textAlign: "right" }}>
              {userProfile.phone}
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              Утасны дугаар
            </Text>
          </View>
          {/* Experience */}
        </View>

        <View style={{ marginHorizontal: 10 }}>
          {data.experience && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Ажлын туршлага
              </Text>
              {data.experience.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "70%",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Image
                        source={{ uri: `${api}/upload/${e.companyPhoto}` }}
                        style={{ width: 60, height: 60 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontFamily: "Sf-bold",
                            color: colors.primaryText,
                          }}
                        >
                          Компани: {e.company}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Албан тушаал: {e.position}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Цагийн төрөл: {e.type}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Хаяг: {e.location}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Ажилд орсон: {e.start && e.start.slice(0, 10)}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Ажлаас гарсан: {e.end && e.end.slice(0, 10)}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Ажлаас гарсан шалтгаан: {e.exitCause}
                        </Text>
                      </View>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.course && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Боловсрол
              </Text>
              {data.course.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "70%",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Image
                        source={{ uri: `${api}/upload/${e.schoolPhoto}` }}
                        style={{ width: 60, height: 60 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontFamily: "Sf-bold",
                            color: colors.primaryText,
                          }}
                        >
                          Сургууль: {e.school}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Анги: {e.grade}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Чиглэл: {e.field}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Элссэн огноо: {e.start && e.start.slice(0, 10)}
                        </Text>
                        {e.end ? (
                          <Text style={{ color: colors.primaryText }}>
                            Гарсан огноо: {e.end && e.end.slice(0, 10)}
                          </Text>
                        ) : (
                          <Text style={{ color: colors.primaryText }}>
                            Төгссөн
                          </Text>
                        )}
                      </View>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.achievement && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Шагнал медал
              </Text>
              {data.achievement.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        width: "70%",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Text
                        style={{
                          fontFamily: "Sf-bold",
                          color: colors.primaryText,
                        }}
                      >
                        Компани: {e.company}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Нэр: {e.name}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Он: {e.year}
                      </Text>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.language && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Хэлний чадвар
              </Text>
              {data.language.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        width: "70%",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Text
                        style={{
                          fontFamily: "Sf-bold",
                          color: colors.primaryText,
                        }}
                      >
                        Улс: {e.country}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Чадвар: {e.level}
                      </Text>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.family && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Гэр бүлийн мэдээлэл
              </Text>
              {data.family.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        width: "70%",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      {e.who && (
                        <Text style={{ color: colors.primaryText }}>
                          Хэн болох: {e.who}
                        </Text>
                      )}
                      {e.lastName && e.firstName && (
                        <Text
                          style={{
                            color: colors.primaryText,
                          }}
                        >
                          Овог нэр: {e.lastName} {e.firstName}
                        </Text>
                      )}
                      {e.profession && (
                        <Text style={{ color: colors.primaryText }}>
                          Мэргэжил: {e.profession}
                        </Text>
                      )}
                      {e.birthPlace && (
                        <Text style={{ color: colors.primaryText }}>
                          Төрсөн газар: {e.birthPlace}
                        </Text>
                      )}
                      {e.birthYear && (
                        <Text style={{ color: colors.primaryText }}>
                          Төрсөн он: {e.birthYear}
                        </Text>
                      )}
                      {e.workingCompany && (
                        <Text style={{ color: colors.primaryText }}>
                          Ажилдаг газар: {e.workingCompany}
                        </Text>
                      )}
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.skill && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Хувийн ур чадвар
              </Text>

              <View
                style={{
                  width: "70%",
                  marginTop: 10,
                }}
              >
                {data.skill.advantage1 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар1: {data.skill.advantage1}
                  </Text>
                )}
                {data.skill.advantage2 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар2: {data.skill.advantage2}
                  </Text>
                )}
                {data.skill.advantage3 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар3: {data.skill.advantage3}
                  </Text>
                )}
                {data.skill.advantage4 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар4: {data.skill.advantage4}
                  </Text>
                )}
                {data.skill.disAdvantage1 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал1: {data.skill.disAdvantage1}
                  </Text>
                )}
                {data.skill.disAdvantage2 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал2: {data.skill.disAdvantage2}
                  </Text>
                )}
                {data.skill.disAdvantage3 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал3: {data.skill.disAdvantage3}
                  </Text>
                )}
                {data.skill.disAdvantage4 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал4: {data.skill.disAdvantage4}
                  </Text>
                )}
              </View>
              <Border margin={10} />
            </>
          )}
        </View>
        {/* Tatah */}
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 10,
            margin: 20,
          }}
          onPress={printToFile}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Татах
          </Text>
        </TouchableOpacity>
        {/* Ajliin sanal tavih */}
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 10,
            margin: 20,
          }}
          onPress={sendCv}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            {isSentCv ? "Ажлын санал илгээгдсэн" : "Ажлын санал тавих"}
          </Text>
        </TouchableOpacity>
        {/* Profile ruu ochih */}
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 10,
            margin: 20,
          }}
          onPress={() => {
            navigation.navigate("Профайл", {
              screen: "UserProfileScreen",
            });
          }}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Анкет янзлах
          </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployerSendWorkModal;

const styles = StyleSheet.create({});
