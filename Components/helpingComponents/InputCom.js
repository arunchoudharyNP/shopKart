import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet,TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const InputCom = (props) => {
  const {
    borderBottom,
    title,
    titleStyle,
    border,
    design,
    icon,
    min,
    max,
    secure,
    ...restProps
  } = props;
  const [iconName, seticonName] = useState(true);

  const renderIcon = () => {
    return (
      <View style={styles.iconStyle}>
        <MaterialCommunityIcons name={icon} size={28} color="black" />
      </View>
    );
  };

  const passwordViewHandler = () => {
    console.log(iconName);
    seticonName(!iconName);
  };

  const renderEyeButton = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => {
            passwordViewHandler();
          }}
        >
          <MaterialCommunityIcons
            name={iconName ? "eye" : "eye-off"}
            color="grey"
            size={20}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const inputStyle = [
    styles.input,
    borderBottom && { borderBottomWidth: 1, borderColor: "grey" },
    border && { borderWidth: 1, borderColor: "grey" },
  ];

  return (
    <View style={[design, { width: "90%" }]}>
   
      <View style={{ marginLeft: 10,marginVertical:10 }}>
        {title && <Text style={[{}, titleStyle]}> {title} </Text>}
        {icon && renderIcon()}
        <View style={{ width: "100%" }}>
          <TextInput
            secureTextEntry={secure && iconName}
            style={[
              { alignSelf: "center" },
              icon ? { paddingLeft: 40 } : null,
              inputStyle,
            ]}
            {...restProps}
          ></TextInput>
          {secure && renderEyeButton()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 35,
    width: "100%",
  },
  iconStyle: {
    position: "absolute",
    left: 10,
    top: 36,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    bottom: 8,
  },
});

export default InputCom;
