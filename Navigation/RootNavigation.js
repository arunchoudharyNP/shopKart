import React, { useState } from "react";
import { Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../Screens/beforeAuth/LoginScreen";
import SignUpScreen from "../Screens/beforeAuth/SignUpScreen";
import DashboardScreen from "../Screens/afterAuth/DashboardScreen";

const RootNavigation = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  const RootStack = createStackNavigator();
  const DrawerNav = createDrawerNavigator();
  const HomeStack = createStackNavigator();

  const homeStack = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name={"Home"} component={DashboardScreen} />
      </HomeStack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <RootStack.Navigator screenOptions={{headerShown:false}} initialRouteName="signUp">
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
          <DrawerNav.Screen name="home" component={homeStack} />
        </DrawerNav.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
