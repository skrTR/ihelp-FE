import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployeeScreen from "../screens/Employee/EmployeeScreen";
import EmployeeWorkDetail from "../screens/Employee/EmployeeWorkDetail";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import EmployeeAddWork from "../screens/Employee/EmployeeAddWork";
import EmployeeSavedWork from "../screens/Employee/EmployeeSavedWork";
import MyBackButton from "../components/Header/MyBackButton";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import EmployerSendWorkModal from "../screens/Dynamic/EmployerSendWorkModal";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";
import CompanySendWorkRequest from "../screens/Dynamic/CompanySendWorkRequest";
import EmployeeEditWork from "../screens/Employee/EmployeeEditWork";
import BoostEmployeeWork from "../screens/Profile/Wallet/Company/BoostEmployeeWork.js";
import EmployeeSort from "../screens/Employee/EmployeeSort";
import EmployeeResultSort from "../screens/Employee/EmployeeResultSort";
const EmployeeGroup = () => {
  const EmployeeStack = createNativeStackNavigator();
  return (
    <EmployeeStack.Navigator>
      <EmployeeStack.Group>
        <EmployeeStack.Screen
          name="EmployeeScreen"
          component={EmployeeScreen}
          options={{ headerShown: false }}
        />
        <EmployeeStack.Screen
          name="EmployeeWorkDetail"
          component={EmployeeWorkDetail}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployeeStack.Screen
          name="EmployeeAddWork"
          component={EmployeeAddWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployeeStack.Screen
          name="EmployeeEditWork"
          component={EmployeeEditWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployeeStack.Screen
          name="EmployeeSavedWork"
          component={EmployeeSavedWork}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Хадгалсан ажлын байр",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </EmployeeStack.Group>
      <EmployeeStack.Group>
        <EmployeeStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployeeStack.Screen
          name="BoostEmployeeWork"
          component={BoostEmployeeWork}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Идэвхжүүлэх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="ViewUserFollower"
          component={ViewUserFollower}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Дагагч",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Дагасан",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="ViewCompanyJobs"
          component={ViewCompanyJobs}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="EmployerSendWorkModal"
          component={EmployerSendWorkModal}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Анкет илгээх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="UserSendWorkRequest"
          component={UserSendWorkRequest}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="CompanySendWorkRequest"
          component={CompanySendWorkRequest}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />

        <EmployeeStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
          }}
        />

        <EmployeeStack.Screen
          name="EmployeeSort"
          component={EmployeeSort}
          options={{
            headerShown: true,
            title: "Ажлын захиалга шүүх",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
        <EmployeeStack.Screen
          name="EmployeeResultSort"
          component={EmployeeResultSort}
          options={{
            headerShown: true,
            title: "Ажлын захиалга шүүх",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
      </EmployeeStack.Group>
    </EmployeeStack.Navigator>
  );
};

export default EmployeeGroup;
