import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import LoginScreen from "../Screens/beforeAuth/LoginScreen";
import SignUpScreen from "../Screens/beforeAuth/SignUpScreen";
import DashboardScreen from "../Screens/afterAuth/DashboardScreen";
import AsyncStorage from "@react-native-community/async-storage";

const RootNavigation = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setdata] = useState("");

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
  }, [dispatch]);

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
      </RootStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {!isAuth ? (
        AuthStack()
      ) : (
        <DrawerNav.Navigator>
          <DrawerNav.Screen
            name="home"
            component={homeStack}
            initialParams={{ UID: data.token }}
          />
        </DrawerNav.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
