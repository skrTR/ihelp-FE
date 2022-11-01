import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CountDown from "react-native-countdown-component";
import moment from "moment";
import { useTheme } from "@react-navigation/native";
const DataCountDown = ({ createdAt, text, owner }) => {
  const [totalDuration, setTotalDuration] = useState(0);
  const { colors } = useTheme();
  useEffect(() => {
    const fixedTime = moment(createdAt).format("YYYY-MM-DD hh:mm:ss");
    var date = moment().utcOffset("+08:00").format("YYYY-MM-DD hh:mm:ss");
    var diffr = moment.duration(moment(fixedTime).diff(moment(date)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    setTotalDuration(d);
  }, [createdAt]);
  return (
    <View>
      {totalDuration > 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-thin",
              left: 2,
            }}
          >
            {/* CV хүлээн авах эцсийн хугацаа:{" "} */}
            {text}:{" "}
          </Text>
          <CountDown
            until={totalDuration}
            size={12}
            digitStyle={{
              backgroundColor: owner ? "#2c3539" : "#FAB913",
              borderWidth: owner ? 1 : 0,
              borderColor: colors.border,
            }}
            digitTxtStyle={{ color: "#fff" }}
            timeLabels={{ d: "Өдөр", h: "Цаг", m: "Минут", s: "Секунд" }}
            timeLabelStyle={{ color: colors.primaryText }}
            style={{ marginLeft: 21 }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DataCountDown;
