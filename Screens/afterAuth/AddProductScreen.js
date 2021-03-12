import React from "react";
import { Text, View } from "react-native";
import AddProductCom from "../../Components/Product/AddProductCom";

const AddProductScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <AddProductCom />
    </View>
  );
};

export default AddProductScreen;
