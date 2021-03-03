import React from "react";
import { Text, View,ActivityIndicator } from "react-native";

const Verify = (props) => {
  return (
    <View style={{justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
      <ActivityIndicator size={"large"} color="black"  />
    </View>
  );
};

export default Verify;
