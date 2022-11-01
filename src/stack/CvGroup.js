import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CvScreen from "../screens/Cv/CvScreen";
import CvDetailScreen from "../components/Cv/CvDetailScreen";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import MyBackButton from "../components/Header/MyBackButton";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import ViewUserPost from "../screens/Dynamic/ViewUserPost";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import CompanySendWorkRequest from "../screens/Dynamic/CompanySendWorkRequest";
import EmployeeWorkDetail from "../screens/Employee/EmployeeWorkDetail";
import UserSortModal from "../screens/Cv/UserSortModal";
import SortResultModal from "../screens/Cv/SortResultModal";
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
        name="EmployeeWorkDetail"
        component={EmployeeWorkDetail}
        options={{ headerShown: false, fullScreenGestureEnabled: true }}
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
          options={{
            headerShown: true,
            // presentation: "formSheet",
            title: "Дагагч",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
        <CvStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            title: "Дагасан",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
        <CvStack.Screen
          name="ViewUserPosts"
          component={ViewUserPost}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            title: "Хэрэглэгчийн нийтлэл",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
        <CvStack.Screen
          name="UserSendWorkRequest"
          component={UserSendWorkRequest}
          options={{
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <CvStack.Screen
          name="CompanySendWorkRequest"
          component={CompanySendWorkRequest}
          options={{
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <CvStack.Screen
          name="UserSortModal"
          component={UserSortModal}
          options={{
            title: "Хэрэглэгч шүүх",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <CvStack.Screen
          name="SortResultModal"
          component={SortResultModal}
          options={{
            title: "Илэрц",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
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
