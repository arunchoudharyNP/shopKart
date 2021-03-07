import React, { useState, useEffect, useRef } from "react";
import { Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import LoginScreen from "../Screens/beforeAuth/LoginScreen";
import SignUpScreen from "../Screens/beforeAuth/SignUpScreen";
import DashboardScreen from "../Screens/afterAuth/DashboardScreen";
import Verify from "../Screens/Verify";
import AsyncStorage from "@react-native-community/async-storage";

const RootNavigation = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setdata] = useState("");

  const navigationRef = useRef();

  const dispatch = useDispatch();

  const RootStack = createStackNavigator();
  const DrawerNav = createDrawerNavigator();
  const HomeStack = createStackNavigator();

  const getAuthData = async () => {
    const authData = await AsyncStorage.getItem("userData");

    console.log(authData);
    if (await authData) {
      setIsAuth(true);
      return authData;
    }
  };

  useEffect(() => {
    getAuthData().then((data) => {
      setdata(data);
    });
  }, [dispatch, navigationRef]);

  const homeStack = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name={"Home"} component={DashboardScreen} />
      </HomeStack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="signUp"
      >
        <RootStack.Screen name="login" component={LoginScreen} />
        <RootStack.Screen name="signUp" component={SignUpScreen} />
        <RootStack.Screen name="Verify" component={Verify} />
      </RootStack.Navigator>
    );
  };

  navigationRef;
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        console.log(".............." + currentRouteName);
        if (currentRouteName === "Verify") {
          setIsAuth(false);
          setdata("");
          // getUpdatedState();
          getAuthData();
        }
      }}
    >
      {!isAuth && !data ? (
        AuthStack()
      ) : (
        <DrawerNav.Navigator>
          <DrawerNav.Screen
            name="home"
            component={homeStack}
            initialParams={{ name: data.name , picture: data.picture, uid: data.token }}
          />
          <DrawerNav.Screen name="Verify" component={Verify} />
        </DrawerNav.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
