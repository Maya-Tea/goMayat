import React, { Component } from "react";
import { withNavigation } from "react-navigation";

import { Animated, Dimensions, StyleSheet, View, Button } from "react-native";

import NavModal from "./NavModal";
import { Flower } from "./animSVGs";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;
DIMS = { height: Height, width: Width };

class FlowerAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHomeIcon: true,
      logoWidth: Width * 0.4,
      logoHeight: Width * 0.4,
      iconRotate: new Animated.Value(0),
      iconsPressRotate: new Animated.Value(0),
      // iconsGrow: new Animated.Value(0),
      // logoGrow: new Animated.Value(0),
      // iconsShow: new Animated.Value(0),
      // iconsFade: new Animated.Value(0),
      toggleRotate: false,
      showProducts: false,
      isAtomVisible: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.iconAnimate();
    }, 1000);
  }

  componentWillReceiveProps() {
    this.iconAnimate();
  }

  iconAnimate = () => {
    Animated.sequence([
      Animated.timing(this.state.iconRotate, {
        toValue: 200,
        duration: 2000
      }),
      Animated.timing(this.state.iconRotate, {
        toValue: 0,
        duration: 2000
      }),
      Animated.timing(this.state.iconRotate, {
        toValue: 100,
        duration: 2000
      })
      // Animated.timing(this.state.iconRotate, {
      //   toValue: 50,
      //   duration: 2000
      // }),
    ]).start();
  };
  iconPress = () => {
    console.log("press");
  };

  render() {
    const animateS1 = {
      transform: [
        {
          rotateZ: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        }
      ]
    };
    const animateS2 = {
      transform: [
        {
          rotateY: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        }
      ]
    };
    const animateS3 = {
      transform: [
        {
          rotate: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        },
        {
          translateY: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 200]
          })
        }
      ]
    };
    const animateS6 = {
      transform: [
        {
          rotate: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        },
        {
          translateY: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: [0, -200]
          })
        }
      ]
    };
    const animateS4 = {
      transform: [
        {
          translateX: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 200]
          })
        },
        {
          rotate: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        }
      ]
    };
    const animateS5 = {
      transform: [
        {
          translateX: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: [0, -200]
          })
        },
        {
          rotate: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        }
      ]
    };
    return (
      <View
        style={{
          display: "flex",
          height: this.state.logoHeight,
          width: this.state.logoWidth,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Flower
          showIcon={this.state.showHomeIcon}
          logoWidth={this.state.logoWidth}
          logoHeight={this.state.logoHeight}
          iconRotate={this.state.iconRotate}
          animate={animateS3}
          color="gray"
          onPress={() => {
            this.iconPress();
            this.setState({ isAtomVisible: true });
          }}
        />
        <Flower
          showIcon={this.state.showHomeIcon}
          logoWidth={this.state.logoWidth}
          logoHeight={this.state.logoHeight}
          iconRotate={this.state.iconRotate}
          animate={animateS4}
          color="white"
          onPress={() => {
            this.iconPress();
          }}
        />
        <Flower
          showIcon={this.state.showHomeIcon}
          logoWidth={this.state.logoWidth}
          logoHeight={this.state.logoHeight}
          iconRotate={this.state.iconRotate}
          animate={animateS5}
          color="black"
          onPress={() => {
            this.iconPress();
          }}
        />
        <Flower
          //calculateIcon={this.calculateIcon}
          showIcon={this.state.showHomeIcon}
          logoWidth={this.state.logoWidth}
          logoHeight={this.state.logoHeight}
          iconRotate={this.state.iconRotate}
          animate={animateS6}
          color="yellow"
          onPress={() => {
            this.iconPress();
          }}
        />
      </View>
    );
  }
}

export default withNavigation(FlowerAnimation);
