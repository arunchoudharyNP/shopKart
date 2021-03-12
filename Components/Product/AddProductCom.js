import React, { useState } from "react";
import { Text, View } from "react-native";
import ButtonCom from "../helpingComponents/ButtonCom";
import InputCom from "../helpingComponents/InputCom";
import { useDispatch } from "react-redux";
import * as ProductActions from "../../Store/Actions/Product";
import { useSelector } from "react-redux";

const AddProductCom = (props) => {
  const [name, setname] = useState("");
  const [details, setdetails] = useState("");
  const [price, setprice] = useState("");
  const [url, seturl] = useState("");
  const UID = useSelector((state) => state.AuthReducer.token);

  console.log(UID);
  const dispatch = useDispatch();

  const submitHandler = () => {
    console.log("click2");
    dispatch(ProductActions.addProduct({ UID, name, details, price, url }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 28, alignSelf: "center" }}>Add Product </Text>
      <InputCom
        title={"Product Name"}
        placeholder={"Enter your product name"}
        borderBottom
        value={name}
        onChangeText={(text) => {
          setname(text);
        }}
      />
      <InputCom
        title={"Product Details"}
        placeholder={"Enter your product details"}
        borderBottom
        value={details}
        onChangeText={(text) => {
          setdetails(text);
        }}
      />
      <InputCom
        title={"Price"}
        placeholder={"Enter your product price"}
        borderBottom
        value={price}
        // url={price}
        onChangeText={(text) => {
          setprice(text);
        }}
      />
      <InputCom
        title={"Image URL"}
        placeholder={"Enter your Image URL"}
        borderBottom
        url={url}
        onChangeText={(text) => {
          seturl(text);
        }}
      />
      <ButtonCom
        padding={10}
        center
        circle
        round
        onPress={() => {
          console.log("click");
          submitHandler();
        }}
      >
        <Text>Submit</Text>
      </ButtonCom>
      <ButtonCom />
    </View>
  );
};

export default AddProductCom;
