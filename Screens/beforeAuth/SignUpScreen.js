import React, { useState } from "react";
import { Text, View, StyleSheet, Keyboard } from "react-native";

import { useDispatch } from "react-redux";

import InputCom from "../../Components/helpingComponents/InputCom";
import ButtonCom from "../../Components/helpingComponents/ButtonCom";
import * as AuthActions from "../../Store/Actions/auth";

const SignUpScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, fontWeight: "700" }}> SignUp</Text>
      <View style={styles.inputContainer}>
        <InputCom title={"Name"} borderBottom />
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
          value={Password}
          onChangeText={(text) => setPassword(text)}
        />

        <ButtonCom
          color={"#093F40"}
          padding={10}
          round
          onPress={() => {
            Keyboard.dismiss();
            dispatch(AuthActions.signup(props.navigation, Email, Password));
          }}
        >
          <Text style={{ color: "white" }}>SignUp</Text>
        </ButtonCom>

        <ButtonCom
          color={"#093F40"}
          padding={10}
          round
          onPress={() => props.navigation.navigate("login")}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </ButtonCom>
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
});

export default SignUpScreen;
