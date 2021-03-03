import React from "react";
import { Text, View,StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as AuthActions from "../../Store/Actions/auth";
import ButtonCom from "../../Components/helpingComponents/ButtonCom";


const DashboardScreen = (props) => {

  const dispatch = useDispatch();


  const logOutHandler =()=>{

    dispatch(AuthActions.logout(props.navigation))
  }

  return (
    <View  style={styles.container}>
      <Text>DashboardScreen</Text>
      <ButtonCom round center color="blue" padding={20} onPress={()=> {logOutHandler()}}>
        <Text style={{color:"white", fontWeight:"700"}}> LogOut</Text>
      </ButtonCom>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default DashboardScreen;
