import React, { Component } from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";

import Svg, { G, Circle, Path, Text } from "react-native-svg";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  InteractionManager,
  View,
  Easing
} from "react-native";
import {
  GaugeSVG,
  YarnSVG,
  SelfieSVG,
  CatSVG,
  StarSVG,
  LotusSVG,
  FullFlowerSVG
} from "./images/AtomModalSVGs";

const { height: h, width: w } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

const SVGArray = [
  <StarSVG />,
  <YarnSVG />,
  <CatSVG />,
  <SelfieSVG />,
  <GaugeSVG />,
  <LotusSVG />
];
const screens = ["Help", "About", "catList", "Selfie", "StopWatch", "Home"];

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
let iconDisappearTimeout;
let logoDisappearTimeout;

export default class NavModal extends Component {
  constructor(props) {
    super(props);
    this.renderWidth = this.props.DIMS.width / 4;
    this.iconRenderWidth = this.props.DIMS.width * 0.125;

    this.state = {
      rotation: "0deg",
      rotationIcon: "0deg",
      iconR: this.iconHeight / 2,
      iconOpacity: 0,
      logoOpacity: 0,
      labelOpacity: 0,
      iconScale: 1.5,
      cx: this.props.DIMS.width / 2 - this.iconRenderWidth / 2,
      cy: this.props.DIMS.height / 2 - this.iconRenderWidth / 2,
      r: this.props.DIMS.width / 4,
      iconsFade: new Animated.Value(1),
      iconsPressRotate: new Animated.Value(0),
      iconsPressRotate2: new Animated.Value(0),
      iconJiggle: new Animated.Value(0)
    };
  }

  calcIconLocation = angleLocation => {
    let angleRotation;
    if (angleLocation >= 360) {
      angleLocation = angleLocation - 360;
    }
    if (angleLocation >= 180) {
      angleRotation = 360 - (angleLocation - 180);
    } else {
      angleRotation = 180 - angleLocation;
    }
    let negativeAngleRotation = angleRotation * -1;
    this.setState({ rotationIcon: negativeAngleRotation + "deg" });
    this.setState({ rotation: angleRotation + "deg" });
    return angleRotation;
  };

  rotateIconGroupOnPress = (angleRotation, spinFactor) => {
    console.log(angleRotation * spinFactor);
    Animated.parallel([
      Animated.timing(this.state.iconsPressRotate, {
        toValue: 300,
        duration: angleRotation * spinFactor,
        easing: Easing.in(Easing.elastic(1))
      }),
      Animated.timing(this.state.iconsPressRotate2, {
        toValue: 300,
        duration: angleRotation * spinFactor,
        easing: Easing.in(Easing.elastic(1))
      })
    ]).start();
  };

  rotateIconGroupBack = () => {
    Animated.timing(this.state.iconsPressRotate, {
      toValue: 0,
      duration: 1
    }).start();
    Animated.timing(this.state.iconsPressRotate2, {
      toValue: 0,
      duration: 1
    }).start();
  };

  shrinkIcons = () => {
    Animated.sequence([
      Animated.timing(this.props.iconsGrow, {
        toValue: Platform.OS == "ios" ? 0 : 1,
        duration: 300
      })
    ]).start();
  };

  shrinkLogo = () => {
    Animated.sequence([
      Animated.timing(this.props.logoGrow, {
        toValue: Platform.OS == "ios" ? 0 : 1,
        duration: 300
      })
    ]).start();
  };

  cartesianToPolar = (x, y) => {
    const cy = this.state.cy;
    const cx = this.state.cx;
    return Math.round(
      Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90)
    );
  };

  polarToCartesian = (angle, r) => {
    const cy = this.state.cy;
    const cx = this.state.cx;
    const a = (angle - 270) * Math.PI / 180.0;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return { x, y };
  };

  resetModal = () => {
    setTimeout(this.props.closeModal, 500);
    this.shrinkIcons();
    this.shrinkLogo();
    this.setState({ isClosing: true });
  };

  render() {
    //console.log(this.state.rotation);
    let shrinkIconTimeout;
    let shrinkLogoTimeout;
    let iconRotateBackTimeout;
    let navigateAwayTimeout;
    const { rotation, rotationIcon } = this.state;
    const { isVisible, navigation, closeModal } = this.props;

    const growIcons = this.props.iconsGrow.interpolate({
      inputRange: [0, 50],
      outputRange: [0, this.state.iconScale]
    });

    const fadeIcons = this.props.iconsFade.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1]
    });

    const expandLogo = this.props.logoGrow.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1]
    });

    const rotateIconGroupOnPress = this.state.iconsPressRotate.interpolate({
      inputRange: [0, 300],
      outputRange: ["0deg", rotation]
      //opacity:this.state.iconsFade,
    });
    const rotateIconsPress = this.state.iconsPressRotate2.interpolate({
      inputRange: [0, 300],
      outputRange: ["0deg", rotationIcon]
    });

    return (
      <Modal
        isVisible={isVisible}
        onModalShow={() => {
          this.setState({ iconOpacity: 1, logoOpacity: 1 });
        }}
        animationIn={"fadeIn"}
        animationInTiming={20}
        animationOutTiming={100}
        animationOut={"fadeOut"}
        onBackdropPress={closeModal}
        backdropOpacity={0.8}
        style={{
          flex: 1,
          margin: 0,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={this.resetModal}
          style={{
            position: "absolute",
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            height: h,
            width: w
          }}
        >
          <Animated.View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                backgroundColor: "transparent",
                height: h,
                width: w,
                position: "absolute",
                transform: [
                  {
                    rotate: rotateIconGroupOnPress
                  }
                ]
              }
            ]}
          >
            {screens.map((screen, i) => {
              const coors = this.polarToCartesian(
                (i + 1) * 60 + 30,
                DIMS.width * 0.025
              );
              const coors2 = this.polarToCartesian(
                (i + 1) * 60 + 30,
                this.iconRenderWidth * 1.5
              );
              let transX;
              let transY;
              transX = coors.x - coors2.x;
              transY = coors.y - coors2.y;
              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    top: coors.y,
                    left: coors.x,
                    height: this.iconRenderWidth * 1.1,
                    width: this.iconRenderWidth * 1.1,
                    transform: [
                      { scale: growIcons },
                      { translateX: transX },
                      { translateY: transY },
                      { rotate: rotateIconsPress }
                    ]
                  }}
                  key={(screen, i)}
                >
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      backgroundColor: "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                      height: this.iconRenderWidth * 1.1,
                      width: this.iconRenderWidth * 1.1
                    }}
                    onLongPress={e => {
                      console.log({ screen });
                    }}
                    onPress={() => {
                      const spinFactor = 7;
                      const setRotation = this.calcIconLocation(
                        (i + 1) * 60 + 30
                      );

                      this.rotateIconGroupOnPress(setRotation, spinFactor);

                      navigateAwayTimeout = setTimeout(() => {
                        closeModal();
                        navigation.navigate(screen, { name: screen });
                      }, setRotation * spinFactor + 1100);
                      shrinkIconTimeout = setTimeout(
                        this.shrinkIcons,
                        setRotation * spinFactor + 600
                      );
                      iconRotateBackTimeout = setTimeout(
                        this.rotateIconGroupBack,
                        setRotation * spinFactor + 1000
                      );
                      shrinkLogoTimeout = setTimeout(
                        this.shrinkLogo,
                        setRotation * spinFactor + 600
                      );
                    }}
                  >
                    <AnimatedSvg
                      style={{
                        position: "absolute",
                        backgroundColor: "transparent",
                        zIndex: 0,
                        alignItems: "center",
                        opacity: growIcons
                      }}
                      key={screen}
                      height={this.iconRenderWidth}
                      width={this.iconRenderWidth}
                      viewBox={`0 0 ${2000} ${2000}`}
                    >
                      {SVGArray[i]}
                    </AnimatedSvg>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </Animated.View>
          <TouchableOpacity
            onPress={this.resetModal}
            style={{
              position: "absolute",
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: this.renderWidth * 1.5 / 2,
              height: this.renderWidth * 1.5,
              width: this.renderWidth * 1.5
            }}
          >
            <AnimatedSvg
              style={{
                opacity: growIcons,
                backgroundColor: "green",
                position: "absolute",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                transform: [{ scale: expandLogo }]
              }}
              height={this.renderWidth}
              width={this.renderWidth}
              viewBox={`0 0 ${1250} ${1250}`}
            >
              <G fill="yellow">
                <FullFlowerSVG />
              </G>
            </AnimatedSvg>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}
