import React, { Component } from "react";
import ParseString from "react-native-xml2js";
import { SafeAreaView } from "react-navigation";

import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  View
} from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon
} from "native-base";

const cards = [
  {
    text: "Home - animated intro SWIPE >>",
    name: "Home",
    image: require("./images/home.png")
  },
  {
    text: "Cats - View some cats SWIPE >>",
    name: "Cats",
    image: require("./images/Catlist.png")
  },
  {
    text: "Selfie - Decorate and save image or selfie SWIPE >>",
    name: "Selfie1",
    image: require("./images/selfie1.png")
  },
  {
    text: "Selfie - Decorate and save image or selfie SWIPE >>",
    name: "Selfie2",
    image: require("./images/selfie2.png")
  },
  {
    text: "Timer - move ball to set timer SWIPE >>",
    name: "Timer",
    image: require("./images/Timer.png")
  }
];

class Help extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item => (
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>{item.text}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    style={{
                      marginLeft: DIMS.width * 0.2,
                      height: DIMS.height * 0.7,
                      width: DIMS.width * 0.7
                    }}
                    source={item.image}
                  />
                </CardItem>
              </Card>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Help;
