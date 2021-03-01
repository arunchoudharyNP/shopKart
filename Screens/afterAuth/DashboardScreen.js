import React from "react";
import { Text, View,StyleSheet } from "react-native";

const DashboardScreen = (props) => {
  return (
    <View  style={styles.container}>
      <Text>DashboardScreen</Text>
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
