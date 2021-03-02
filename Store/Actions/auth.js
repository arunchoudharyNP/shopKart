import AsyncStorage from "@react-native-community/async-storage";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (token, userId) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, token, userId });
  };
};

export const signup = (email, password) => {
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
      throw new Error(message);
    }

    console.log(resData);
    dispatch(authenticate(resData.idToken, resData.localId));

    saveDataToStorage(resData.idToken, resData.localId);
  };
};

// export const login = (email, password) => {
//   return async (dispatch) => {
//     const response = await fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBK5B-4U5YqpB1ScALjic8l7GDP65o8jTM",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }),
//       }
//     );

//     const resData = await response.json();

//     if (!response.ok) {
//       const errorId = resData.error.message;
//       let message = "Something went wrong";

//       if (errorId === "EMAIL_NOT_FOUND") {
//         message = "The Email address could not be found!";
//       } else if (errorId === "INVALID_PASSWORD") {
//         message = "The Password is not valid!";
//       }

//       console.log(resData);
//       throw new Error(message);
//     }

//     console.log(resData);
//     dispatch(authenticate(resData.idToken, resData.localId , parseInt(resData.expiresIn)* 1000 ));

//     const expiryDate = new Date(
//       new Date().getTime() + parseInt(resData.expiresIn) * 1000
//     );
//     saveDataToStorage(resData.idToken, resData.localId, expiryDate);
//   };
// };

export const logout = () => {
  AsyncStorage.removeItem("userData");

  return { type: LOGOUT };
};

const saveDataToStorage = async (token, userId) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );
};
