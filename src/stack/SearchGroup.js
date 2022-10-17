import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBackButton from "../components/Header/MyBackButton";
import SearchScreen from "../screens/Search/SearchScreen";
import CompanySearch from "../screens/Search/CompanySearch";
import EmployerSearch from "../screens/Search/EmployerSearch";
import UserSearch from "../screens/Search/UserSearch";
import EmployeeSearch from "../screens/Search/EmployeeSearch";
import WorkSearch from "../screens/Search/WorkSearch";
import CategorySearch from "../screens/Search/CategorySearch";
import MyJobs from "../screens/Search/MyJobs";
import SendWorkRequestModal from "../screens/Dynamic/UserSendWorkRequest";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import CustomSearchModal from "../screens/Search/Work/CustomSearchModal";
import CustomSearchedModal from "../screens/Search/Work/CustomSearchedModal";
import AllCompanySearch from "../screens/Search/AllCompanySearch";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import ViewUserPost from "../screens/Dynamic/ViewUserPost";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import EmployerWorkDetail from "../screens/Employer/EmployerWorkDetail";
import FollowedCompany from "../screens/Search/FollowedCompany";
import CompanyFilterModal from "../screens/Search/Company/CompanyFilterModal";
import ResultedCompanyModal from "../screens/Search/Company/ResultedCompanyModal";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
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
          name="CompanySearch"
          component={CompanySearch}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
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
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
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
          name="WorkSearch"
          component={WorkSearch}
          options={{
            fullScreenGestureEnabled: true,
            headerShown: false,
          }}
        />
        <SearchStack.Screen
          name="CustomSearchModal"
          component={CustomSearchModal}
          options={{
            fullScreenGestureEnabled: true,
            presentation: "formSheet",
            title: "Ажлын зар сортлох",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="CustomSearchedModal"
          component={CustomSearchedModal}
          options={{
            fullScreenGestureEnabled: true,
            presentation: "formSheet",
            title: "Олдсон ажлын зар",
            headerLeft: () => <MyBackButton />,
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
        <SearchStack.Screen
          name="MyJobs"
          component={MyJobs}
          options={{
            fullScreenGestureEnabled: true,
            title: "Өөрт тохирох",
            headerLeft: () => <MyBackButton />,
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
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="EmployerSendWorkModal"
          component={EmployerSendWorkModal}
          options={{
            headerShown: true,
            presentation: "formSheet",
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
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false, presentation: "formSheet" }}
        />
        <SearchStack.Screen
          name="ViewCompanyJobs"
          component={ViewCompanyJobs}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />

        <SearchStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{ headerShown: false, presentation: "formSheet" }}
        />
        <SearchStack.Screen
          name="ViewUserFollower"
          component={ViewUserFollower}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Дагагч",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{
            fullScreenGestureEnabled: true,
            title: "Дагасан хаягууд",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="ViewUserPosts"
          component={ViewUserPost}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Хэрэглэгчийн нийтлэл",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
            presentation: "formSheet",
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
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="CompanyFilterModal"
          component={CompanyFilterModal}
          options={{
            fullScreenGestureEnabled: true,
            title: "Байгууллага нарийвчлах",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
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
            presentation: "formSheet",
            title: "Нийтлэл дэлгэрэнгүй",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="SharePostModal"
          component={SharePostModal}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Нийтлэл хуваалцах",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="ResultedCompanyModal"
          component={ResultedCompanyModal}
          options={{
            fullScreenGestureEnabled: true,
            title: "Байгууллага",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
            presentation: "formSheet",
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
