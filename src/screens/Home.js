import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const TabBarIcon = ({ routeName, focused, color }) => {
  let iconSource, backgroundColor, iconColor;

  if (routeName === "Profile") {
    iconSource = <Feather name="user" size={24} color={color} />;
  } else if (routeName === "PostsScreen") {
    iconSource = <AntDesign name="appstore-o" size={24} color={color} />;
  } else if (routeName === "CreatePosts") {
    iconSource = <AntDesign name="plus" size={24} color={color} />;
  }

  if (focused) {
    backgroundColor = "#FF6C00";
    iconColor = "#FFFFFF";
  } else {
    backgroundColor = "#FFFFFF";
    iconColor = color;
  }

  return (
    <View style={[styles.tabIconContainer, { backgroundColor }]}>
      {iconSource}
    </View>
  );
};

const Home = ({ navigation, route }) => {
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const routeName = getFocusedRouteNameFromRoute(route);

  useEffect(() => {
    if (routeName === "CreatePosts") {
      setTabBarVisible(false);
      navigation.navigate("CreatePosts");
    } else {
      setTabBarVisible(true);
    } 
  }, [routeName, navigation]);

  // let tabBarVisible = true;
  // let routeName = getFocusedRouteNameFromRoute(route);
  // if (routeName === "CreatePosts") {
  //   tabBarVisible = false;
  //   navigation.navigate("CreatePosts");
  // }

  return (
    <View style={styles.container}>
      {tabBarVisible && (
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon routeName={route.name} focused={focused} color={color} />
            ),
            headerShown: false,
            tabBarStyle:{
              borderTopColor: "rgba(0, 0, 0, 0.2)",
              borderTopStyle: "solid",
              borderTopWidth: 1,
              paddingTop: 9,
              paddingBottom: 9,
              justifyContent: 'center',
              alignItems: 'center',
            },
            tabBarItemStyle:{
              margin: 9,
              flex: 0,
              width: 70,
            },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#212121",
            tabBarLabelStyle: {
              display: "none",
            },
          })}
        >
          <Tabs.Screen name="PostsScreen" component={PostsScreen} />
          <Tabs.Screen name="CreatePosts" component={CreatePostsScreen} />
          <Tabs.Screen name="Profile" component={ProfileScreen} />
        </Tabs.Navigator>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabIconContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
