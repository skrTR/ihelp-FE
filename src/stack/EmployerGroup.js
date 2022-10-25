import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployerScreen from "../screens/Employer/EmployerScreen";
import EmployerWorkDetail from "../screens/Employer/EmployerWorkDetail";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import EmployerAddWork from "../screens/Employer/EmployerAddWork";
import MyBackButton from "../components/Header/MyBackButton";
import UserSavedWork from "../screens/Profile/User/Settings/UserSavedWork";
import UserWorkDetail from "../screens/Profile/User/Settings/UserWorkDetail";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import EmployerSendWorkModal from "../screens/Dynamic/EmployerSendWorkModal";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import CompanySendWorkRequest from "../screens/Dynamic/CompanySendWorkRequest";
import BoostEmployerWork from "../screens/Profile/Wallet/Company/BoostEmployerWork";
import ProductUsePoint from "../screens/Profile/Wallet/ProductUsePoint";
import EmployerEditWork from "../screens/Employer/EmployerEditWork";
import EmployeeWorkDetail from "../screens/Employee/EmployeeWorkDetail";
import SortWorkModal from "../screens/Employer/SortWorkModal";
import ResultWorkModal from "../screens/Employer/ResultWorkModal";
import BoostSpecialCompany from "../screens/Profile/Wallet/Company/BoostSpecialCompany";
import CompanyJobCvDetail from "../screens/Profile/Company/CompanySetting/CompanyJobCvDetail";
const EmployerGroup = () => {
  const EmployerStack = createNativeStackNavigator();
  return (
    <EmployerStack.Navigator>
      <EmployerStack.Group>
        <EmployerStack.Screen
          name="EmployerScreen"
          component={EmployerScreen}
          options={{ headerShown: false }}
        />
        <EmployerStack.Screen
          name="EmployerWorkDetail"
          component={EmployerWorkDetail}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="EmployerEditWork"
          component={EmployerEditWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="EmployerAddWork"
          component={EmployerAddWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="BoostEmployerWork"
          component={BoostEmployerWork}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Идэвхжүүлэх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployerStack.Screen
          name="BoostSpecialCompany"
          component={BoostSpecialCompany}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Идэвхжүүлэх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployerStack.Screen
          name="ProductUsePoint"
          component={ProductUsePoint}
          options={{
            headerShown: false,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Идэвхжүүлэх",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </EmployerStack.Group>
      <EmployerStack.Group>
        <EmployerStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
            // presentation: "fullScreenModal",
          }}
        />
        <EmployerStack.Screen
          name="UserSavedWork"
          component={UserSavedWork}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Хадгалсан ажлын байр",
            headerLeft: () => <MyBackButton />,
          }}
        />

        <EmployerStack.Screen
          name="EmployerSendWorkModal"
          component={EmployerSendWorkModal}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            title: "Анкет илгээх",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
        <EmployerStack.Screen
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
        <EmployerStack.Screen
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
        <EmployerStack.Screen
          name="UserWorkDetail"
          component={UserWorkDetail}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Хадгалсан ажлын байр",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployerStack.Screen
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
        <EmployerStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />

        <EmployerStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
          }}
        />
        <EmployerStack.Screen
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
        <EmployerStack.Screen
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
        <EmployerStack.Screen
          name="EmployeeWorkDetail"
          component={EmployeeWorkDetail}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="SortWorkModal"
          component={SortWorkModal}
          options={{
            title: "Ажлын зар шүүх",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
        <EmployerStack.Screen
          name="ResultWorkModal"
          component={ResultWorkModal}
          options={{
            title: "Илэрц",
            headerLeft: () => <MyBackButton />,
            fullScreenGestureEnabled: true,
          }}
        />
        <EmployerStack.Screen
          name="CompanyJobCvDetail"
          component={CompanyJobCvDetail}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Анкет",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </EmployerStack.Group>
    </EmployerStack.Navigator>
  );
};

export default EmployerGroup;
