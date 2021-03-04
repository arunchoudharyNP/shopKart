import { Alert } from "react-native";

const alert = (message) => {
  Alert.alert("Something went wrong", message, [
    { text: "ok", onPress: () => console.log("OK.........") },
  ]);
};

export default alert;
