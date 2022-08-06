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
import CompanyWorkDetail from "../screens/Profile/Company/CompanyWorkDetail";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import EmployerWorkDetail from "../screens/Employer/EmployerWorkDetail";
import FollowedCompany from "../screens/Search/FollowedCompany";
import CompanyFilterModal from "../screens/Search/Company/CompanyFilterModal";
import ResultedCompanyModal from "../screens/Search/Company/ResultedCompanyModal";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";
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
          name="CompanyWorkDetail"
          component={CompanyWorkDetail}
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
            title: "Дагадаг",
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
            title: "Хэрэглэгчийн пост",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="FollowedCompany"
          component={FollowedCompany}
          options={{
            fullScreenGestureEnabled: true,
            title: "Дагадаг компани",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="CompanyFilterModal"
          component={CompanyFilterModal}
          options={{
            fullScreenGestureEnabled: true,
            title: "Компани сортлох",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="ResultedCompanyModal"
          component={ResultedCompanyModal}
          options={{
            fullScreenGestureEnabled: true,
            title: "Компани",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
          }}
        />
      </SearchStack.Group>
    </SearchStack.Navigator>
  );
};

export default SearchGroup;
