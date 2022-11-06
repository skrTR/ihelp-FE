import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetworkingScreen from "../screens/Network/NetworkingScreen";
import SharePostModal from "../screens/Network/SharePostModal";
import MyBackButton from "../components/Header/MyBackButton";
import NetworkingPostDetailScreen from "../screens/Network/NetworkingPostDetailScreen";
import AddPostScreen from "../screens/Network/AddPostScreen";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import PostSettings from "../screens/Network/PostSettings";
import EditPost from "../screens/Network/EditPost";
import BoostPost from "../screens/Profile/Wallet/BoostPost";
import ViewUserPost from "../screens/Dynamic/ViewUserPost";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";
import PostLikeUser from "../screens/Network/PostLikeUser";
import UserSearch from "../screens/Search/UserSearch";
import CompanySendWorkRequest from "../screens/Dynamic/CompanySendWorkRequest";
import CommentDetailModal from "../screens/Network/CommentDetailModal";
import PostReport from "../screens/Network/PostReport";
const NetworkingGroup = () => {
  const NetworkingStack = createNativeStackNavigator();
  return (
    <NetworkingStack.Navigator>
      <NetworkingStack.Group>
        <NetworkingStack.Screen
          name="NetworkingScreen"
          component={NetworkingScreen}
          options={{ headerShown: false }}
        />
        <NetworkingStack.Screen
          name="NetworkingPostDetailScreen"
          component={NetworkingPostDetailScreen}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <NetworkingStack.Screen
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
        <NetworkingStack.Screen
          name="AddPostScreen"
          component={AddPostScreen}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <NetworkingStack.Screen
          name="PostSettings"
          component={PostSettings}
          options={{
            fullScreenGestureEnabled: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Тохиргоо",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <NetworkingStack.Screen
          name="PostReport"
          component={PostReport}
          options={{
            fullScreenGestureEnabled: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Гомдол",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <NetworkingStack.Screen
          name="EditPost"
          component={EditPost}
          options={{
            fullScreenGestureEnabled: true,
            // presentation: "formSheet",

            title: "Нийтлэл янзлах",
            headerLeft: () => <MyBackButton />,
            headerShown: false,
          }}
        />
        <NetworkingStack.Screen
          name="PostLikeUser"
          component={PostLikeUser}
          options={{
            fullScreenGestureEnabled: true,
            // presentation: "formSheet",
            title: "Лайк дарсан хүмүүс",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </NetworkingStack.Group>
      <NetworkingStack.Group>
        <NetworkingStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <NetworkingStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <NetworkingStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Дагадаг",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <NetworkingStack.Screen
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
        <NetworkingStack.Screen
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
        <NetworkingStack.Screen
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
        <NetworkingStack.Screen
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
        <NetworkingStack.Screen
          name="UserSearch"
          component={UserSearch}
          options={{
            headerShown: false,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Хэрэглэгчид",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <NetworkingStack.Screen
          name="BoostPost"
          component={BoostPost}
          options={{
            headerShown: true,
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Нийтлэл идэвхжүүлэх",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <NetworkingStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <NetworkingStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
          }}
        />
        <NetworkingStack.Screen
          name="CommentDetailModal"
          component={CommentDetailModal}
          options={{
            // presentation: "formSheet",
            fullScreenGestureEnabled: true,
            title: "Сэтгэгдэл",
            headerLeft: () => <MyBackButton />,
          }}
        />
        {/* <NetworkingStack.Screen */}
        {/* name="ViewUserFollower" */}
        {/* // component={UserSendWork} */}
        {/* options={{ headerShown: false, fullScreenGestureEnabled: true }} */}
        {/* /> */}
      </NetworkingStack.Group>
    </NetworkingStack.Navigator>
  );
};

export default NetworkingGroup;
