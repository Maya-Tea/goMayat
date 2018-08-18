import React, { Component } from "react";
import Modal from "react-native-modal";

import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";

const DIMS = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width
};

const SeeSelfie = props => {
  return (
    <Modal
      isVisible={props.seeSelfieModal}
      backdropOpacity={0}
      animationIn={"slideInLeft"}
      animationOut={"slideOutRight"}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          position: "absolute",
          backgroundColor: "rgba(0,0,0,1)",
          marginTop:
            Platform.OS === "ios"
              ? props.DIMS.height * 0.03
              : props.DIMS.height * 0,
          marginBottom: props.DIMS.height * 0.5,
          height: props.DIMS.height * 0.95,
          width: props.DIMS.width * 0.98,
          padding: props.DIMS.width * 0.08
        }
      ]}
    >
      <View
        style={{
          height: DIMS.height * 0.8,
          width: DIMS.width * 0.95
        }}
      >
        <Image
          style={{
            alignSelf: "center",
            height: DIMS.height * 0.8,
            width: DIMS.width * 0.8
          }}
          source={{ uri: props.source }}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.closeModal()}
        style={[
          {
            borderColor: "yellow",
            borderWidth: 1,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            marginTop: DIMS.width * 0.05,
            height: props.DIMS.height * 0.08,
            width: props.DIMS.width * 0.25
          }
        ]}
      >
        <Text style={[{ color: "white", fontSize: props.DIMS.width * 0.07 }]}>
          OK
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default SeeSelfie;
