import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "Sf-Heavy": require("../../assets/fonts/SF-Pro-Text-Heavy.otf"),
          "Sf-bold": require("../../assets/fonts/SF-Pro-Text-Bold.otf"),
          "Sf-medium": require("../../assets/fonts/SF-Pro-Text-Medium.otf"),
          "Sf-regular": require("../../assets/fonts/SF-Pro-Text-Regular.otf"),
          "Sf-thin": require("../../assets/fonts/SF-Pro-Text-Thin.otf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return [isLoadingComplete];
}
