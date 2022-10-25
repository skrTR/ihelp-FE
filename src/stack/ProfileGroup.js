import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompanyProfileScreen from "../screens/Profile/Company/CompanyProfileScreen";
import UserProfileScreen from "../screens/Profile/User/UserProfileScreen";
import WalletScreen from "../screens/Profile/Wallet/WalletScreen";
import SendMoneyScreen from "../screens/Profile/Wallet/SendMoneyScreen";
import QpayModal from "../screens/Profile/Wallet/QpayModals";
import MyBackButton from "../components/Header/MyBackButton";
import CreateCvScreen from "../screens/Profile/User/Edit/CreateCvScreen";
import PersonalDetailModal from "../screens/Profile/User/Edit/PersonalDetailModal";
import AchievmentAddModal from "../screens/Profile/User/Edit/AchievmentAddModal";
import AchievmentDetailModal from "../screens/Profile/User/Edit/AchievmentDetailModal";
import CourseAddModal from "../screens/Profile/User/Edit/CourseAddModal";
import CourseDetailModal from "../screens/Profile/User/Edit/CourseDetailModal";
import UserSettingsScreen from "../screens/Profile/User/Settings/UserSettingScreen";
import EditStatusModal from "../screens/Profile/User/EditCoverStatus/EditStatusModal";
import ProfilePictureView from "../screens/Profile/User/EditCoverStatus/ProfilePictureView";
import ProfilePictureFrame from "../screens/Profile/User/EditCoverStatus/ProfilePictureFrame";
import UserActivityModal from "../screens/Profile/User/Settings/UserActivityModal";
import UserRecievedJob from "../screens/Profile/User/Settings/UserRecievedJob";
import UserSendWorkHistory from "../screens/Profile/User/Settings/UserSendWorkHistory";
import UserSavedWork from "../screens/Profile/User/Settings/UserSavedWork";
import UserWorkDetail from "../screens/Profile/User/Settings/UserWorkDetail";
import EditCoverModal from "../screens/Profile/User/EditCoverStatus/EditCoverModal";
import UserContext from "../context/UserContext";
import CompanyProfilePicture from "../screens/Profile/Company/CompanyEditCoverProfile/CompanyProfilePicture";
import EditCompanyCover from "../screens/Profile/Company/CompanyEditCoverProfile/EditCompanyCover";
import EditCompanyStatus from "../screens/Profile/Company/CompanyEditCoverProfile/EditCompanyStatus";
import CompanyProfileEdit from "../screens/Profile/Company/CompanyProfileEdit";
import CompanySettingModal from "../screens/Profile/Company/CompanySetting/CompanySettingModal";
import CompanyCreatedWork from "../screens/Profile/Company/CompanySetting/CompanyCreateWork";
import CompanyUsedProduct from "../screens/Profile/Company/CompanySetting/CompanyUsedProduct";
import CompanyRecievedCv from "../screens/Profile/Company/CompanySetting/CompanyRecievedCv";
import PointUseScreen from "../screens/Profile/Wallet/PointUseScreen";
import ProductUsePoint from "../screens/Profile/Wallet/ProductUsePoint";
import BoostPost from "../screens/Profile/Wallet/BoostPost";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ChangeAccountModal from "../screens/Profile/ChangeAccountModal";
import { useTheme } from "@react-navigation/native";
import PersonLoginScreen from "../screens/Auth/PersonLoginScreen";
import ChangeCompanyLogin from "../screens/Profile/ChangeAccount/ChangeCompanyLogin";
import CoursePackageModal from "../screens/Profile/User/Edit/CoursePackageModal";
import ExperiencePackageModal from "../screens/Profile/User/Edit/ExperiencePackageModal";
import FamilyAddModal from "../screens/Profile/User/Edit/FamilyAddModal";
import FamilyDetailModal from "../screens/Profile/User/Edit/FamilyDetailModal";
import SkillDetailModal from "../screens/Profile/User/Edit/SkillDetailModal";
import EditAbout from "../screens/Profile/User/Edit/EditAbout";
import ExperienceAddModal from "../screens/Profile/User/Edit/ExperienceAddModal";
import ExperienceDetailModal from "../screens/Profile/User/Edit/ExperienceDetailModal";
import LanguageAddModal from "../screens/Profile/User/Edit/LanguageAddModal";
import LanguagePackagaModal from "../screens/Profile/User/Edit/LanguagePackageModal";
import LanguageDetailModal from "../screens/Profile/User/Edit/LangaugeDetailModal";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import ChangePasswordModal from "../screens/Profile/User/Settings/ChangePasswordModal";
import UserVerifyScreen from "../screens/Profile/User/Settings/UserVerifyScreen";
import AddPostScreen from "../screens/Network/AddPostScreen";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import NetworkingPostDetailScreen from "../screens/Network/NetworkingPostDetailScreen";

//

import ViewUserPost from "../screens/Dynamic/ViewUserPost";
import ChangeCompanyPassword from "../screens/Profile/Company/CompanySetting/ChangeCompanyPassword";
import WorkBoostModal from "../screens/Profile/Wallet/WorkBoostModal";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import PostSettings from "../screens/Network/PostSettings";
import CompanyWorkRequest from "../screens/Profile/Company/CompanySetting/CompanyWorkRequest";

import CompanySendWorkRequest from "../screens/Dynamic/CompanySendWorkRequest";
import CvDetailScreen from "../components/Cv/CvDetailScreen";
import PointTypeScreen from "../screens/Profile/Wallet/PointTypeScreen";
import BoostEmployerWork from "../screens/Profile/Wallet/Company/BoostEmployerWork";
import BoostEmployeeWork from "../screens/Profile/Wallet/Company/BoostEmployeeWork.js";
import EmployerEditWork from "../screens/Employer/EmployerEditWork";
import EmployeeEditWork from "../screens/Employee/EmployeeEditWork";
import EmployeeWorkDetail from "../screens/Employee/EmployeeWorkDetail";
import UserRecievedJobDetail from "../screens/Profile/User/Settings/UserRecievedJobDetail";
import EmployerSendWorkModal from "../screens/Dynamic/EmployerSendWorkModal";
import CompanySendWork from "../screens/Profile/Company/CompanySetting/CompanySendWork";
import NetworkingBoost from "../screens/Profile/Wallet/User/NetworkingBoost";
import BoostSpecialCompany from "../screens/Profile/Wallet/Company/BoostSpecialCompany";
import CompanyJobCv from "../screens/Profile/Company/CompanySetting/CompanyJobCv";
import CompanyJobCvDetail from "../screens/Profile/Company/CompanySetting/CompanyJobCvDetail";
import ApplyCvDetailScreen from "../screens/Profile/Company/CompanySetting/ApplyCvDetailScreen";
import RecievedJobDetail from "../screens/Profile/Company/CompanySetting/RecievedJobDetail";
import PortfolioDetail from "../components/Profile/PortfolioDetail";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";

const ProfileGroup = () => {
  const ProfileStack = createNativeStackNavigator();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator>
      {/* User */}

      {state.isCompany ? (
        <ProfileStack.Group>
          {/* Company */}
          <ProfileStack.Screen
            name="CompanyProfileScreen"
            component={CompanyProfileScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          {/* Company profile cover status */}
          <>
            <ProfileStack.Screen
              name="CompanyProfilePicture"
              component={CompanyProfilePicture}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Профайл зураг солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="EditCompanyCover"
              component={EditCompanyCover}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Ковер зураг солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="EditCompanyStatus"
              component={EditCompanyStatus}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Статус солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyProfileEdit"
              component={CompanyProfileEdit}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Профайл янзлах",
                headerLeft: () => <MyBackButton />,
              }}
            />
          </>
          {/* Company Setting */}
          <>
            <ProfileStack.Screen
              name="CompanySettingModal"
              component={CompanySettingModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                title: "Тохиргоо",
                headerLeft: () => <MyBackButton />,
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="CvDetailScreen"
              component={CvDetailScreen}
              options={{
                headerShown: false,
                // presentation: "formSheet",
                title: "Тохиргоо",
                headerLeft: () => <MyBackButton />,
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="CompanyCreateWork"
              component={CompanyCreatedWork}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Оруулсан ажлын зар",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyUsedProduct"
              component={CompanyUsedProduct}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Ашигласан үйлчилгээнүүд",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="ChangeCompanyPassword"
              component={ChangeCompanyPassword}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Нууц үг солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="WorkBoostModal"
              component={WorkBoostModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Ажлын зар",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyWorkRequest"
              component={CompanyWorkRequest}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Ирсэн ажлын санал",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanySendWork"
              component={CompanySendWork}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Илгээсэн ажлын санал",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyRecievedCv"
              component={CompanyRecievedCv}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                title: "Ирсэн анкет",
                headerLeft: () => <MyBackButton />,
                fullScreenGestureEnabled: true,
              }}
            />
          </>
        </ProfileStack.Group>
      ) : (
        <ProfileStack.Group>
          {/* User */}
          <ProfileStack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />

          {/* Cv Үүсгэх */}
          <>
            <ProfileStack.Screen
              name="CreateCvScreen"
              component={CreateCvScreen}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Анкет үүсгэх",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="PersonalDetailModal"
              component={PersonalDetailModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Хувийн мэдээлэл",
                headerLeft: () => <MyBackButton />,
              }}
            />
            {/* Гавьяа шагнал */}
            <ProfileStack.Screen
              name="AchievmentAddModal"
              component={AchievmentAddModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Гавьяа шагнал нэмэх",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="AchievmentDetailModal"
              component={AchievmentDetailModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Гавьяа шагнал",
                headerLeft: () => <MyBackButton />,
              }}
            />
            {/* Гавьяа шагнал дуусах */}
            {/* Болвосрол */}
            <ProfileStack.Screen
              name="CourseAddModal"
              component={CourseAddModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Боловсрол нэмэх",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CourseDetailModal"
              component={CourseDetailModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Боловсрол",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CoursePackageModal"
              component={CoursePackageModal}
              options={{
                title: "Боловсрол мэдээлэл",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",

                fullScreenGestureEnabled: true,
              }}
            />
            {/* Болвосрол дуусах */}
            {/* Туршлага нэмэх */}
            <ProfileStack.Screen
              name="ExperienceDetailModal"
              component={ExperienceDetailModal}
              options={{
                title: "Туршлага дэлгэрэнгүй",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="ExperienceAddModal"
              component={ExperienceAddModal}
              options={{
                // headerShown: false,
                fullScreenGestureEnabled: true,
                title: "Туршлага нэмэх",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="ExperiencePackageModal"
              component={ExperiencePackageModal}
              options={{
                title: "Туршлага мэдээлэл",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            {/* Туршлага дуусах */}
            {/* Гэр бүлийн мэдээлэл */}
            <ProfileStack.Screen
              name="FamilyAddModal"
              component={FamilyAddModal}
              options={{
                title: "Гэр бүлийн мэдээлэл нэмэх",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="FamilyDetailModal"
              component={FamilyDetailModal}
              options={{
                title: "Гэр бүлийн мэдээлэл дэлгэрэнгүй",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            {/* Гэр бүлийн мэдээлэл дуусах*/}
            {/* Ур чадвар */}
            <ProfileStack.Screen
              name="SkillDetailModal"
              component={SkillDetailModal}
              options={{
                title: "Ур чадвар болон сул тал",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            {/* Ур чадвар дуусах*/}
            {/* Өөрийн тухай */}
            <ProfileStack.Screen
              name="EditAbout"
              component={EditAbout}
              options={{
                title: "Танилцуулга бичих",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            {/* Хэлний чадвар */}
            <ProfileStack.Screen
              name="LanguageAddModal"
              component={LanguageAddModal}
              options={{
                title: "Хэлний чадвар",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="LanguageDetailModal"
              component={LanguageDetailModal}
              options={{
                title: "Хэлний чадвар",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="LanguagePackageModal"
              component={LanguagePackagaModal}
              options={{
                title: "Хэлний чадвар",
                headerLeft: () => <MyBackButton />,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            {/* Хэлний чадвар дуусгах */}
            {/* Өөрийн тухай */}
          </>
          {/* CV үүсгэлт дуусах */}
          {/* Status ProfilePicture CoverPicture Frame */}
          <>
            <ProfileStack.Screen
              name="ProfilePictureView"
              component={ProfilePictureView}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Профайл зураг солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="ProfilePictureFrame"
              component={ProfilePictureFrame}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Тохиргоо",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="EditCoverModal"
              component={EditCoverModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Ковер зураг солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
          </>
          {/* Status ProfilePicture CoverPicture Frame end */}
          {/* SettingScreen */}
          <>
            <ProfileStack.Screen
              name="UserSettingsScreen"
              component={UserSettingsScreen}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Тохиргоо",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="AddPostScreen"
              component={AddPostScreen}
              options={{
                headerShown: false,
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="EditStatusModal"
              component={EditStatusModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Статус солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserActivityModal"
              component={UserActivityModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Хэрэглэгчийн идэвх",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="NetworkingPostDetailScreen"
              component={NetworkingPostDetailScreen}
              options={{
                headerShown: false,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="UserRecievedJob"
              component={UserRecievedJob}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Ирсэн ажлын санал",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserSendWorkHistory"
              component={UserSendWorkHistory}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Илгээсэн ажлын санал",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
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
            <ProfileStack.Screen
              name="UserWorkDetail"
              component={UserWorkDetail}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Хадгалсан ажлын байр дэлгэрэнгүй",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="ChangePasswordModal"
              component={ChangePasswordModal}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Нууц үг солих",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserVerifyScreen"
              component={UserVerifyScreen}
              options={{
                headerShown: true,
                // presentation: "formSheet",
                fullScreenGestureEnabled: true,
                title: "Баталгажуулах хүсэлт",
                headerLeft: () => <MyBackButton />,
              }}
            />
          </>
          {/* SettingScreen End*/}
          {/* FollowerFollowing */}
        </ProfileStack.Group>
      )}
      <ProfileStack.Group>
        <>
          <ProfileStack.Screen
            name="ViewUserFollowings"
            component={ViewUserFollowings}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              title: "Дагaсан",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
          <ProfileStack.Screen
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
          <ProfileStack.Screen
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
          <ProfileStack.Screen
            name="ViewUserFollower"
            component={ViewUserFollower}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              title: "Дагадаг",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
          <ProfileStack.Screen
            name="ChangeAccountModal"
            component={ChangeAccountModal}
            options={{
              // presentation: "formSheet",
              fullScreenGestureEnabled: true,
              contentStyle: {
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
                height: "80%",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              },
              headerShown: false,
            }}
          />
          <ProfileStack.Screen
            name="PersonLoginScreen"
            component={PersonLoginScreen}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              fullScreenGestureEnabled: true,
              title: "Хэрэглэгч нэвтрэх",
              headerLeft: () => <MyBackButton />,
            }}
          />
          <ProfileStack.Screen
            name="CompanyLoginScreen"
            component={ChangeCompanyLogin}
            options={{
              headerShown: false,
              // presentation: "formSheet",
              fullScreenGestureEnabled: true,
              title: "Байгууллага нэвтрэх",
              headerLeft: () => <MyBackButton />,
            }}
          />
        </>
        {/* Хэтэвч */}
        <>
          <ProfileStack.Screen
            name="WalletScreen"
            component={WalletScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <ProfileStack.Screen
            name="SendMoneyScreen"
            component={SendMoneyScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <ProfileStack.Screen
            name="QpayModals"
            component={QpayModal}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              fullScreenGestureEnabled: true,
              title: "Банкны апп",
              headerLeft: () => <MyBackButton />,
            }}
          />
          <ProfileStack.Screen
            name="PointUseScreen"
            component={PointUseScreen}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              title: "Пойнт ашиглах",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
          <ProfileStack.Screen
            name="ProductUsePoint"
            component={ProductUsePoint}
            options={{
              headerShown: false,
              // presentation: "formSheet",
              title: "Идэвхжүүлэх",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
          <ProfileStack.Screen
            name="BoostPost"
            component={BoostPost}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              fullScreenGestureEnabled: true,
              title: "Нийтлэл идэвхжүүлэх",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
        </>
        {/* Хэтэвч  дуусах*/}
        {/* Notification */}
        <>
          <ProfileStack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
        </>

        {/* port end */}
      </ProfileStack.Group>
      <ProfileStack.Group>
        <ProfileStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <ProfileStack.Screen
          name="PointTypeScreen"
          component={PointTypeScreen}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <ProfileStack.Screen
          name="BoostEmployerWork"
          component={BoostEmployerWork}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
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
        <ProfileStack.Screen
          name="EmployeeEditWork"
          component={EmployeeEditWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <ProfileStack.Screen
          name="EmployerEditWork"
          component={EmployerEditWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <ProfileStack.Screen
          name="BoostEmployeeWork"
          component={BoostEmployeeWork}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <ProfileStack.Screen
          name="ViewCompanyJobs"
          component={ViewCompanyJobs}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />

        <ProfileStack.Screen
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
        <ProfileStack.Screen
          name="PostSettings"
          component={PostSettings}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Тохиргоо",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
          }}
        />
        <ProfileStack.Screen
          name="EmployeeWorkDetail"
          component={EmployeeWorkDetail}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <ProfileStack.Screen
          name="UserRecievedJobDetail"
          component={UserRecievedJobDetail}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Ирсэн ажлын санал",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
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
        <ProfileStack.Screen
          name="NetworkingBoost"
          component={NetworkingBoost}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Нийтлэл идэвхжүүлэх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="CompanyJobCv"
          component={CompanyJobCv}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Анкет",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
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
        <ProfileStack.Screen
          name="ApplyCvDetailScreen"
          component={ApplyCvDetailScreen}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Анкет",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="RecievedJobDetail"
          component={RecievedJobDetail}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Санал",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="PortfolioDetail"
          component={PortfolioDetail}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Зурагт танилцуулга",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};

export default ProfileGroup;
