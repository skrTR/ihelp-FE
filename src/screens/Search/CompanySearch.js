import { View, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
const CompanySearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "#141414" }}>
      <View
        style={{
          backgroundColor: "#141414",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          bottom: 0,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <View>
            <AntDesign
              name="left"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View>
            <Image
              source={require("../../../assets/ihelp/logo.png")}
              style={{
                width: 90,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <SimpleLineIcons
              name="equalizer"
              size={25}
              color={colors.primaryText}
              onPress={() => {
                navigation.navigate("CompanyFilterModal");
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.background,
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            borderColor: colors.border,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("EmployerSearch")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Ажил олгогч компани хайх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            borderColor: colors.border,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("EmployeeSearch")}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.primaryText,
            }}
          >
            Ажил хайгч компани хайх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            borderColor: colors.border,
          }}
          onPress={() => navigation.navigate("AllCompanySearch")}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.primaryText,
            }}
          >
            Бүгд
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CompanySearch;
