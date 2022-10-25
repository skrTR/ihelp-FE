import { DefaultTheme } from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primaryText: "#18191A",
    secondaryText: "#b0b3b8",
    header: "white",
    // button: "#FADBD8",
    button: "#FFB6C1",
    specialCompany: "#8AAFC8",
    specialWork: "#FDEDEC",
    urgentWork: "#F9E79F",
  },
};
