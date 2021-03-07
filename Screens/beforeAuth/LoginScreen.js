import React, { useState } from "react";
import { Text, View, StyleSheet, Keyboard, Image } from "react-native";

import InputCom from "../../Components/helpingComponents/InputCom";
import ButtonCom from "../../Components/helpingComponents/ButtonCom";
import { useDispatch } from "react-redux";
import * as AuthActions from "../../Store/Actions/auth";
import Divide from "../../Components/helpingComponents/Divide";

import FbAuth from "../../Components/beforeLogin/FbAuth";
import GoogleAuth from "../../Components/beforeLogin/GoogleAuth";

const LoginSCreen = (props) => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(AuthActions.login(props.navigation, Email, password));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, fontWeight: "700" }}> Login</Text>
      <View style={styles.inputContainer}>
        <InputCom
          title={"Email"}
          borderBottom
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputCom
          title={"Password"}
          borderBottom
          secure
          value={password}
          onChangeText={(text) => setpassword(text)}
        />

        <ButtonCom
          color={"#093F40"}
          padding={10}
          round
          onPress={() => {
            Keyboard.dismiss();
            loginHandler();
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </ButtonCom>

        <ButtonCom
          color={"#093F40"}
          padding={10}
          round
          onPress={() => props.navigation.navigate("signUp")}
        >
          <Text style={{ color: "white" }}>SignUp</Text>
        </ButtonCom>

        <Divide styleView={{ marginVertical: 20, alignItems: "center" }} />

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <FbAuth authAction="SignIn">
            <Image
              style={styles.image}
              source={require("../../assets/Icon/facebook.jpg")}
            />
          </FbAuth>

          <GoogleAuth authAction="SignIn">
            <Image
              style={styles.image}
              source={require("../../assets/Icon/google.jpg")}
            />
          </GoogleAuth>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CEF6F6",
  },
  inputContainer: {
    height: 350,
    width: "80%",
    margin: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#093F40",
    padding: 10,
  },
  image: {
    resizeMode: "contain",
    height: 30,
    width: 30,
  },
});

export default LoginSCreen;
