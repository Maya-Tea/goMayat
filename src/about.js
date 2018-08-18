import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";

import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Text,
  Dimensions,
  FlatList
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import ViewShot from "react-native-view-shot";
import ImagePicker from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { Col, Row, Grid } from "react-native-easy-grid";

const DIMS = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width
};

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageArray: []
    };
  }

  componentDidMount() {}

  render() {
    console.log("inRender", this.state.imageArray);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text>About</Text>
      </SafeAreaView>
    );
  }
}

export default About;
