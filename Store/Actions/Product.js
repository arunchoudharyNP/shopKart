import AsyncStorage from "@react-native-community/async-storage";

import { Alert } from "react-native";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const addProduct = (data) => {
  return async (dispatch) => {
    try {
      if (true) {
        console.log("click3")
        const response = await fetch(
          `https://madproject-64d49-default-rtdb.firebaseio.com/products.json`,
          {
            method: "post",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              UID: "1233",
              name: data.name,
              details: data.details,
              price: data.price,
              image: data.url,
            }),
          }
        );

        dispatch({ type: ADD_PRODUCT,data});
      }
      // dispatch(authenticate(UID, UID,name,picture));
      // saveDataToStorage(UID, UID,name,picture);
      // const resData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
};
