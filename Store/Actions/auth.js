import AsyncStorage from "@react-native-community/async-storage";

import { Alert } from "react-native";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

const alert = (message) => {
  Alert.alert("Something went wrong", message, [
    { text: "ok", onPress: () => console.log("OK.........") },
  ]);
};

export const authenticate = (token, userId) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, token, userId });
  };
};

export const signup = (navigation, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgYVReIckytWWAUB7LUzeQ_MGDcYt28eM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    const resData = await response.json();

    if (!response.ok) {
      const errorId = resData.error.message;
      let message = "Something went wrong";

      if (errorId === "EMAIL_EXISTS") {
        message = "The Email address already exists";
      }

      console.log(resData);
      // throw new Error(message);
      alert(message);
      return;
    }

    console.log(resData);
    dispatch(authenticate(resData.idToken, resData.localId));

    saveDataToStorage(navigation, resData.idToken, resData.localId);
  };
};

export const login = (navigation, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgYVReIckytWWAUB7LUzeQ_MGDcYt28eM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      const errorId = resData.error.message;
      let message = "Something went wrong";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "The Email address could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "The Password is not valid!";
      }

      console.log(resData);
      alert(message);
      return;
    }

    console.log(resData);
    dispatch(authenticate(resData.idToken, resData.localId));

    saveDataToStorage(navigation, resData.idToken, resData.localId);
  };
};

export const logout = (navigation) => {
  const wait = AsyncStorage.removeItem("userData");

  if (wait) {
    navigation.navigate("Verify");
  }

  return { type: LOGOUT };
};

const saveDataToStorage = async (navigation, token, userId) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );

  navigation.navigate("Verify");
};
