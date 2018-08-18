import React, { Component } from "react";
import Modal from "react-native-modal";
import {
  AsyncStorage,
  Button,
  CameraRoll,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";
import FBSDK from "react-native-fbsdk";

const { AccessToken, LoginButton, LoginManager, ShareApi, ShareDialog } = FBSDK;

export default class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      text: '',
      image: null,
    };
  }

  SharePhoto = () => {
    let tmp = this;
    ShareApi.canShare({
      contentType: "photo",
      photos: [
        {
          imageUrl: this.props.uri,
          userGenerated: true,
          caption: this.state.text
        }
      ]
    })
    .then(canShare => {
      if (canShare) {
        return ShareApi.share(
          {
          contentType: "photo",
            photos: [
              {
                imageUrl: this.props.uri,
                userGenerated: true,
                caption: this.state.text
              }
            ]
          },
          "/me",
          this.state.text
        );
      }
    })
    .then(
      result => {
        alert("Share to Facebook success.");
        this.setState({ isVisible: !this.state.isVisible })
      },
      async (error) => {
        console.log(error);
        try {
          return await AsyncStorage.removeItem("@MySuperStore:facebook-token");
        } catch (error) {
          return console.log(error);
        }
      }
    )
  };

  facebookLogin = () => {
    LoginManager.logInWithPublishPermissions(["publish_actions"])
      .then(async (result) => {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          try {
            await AsyncStorage.setItem(
              "@MySuperStore:facebook-token",
              result.grantedPermissions.toString()
            );
            return this.SharePhoto();
          } catch (error) {
            return console.log(error);
          }
        }
      },
      error => {
        return console.log(error);
      }
    );
  };

  facebookLogout = async () => {
    try {
      return await AsyncStorage.removeItem("@MySuperStore:facebook-token");
    } catch (error) {
      return console.log(error);
    }
  };

  facebookShare = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:facebook-token");
      if (value !== null) {

        return this.SharePhoto();
      } else {
        return this.facebookLogin();
      }
    } catch (error) {
      return this.facebookLogin();
    }
  };

  render() {
    GA.trackScreenView("Thinking about sharing to Facebook");
    return (
      <View>
        {
          //   <LoginButton
          //   publishPermissions={["publish_actions"]}
          //   onLoginFinished={
          //     (error, result) => {
          //       if (error) {
          //         alert("facebookLogin has error: " + result.error);
          //       } else if (result.isCancelled) {
          //         alert("facebookLogin is cancelled.");
          //       } else {
          //         AccessToken.getCurrentAccessToken().then(
          //           (data) => {
          //             alert(data.accessToken.toString())
          //           }
          //         )
          //       }
          //     }
          //   }
          //   onLogoutFinished={() => this.facebookLogout()}
          // />
        }

        <Button
          title={"Share w/ Facebook"}
          onPress={() => this.setState({ isVisible: !this.state.isVisible })}
        />

        <Modal
          isVisible={this.state.isVisible}
          backdropOpacity={0}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          backdropOpacity={0.7}
          style={styles.container}
        >
          <TextInput
            maxLength={140}
            onChangeText={text => this.setState({ text })}
            style={styles.input}
            value={this.state.text}
          />

          <Button
            title={"Cancel"}
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          />

          <Button title="submit"
            onPress={() => this.facebookShare()}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  input: {
    flex: 1
  }
});
