import React from "react";

import * as Facebook from "expo-facebook";
import firebase from "firebase";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity, Alert } from "react-native";

import FirebaseConfig from "../../data/firebaseConfig";
import * as actions from "../../Store/Actions/auth";

import alert from "../helpingComponents/AlertCom";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

export const FbAuth = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { children, authAction, ...prop } = props;

  const authenticate = () => {
    console.log(authAction);

    if (authAction === "SignIn") {
      signIn();
    }
  };

  const signIn = async () => {
    try {
      await Facebook.initializeAsync("297738708199575");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        const firebaseResult = await firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            console.log(error);
          });

        console.log("fireBaseResult=========" + JSON.stringify(firebaseResult));
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );

        const name = await firebaseResult.user.displayName;
        const picture = await firebaseResult.user.photoURL;
        const UID = await firebaseResult.user.uid;

        // console.log("fireBaseResult====" +JSON.stringify(firebaseResult))
        const isNewUser = firebaseResult.additionalUserInfo.isNewUser;
        const action = actions.loginFB(name, picture, UID, isNewUser);

        try {
          console.log("loginFB Action dispatch start");
          await dispatch(action);
          console.log("loginFB Action dispatched");
          navigation.navigate("Verify");
        } catch (err) {
          console.log(err);
        }
        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        Alert.alert("Log in Failed!");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <TouchableOpacity {...prop} onPress={authenticate}>
      {children}
    </TouchableOpacity>
  );
};

export default FbAuth;
