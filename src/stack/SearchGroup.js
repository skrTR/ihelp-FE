import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBackButton from "../components/Header/MyBackButton";
import SearchScreen from "../screens/Search/SearchScreen";
import EmployerSearch from "../screens/Search/EmployerSearch";
import UserSearch from "../screens/Search/UserSearch";
import EmployeeSearch from "../screens/Search/EmployeeSearch";
import CategorySearch from "../screens/Search/CategorySearch";
import SendWorkRequestModal from "../screens/Dynamic/UserSendWorkRequest";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";

import AllCompanySearch from "../screens/Search/AllCompanySearch";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import ViewUserPost from "../screens/Dynamic/ViewUserPost";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import EmployerWorkDetail from "../screens/Employer/EmployerWorkDetail";
import FollowedCompany from "../screens/Search/FollowedCompany";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";
import CompanySendWorkRequest from "../screens/Dynamic/CompanySendWorkRequest";
import EmployeeEditWork from "../screens/Employee/EmployeeEditWork";
import EmployerEditWork from "../screens/Employer/EmployerEditWork";
import NetworkingPostDetailScreen from "../screens/Network/NetworkingPostDetailScreen";
import SharePostModal from "../screens/Network/SharePostModal";
import UserProfileScreen from "../screens/Profile/User/UserProfileScreen";
import EmployeeWorkDetail from "../screens/Employee/EmployeeWorkDetail";
import EmployerSendWorkModal from "../screens/Dynamic/EmployerSendWorkModal";
import UserInfluncerSearch from "../screens/Search/UserInfluncerSearch";
import UserFreelancerSearch from "../screens/Search/UserFreelancerSearch";
const SearchGroup = () => {
  const SearchStack = createNativeStackNavigator();
  return (
    <SearchStack.Navigator>
      <SearchStack.Group>
        <SearchStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        <SearchStack.Screen
          name="AllCompanySearch"
          component={AllCompanySearch}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="EmployerSearch"
          component={EmployerSearch}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="EmployerWorkDetail"
          component={EmployerWorkDetail}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="UserSearch"
          component={UserSearch}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />

        <SearchStack.Screen
          name="UserInfluncerSearch"
          component={UserInfluncerSearch}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="UserFreelancerSearch"
          component={UserFreelancerSearch}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="EmployeeSearch"
          component={EmployeeSearch}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />

        <SearchStack.Screen
          name="CategorySearch"
          component={CategorySearch}
          options={{
            fullScreenGestureEnabled: true,
            headerShown: false,
          }}
        />
      </SearchStack.Group>
      <SearchStack.Group>
        <SearchStack.Screen
          name="UserSendWorkRequest"
          component={SendWorkRequestModal}
          options={{
            fullScreenGestureEnabled: true,
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
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
        <SearchStack.Screen
          name="EmployeeEditWork"
          component={EmployeeEditWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="EmployerEditWork"
          component={EmployerEditWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="CompanySendWorkRequest"
          component={CompanySendWorkRequest}
          options={{
            fullScreenGestureEnabled: true,
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
            // presentation: "formSheet"
          }}
        />
        <SearchStack.Screen
          name="ViewCompanyJobs"
          component={ViewCompanyJobs}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />

        <SearchStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{
            headerShown: false,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
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
        <SearchStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{
            title: "Дагасан хаягууд",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="ViewUserPosts"
          component={ViewUserPost}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Хэрэглэгчийн нийтлэл",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Мэдэгдлүүд",
            headerLeft: () => <MyBackButton />,
          }}
        />

        <SearchStack.Screen
          name="FollowedCompany"
          component={FollowedCompany}
          options={{
            fullScreenGestureEnabled: true,
            title: "Дагасан байгууллага",
            headerLeft: () => <MyBackButton />,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />

        <SearchStack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="NetworkingPostDetailScreen"
          component={NetworkingPostDetailScreen}
          options={{
            headerShown: false,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Нийтлэл дэлгэрэнгүй",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="SharePostModal"
          component={SharePostModal}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Нийтлэл хуваалцах",
            headerLeft: () => <MyBackButton />,
          }}
        />

        <SearchStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="EmployeeWorkDetail"
          component={EmployeeWorkDetail}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
      </SearchStack.Group>
    </SearchStack.Navigator>
  );
};

export default SearchGroup;
