import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { lightTheme } from "./src/themes/light";
import { darkTheme } from "./src/themes/dark.js";
import StackNavigator from "./src/stack/StackNavigator";
import { UserStore } from "./src/context/UserContext";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
export default function App() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    "Sf-heavy": require("./assets/fonts/SF-Pro-Text-Heavy.otf"),
    "Sf-bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    "Sf-regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    "Sf-medium": require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    "Sf-thin": require("./assets/fonts/SF-Pro-Text-Thin.otf"),
    "Sf-Nunito": require("./assets/fonts/Nunito-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer theme={colorScheme === "dark" ? darkTheme : darkTheme}>
      <RootSiblingParent>
        <UserStore>
          <StackNavigator />
          <StatusBar style="light" />
        </UserStore>
      </RootSiblingParent>
    </NavigationContainer>
  );
}
