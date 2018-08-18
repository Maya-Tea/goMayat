import React, { Component } from "react";
import Modal from "react-native-modal";
import { AsyncStorage, Button, StyleSheet, View } from "react-native";
import FacebookShare from "./facebook";
import InstaShare from "./instagram";
import TwitterShare from "./twitter";

export default class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isVisible, navigation, closeModal, uri } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        backdropOpacity={0}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        onBackdropPress={closeModal}
        backdropOpacity={0.7}
        style={styles.container}
      >
        <FacebookShare uri={uri}/>

        <TwitterShare uri={uri}/>

        <Button title={"Cancel"}
          onPress={closeModal}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
