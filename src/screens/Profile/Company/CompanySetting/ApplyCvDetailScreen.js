import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import useUserProfile from "../../../../hooks/ProfileDetail/User/useUserProfile";
import Border from "../../../../components/Border.js";

import moment from "moment";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ApplyCvDetailScreen = (props) => {
  const { id, applyId } = props.route.params;
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const [userProfile] = useUserProfile(id);
  const navigation = useNavigation();
  const [experience, setExperience] = useState([]);
  const [course, setCourse] = useState([]);
  const [achievement, setAchievment] = useState([]);
  const [language, setLanguage] = useState([]);
  const [skill, setSkill] = useState([]);
  const [family, setFamily] = useState([]);
  const insents = useSafeAreaInsets();
  const getViewed = () => {
    axios
      .get(`${api}/api/v1/applies/${applyId}`)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
      });
  };
  const getCvData = () => {
    axios
      .get(`${api}/api/v1/questionnaires/${id}`)
      .then((res) => {
        setData(res.data.data);
        setSkill(res.data.data.skill);
        setExperience(res.data.data.experience);
        setCourse(res.data.data.course);
        setAchievment(res.data.data.achievement);
        setLanguage(res.data.data.language);
        setFamily(res.data.data.family);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCvData();
    if (applyId) {
      getViewed();
    }
  }, []);
  if (!userProfile) {
    return null;
  }
  const createDynamicData = () => {
    var experiences = "";
    for (let i in experience) {
      const item = experience[i];
      experiences =
        experiences +
        `<div>
        <p>· ${item.position}, <span> ${item.company}, ${
          item.location
        },</span> ${moment(item.start).format("MM-YYYY")}, ${
          item.isWorking ? "одоог хүртэл" : moment(item.end).format("MM-YYYY")
        } </p>
      </div>`;
    }
    var courses = "";
    for (let i in course) {
      const courseData = course[i];
      courses =
        courses +
        `<div>
        <p>· ${courseData.field}, <span> ${courseData.school} ,</span> ${moment(
          courseData.start
        ).format("MM-YYYY")}, ${
          courseData.isStudying
            ? "Сургалцаж байгаа"
            : moment(courseData.end).format("MM-YYYY")
        } </p>
      </div>`;
    }
    var achievements = "";
    for (let i in achievement) {
      const achievementData = achievement[i];
      achievements =
        achievements +
        `<div>
    <p>· ${achievementData.name}, <span> ${achievementData.company} ,</span> ${achievementData.achievementYear} </p>
  </div>`;
    }
    var languages = "";
    for (let i in language) {
      const languageData = language[i];
      languages =
        languages +
        `<div>
    <p>· ${languageData.country}, <span> ${languageData.level}</span>  </p>
  </div>`;
    }
    var skills = "";
    skills =
      skills +
      `<div>
        ${skill.advantage1 === null ? `<br/>` : `<p>✓ ${skill.advantage1}</p>`}
        ${skill.advantage2 === null ? `<br/>` : `<p>✓ ${skill.advantage2}</p>`}
        ${skill.advantage3 === null ? `<br/>` : `<p>✓ ${skill.advantage3}</p>`}
        ${skill.advantage4 === null ? `<br/>` : `<p>✓ ${skill.advantage4}</p>`} 
        ${
          skill.disAdvantage1 === null
            ? `<br/>`
            : `<p>✓ ${skill.disAdvantage1}</p>`
        }
        ${
          skill.disAdvantage2 === null
            ? `<br/>`
            : `<p>✓ ${skill.disAdvantage2}</p>`
        }
        ${
          skill.disAdvantage3 === null
            ? `<br/>`
            : `<p>✓ ${skill.disAdvantage3}</p>`
        }
        ${
          skill.disAdvantage4 === null
            ? `<br/>`
            : ` <p>✓ ${skill.disAdvantage4}</p>`
        }    
  </div>`;

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
                <p">Born in ${
                  data.birthPlace === null ? `<br/>` : data.birthPlace
                } <br>
                    </p>
                <br>
                <a >${userProfile.email}</a> <br>
                <span  style="font-size: 12px;"> e-mail </span>      
                <p> 
                ${userProfile.phone} <br>
                    <span style="font-size: 12px;"> phone number </span>
                </p>
            </div>
        </div>
        <h3> <span style="color: #338DFF;">⭐EXPERIENCES </span></h3>
        <div>
        ${experiences}
         </div>
         <h3 style="color: #338DFF;">🎓 EDUCATION</h3>
            <div>
          ${courses}
            </div>
            <h3 style="color: #338DFF;">👑 AWARDS</h3>
            <div>
           ${achievements}
            </div>
            <h3 style="color: #338DFF;">✏️ LANGUAGE</h3>
            <div>
           ${languages}
            </div>
            <h2 style="color:#338DFF ;">DETAILED SKILLS & ACHIEVEMENTS</h2>
            <div>
            ${skills}
            </div>
        </div>
    </body>
    </html>
    `;
    return html;
  };
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html: createDynamicData(),
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Image
            source={{ uri: `${api}/upload/${data.profile}` }}
            style={{ width: 120, height: 120, borderRadius: 10 }}
          />
          {/* Holboo barih */}
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                color: colors.primaryText,
                // fontFamily: "Sf-bold",
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              Холбоо барих
            </Text>

            {userProfile.email && (
              <>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 14,
                    fontFamily: "Sf-thin",
                  }}
                >
                  И-мэйл
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 14,
                  }}
                >
                  {userProfile.email}
                </Text>
              </>
            )}
            {userProfile.phone && (
              <>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 14,
                    fontFamily: "Sf-thin",
                  }}
                >
                  Утасны дугаар
                </Text>
                <Text style={{ color: colors.primaryText, fontSize: 14 }}>
                  {userProfile.phone}
                </Text>
              </>
            )}
          </View>
          {/* Experience */}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            {data.birthPlace && (
              <>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 14,
                    fontFamily: "Sf-thin",
                  }}
                >
                  Төрсөн газар
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 14,
                  }}
                >
                  {data.birthPlace}
                </Text>
              </>
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            {data.location && (
              <>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 14,
                    fontFamily: "Sf-thin",
                  }}
                >
                  Амьдардаг газар
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 14,
                  }}
                >
                  {data.location}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Border margin={10} />
          {data.experience && (
            <>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                  marginTop: 10,
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
                        style={{ width: 60, height: 60, borderRadius: 10 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontWeight: "500",
                            color: colors.primaryText,
                            fontSize: 16,
                          }}
                        >
                          Байгууллага:
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: colors.primaryText,
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.company}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Албан тушаал:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.position}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Төрөл:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.type}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Хаяг:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.location}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Эхэлсэн:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {moment(e.start).format("YYYY-MM-DD")}
                          </Text>
                        </Text>
                        {e.isWorking ? (
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            Ажиллаж байгаа
                          </Text>
                        ) : (
                          <>
                            <Text
                              style={{
                                color: colors.primaryText,
                                fontWeight: "200",
                                fontSize: 16,
                              }}
                            >
                              Дууссан:
                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontWeight: "400",
                                  fontSize: 16,
                                }}
                              >
                                {" "}
                                {moment(e.end).format("YYYY-MM-DD")}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                color: colors.primaryText,
                                fontWeight: "200",
                                fontSize: 16,
                              }}
                            >
                              Гарсан шалтгаан:
                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontWeight: "400",
                                  fontSize: 16,
                                }}
                              >
                                {" "}
                                {e.exitCause}
                              </Text>
                            </Text>
                          </>
                        )}
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
                  color: colors.primaryText,
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
                        style={{ width: 60, height: 60, borderRadius: 10 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontWeight: "500",
                            color: colors.primaryText,
                            fontSize: 16,
                          }}
                        >
                          Сургууль:
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: colors.primaryText,
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.school}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Дамжаа:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.grade}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Мэргэжил:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.field}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Элссэн:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {moment(e.start).format("YYYY-MM-DD")}
                          </Text>
                        </Text>

                        {e.end ? (
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "200",
                              fontSize: 16,
                            }}
                          >
                            Төгссөн:
                            <Text
                              style={{
                                color: colors.primaryText,
                                fontWeight: "400",
                                fontSize: 16,
                              }}
                            >
                              {" "}
                              {moment(e.end).format("YYYY-MM-DD")}
                            </Text>
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            Сурч байгаа
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
                  color: colors.primaryText,
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
                          fontWeight: "500",
                          color: colors.primaryText,
                          fontSize: 16,
                        }}
                      >
                        Байгууллага:
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: colors.primaryText,
                            fontSize: 16,
                          }}
                        >
                          {" "}
                          {e.company}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                          fontSize: 16,
                        }}
                      >
                        Нэр:
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "400",
                            fontSize: 16,
                          }}
                        >
                          {" "}
                          {e.name}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                          fontSize: 16,
                        }}
                      >
                        Он:
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "400",
                            fontSize: 16,
                          }}
                        >
                          {" "}
                          {e.achievementYear}
                        </Text>
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
                  color: colors.primaryText,
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
                          fontWeight: "500",
                          color: colors.primaryText,
                          fontSize: 16,
                        }}
                      >
                        Хэл:
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: colors.primaryText,
                            fontSize: 16,
                          }}
                        >
                          {" "}
                          {e.country}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontWeight: "200",
                          fontSize: 16,
                        }}
                      >
                        Чадвар:
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "400",
                            fontSize: 16,
                          }}
                        >
                          {" "}
                          {e.level}
                        </Text>
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
                  color: colors.primaryText,
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
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Хэн болох:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.who}
                          </Text>
                        </Text>
                      )}
                      {e.lastName && e.firstName && (
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Овог нэр:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.lastName} {e.firstName}
                          </Text>
                        </Text>
                      )}
                      {e.profession && (
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Мэргэжил:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.profession}
                          </Text>
                        </Text>
                      )}
                      {e.birthPlace && (
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Төрсөн газар:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.birthPlace}
                          </Text>
                        </Text>
                      )}
                      {e.birthYear && (
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Төрсөн он:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.birthYear}
                          </Text>
                        </Text>
                      )}
                      {e.workingCompany && (
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontWeight: "200",
                            fontSize: 16,
                          }}
                        >
                          Ажилдаг газар:
                          <Text
                            style={{
                              color: colors.primaryText,
                              fontWeight: "400",
                              fontSize: 16,
                            }}
                          >
                            {" "}
                            {e.workingCompany}
                          </Text>
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
                  color: colors.primaryText,
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
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Чадвар1:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.advantage1}
                    </Text>
                  </Text>
                )}
                {data.skill.advantage2 && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Чадвар2:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.advantage2}
                    </Text>
                  </Text>
                )}
                {data.skill.advantage3 && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Чадвар3:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.advantage3}
                    </Text>
                  </Text>
                )}
                {data.skill.advantage4 && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Чадвар4:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.advantage4}
                    </Text>
                  </Text>
                )}
                {data.skill.disAdvantage1 && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Сул тал:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.disAdvantage1}
                    </Text>
                  </Text>
                )}
                {data.skill.disAdvantage2 && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Сул тал2:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.disAdvantage2}
                    </Text>
                  </Text>
                )}
                {data.skill.disAdvantage3 && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Сул тал3:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.disAdvantage3}
                    </Text>
                  </Text>
                )}
                {data.skill.disAdvantage4 && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontWeight: "200",
                      fontSize: 16,
                    }}
                  >
                    Сул тал4:
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      {data.skill.disAdvantage4}
                    </Text>
                  </Text>
                )}
              </View>
              <Border margin={10} />
            </>
          )}
        </View>
        {/* Profile ruu ochih */}
        {/* Tatah */}
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.border,
            marginHorizontal: 10,
            marginTop: 10,
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
            borderRadius: 10,
            marginVertical: 10,
            marginHorizontal: 10,
            borderColor: colors.border,
          }}
          onPress={() => navigation.navigate("UserSendWorkRequest", { id: id })}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Ажлын санал тавих
          </Text>
        </TouchableOpacity>
        {/* Profile ruu ochih */}
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.border,
            marginHorizontal: 10,
          }}
          onPress={() => navigation.navigate("ViewUserProfile", { id: id })}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Профайл руу очих
          </Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 100 }} />
      </ScrollView>
    </View>
  );
};

export default ApplyCvDetailScreen;

const styles = StyleSheet.create({});
