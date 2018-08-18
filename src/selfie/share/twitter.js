import React, { Component } from "react";
import Modal from "react-native-modal";
import twitter, { auth } from "react-native-twitter";
import {
  AsyncStorage,
  Button,
  CameraRoll,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default class Twitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      isVisible: false,
      text: "",
      tokens: {
        consumerKey: "vpzk8kGR9WkrZ1IEJdBFPmL6g",
        consumerSecret: "jiletjgjjPWffy0jk0PipcHM40PogWuMLinips83caxG531tL5",
        accessToken: "",
        accessTokenSecret: ""
      },
      twitter: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("tokens").then(tokens => {
      if (tokens) {
        this.handleTokens(JSON.parse(tokens));
      }
    });
  }

  handleTokens(tokens) {
    this.setState({
      authorized: true,
      tokens,
      twitter: twitter(tokens)
    });
  }

  handleSubmit = () => {
    CameraRoll.saveToCameraRoll(this.props.uri)
    .then(() => {
      CameraRoll.getPhotos({ first: 1 })
      .then(({ edges: [{ node: { image } }] }) =>
      this.state.twitter.rest.post("media/upload", { name: "test", media: image })
    )
    .then(res =>{
      this.state.twitter.rest.post("statuses/update", {
        name: "test",
        status: this.state.text,
        media_ids: res.media_id_string
      })}
    )
    .catch(console.warn);
    alert("Share to Twitter success.");

    this.setState({ text: "" });
    this.setState({ isVisible: !this.state.isVisible });
    })
  }

  render() {
    GA.trackScreenView("Thinking about sharing to Twitter");
    return (
      <View>
        <Button
          onPress={
            this.state.authorized
              ? () => this.setState({ isVisible: !this.state.isVisible })
              : () => {
                auth(this.state.tokens, "deeplinkingapp://test").then(
                  ({ accessToken, accessTokenSecret }) => {
                    const tokens = { ...this.state.tokens, accessToken, accessTokenSecret };
                    this.handleTokens(tokens);
                    AsyncStorage.setItem("tokens", JSON.stringify(tokens));
                    this.setState({ isVisible: !this.state.isVisible });
                  }
                );
              }
          }
          title="Share w/ Twitter"
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
            onChangeText={text => {
              this.setState({ text });
            }}
            style={styles.input}
            value={this.state.text}
          />

          <Button
            title={"Cancel"}
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          />

          <Button
            title="submit"
            onPress={this.handleSubmit}
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
