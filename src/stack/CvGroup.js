import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CvScreen from "../screens/Cv/CvScreen";
import CvDetailScreen from "../components/Cv/CvDetailScreen";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowing from "../screens/Dynamic/ViewUserFollowings";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import MyBackButton from "../components/Header/MyBackButton";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import ViewUserPost from "../screens/Dynamic/ViewUserPost";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
const CvGroup = () => {
  const CvStack = createNativeStackNavigator();
  return (
    <CvStack.Navigator>
      <CvStack.Screen
        name="CvScreen"
        component={CvScreen}
        options={{ headerShown: false }}
      />
      <CvStack.Screen
        name="CvDetailScreen"
        component={CvDetailScreen}
        options={{ headerShown: false, fullScreenGestureEnabled: true }}
      />
      <CvStack.Group>
        <CvStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <CvStack.Screen
          name="ViewUserFollower"
          component={ViewUserFollower}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <CvStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <CvStack.Screen
          name="ViewUserPosts"
          component={ViewUserPost}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Хэрэглэгчийн пост",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <CvStack.Screen
          name="UserSendWorkRequest"
          component={UserSendWorkRequest}
          options={{
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
        <CvStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
      </CvStack.Group>
    </CvStack.Navigator>
  );
};

export default CvGroup;
