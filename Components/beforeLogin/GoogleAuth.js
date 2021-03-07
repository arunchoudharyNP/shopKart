import React, { useState } from "react";

import { TouchableOpacity, ActivityIndicator, Alert } from "react-native";

import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import FirebaseConfig from "../../data/firebaseConfig";
// import * as actions from "../../store/actions/auth";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

export const GoogleAuth = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const { children, authAction, ...prop } = props;

  const authenticate = () => {
    console.log("authAction.........." + authAction + "..........");

    if (authAction === "SignIn") {
      signIn(props);
    }
  };
  const signIn = async (props) => {
    try {
      const { type, accessToken, idToken, user } = await Google.logInAsync({
        androidClientId:
          "634082657891-09p6d593t9tsvfe6tgflt329ob04gjm5.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });
      if (type === "success") {
        console.log("userName.........." + user.name + "..........");

        const credentials = firebase.auth.GoogleAuthProvider.credential(
          idToken
        );

        const firebaseResult = await firebase
          .auth()
          .signInWithCredential(credentials)
          .catch((error) => {
            console.log(error);
          });

        const name = await firebaseResult.user.displayName;
        const picture = await firebaseResult.user.photoURL;
        const UID = await firebaseResult.user.uid;

        console.log("UID token .........." + UID + "..........");
        console.log("name .........." + name + "..........");

        const isNewUser = firebaseResult.additionalUserInfo.isNewUser;
        // console.log("fireBaseResult====" +JSON.stringify(firebaseResult))
        const action = actions.loginGoogle(name, picture, UID, isNewUser);

        try {
          console.log("loginGoogle Action dispatch start");
          await dispatch(action);
          console.log("loginGoogle Action dispatched");
          navigation.navigate("Verify");
        } catch (err) {
          console.log(err);
        }
      } else {
        Alert.alert("Log in Failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity {...prop} onPress={authenticate}>
      {children}
    </TouchableOpacity>
  );
};

export default GoogleAuth;
