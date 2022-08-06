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
import CompanyWorkDetail from "../screens/Profile/Company/CompanyWorkDetail";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import EmployerSendWorkModal from "../screens/Dynamic/EmployerSendWorkModal";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";
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
          name="EmployeeSavedWork"
          component={EmployeeSavedWork}
          options={{
            headerShown: true,
            presentation: "formSheet",
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
          name="ViewUserFollower"
          component={ViewUserFollower}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Дагагч",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Дагасан",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="ViewCompanyJobs"
          component={ViewCompanyJobs}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="EmployerSendWorkModal"
          component={EmployerSendWorkModal}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Анкет илгээх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="UserSendWorkRequest"
          component={UserSendWorkRequest}
          options={{
            headerShown: true,
            presentation: "formSheet",
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
          name="CompanyWorkDetail"
          component={CompanyWorkDetail}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployeeStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
          }}
        />
      </EmployeeStack.Group>
    </EmployeeStack.Navigator>
  );
};

export default EmployeeGroup;
