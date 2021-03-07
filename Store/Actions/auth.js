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

export const authenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, token, name:"", picture:"" });
  };
};

export const authenticateUser = (token, _, name, picture) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, token, name, picture });
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

export const loginFB = (navigation, name, picture, UID, isNewUser) => {
  return async (dispatch) => {
    try {
      if (true) {
        const response = await fetch(
          `https://madproject-64d49-default-rtdb.firebaseio.com/Users/${UID}.json`,
          {
            method: "Patch",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: name,
              pictureUrl: picture,
              UID: UID,
            }),
          }
        );
        dispatch(authenticateUser(UID, UID, name, picture));
        saveDataToStorage(navigation, UID, UID, name, picture);
      }
      // dispatch(authenticate(UID, UID,name,picture));
      // saveDataToStorage(UID,UID,name,picture);

      // const resData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginGoogle = (name, picture, UID, isNewUser) => {
  return async (dispatch) => {
    try {
      if (true) {
        const response = await fetch(
          `https://shopout-ver-1.firebaseio.com/Shoppers/${UID}.json`,
          {
            method: "Patch",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: name,
              pictureUrl: picture,
              UID: UID,
              location: {
                latitude: "",
                longitude: "",
                address: "",
                locality: "Janakpuri",
              },
            }),
          }
        );

        dispatch(authenticate(UID, UID, name, picture));
        saveDataToStorage(UID, UID, name, picture);
      }
      // dispatch(authenticate(UID, UID,name,picture));
      // saveDataToStorage(UID, UID,name,picture);
      // const resData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (navigation) => {
  const wait = AsyncStorage.removeItem("userData");

  if (wait) {
    navigation.navigate("Verify");
  }

  return { type: LOGOUT };
};

const saveDataToStorage = async (navigation, token, userId, name, picture) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      name: name,
      picture: picture,
    })
  );

  navigation.navigate("Verify");
};
