import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";

import Modal from "react-native-modal";
import Svg, { G, Circle, Path } from "react-native-svg";
import {
  StyleSheet,
  Image,
  View,
  Animated,
  TouchableOpacity,
  CameraRoll,
  Text,
  Platform,
  ActivityIndicator,
  Keyboard,
  Alert,
  TextInput,
  Slider,
  Dimensions
} from "react-native";

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import ViewShot from "react-native-view-shot";
import ImagePicker from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";

import StickerModal from "./stickerModal";

//import { deviceLayout } from "../../../actions/deviceActions";
import SeeSelfie from "./seeSelfieModal";
//import ShareModal from './share';
import CameraSVG from "./cameraSVG";

let stickers = [];
let stickerEvents = [];
let stickerFunctions = [];

let messages = [];
let messageEvents = [];
let messageFunctions = [];

const DIMS = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width
};

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const USE_NATIVE_DRIVER = true;
const options = {
  title: "Select Selfie",
  cameraType: "front",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const styles = StyleSheet.create({
  animatedView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute"
  }
});

const cameraImg = require("./images/camera.png");
const trashImg = require("./images/trash.png");
const galleryImg = require("./images/gallery.png");

const stickerImages = [
  { source: require("./images/bunnyturtle.png") },
  { source: require("./images/glasses.png") },
  { source: require("./images/snowhat.png") },
  { source: require("./images/rednose.png") },
  { source: require("./images/diamond.png") },

  { source: require("./images/ears.png") },
  { source: require("./images/flower.png") },
  { source: require("./images/hat.png") },
  { source: require("./images/heart.png") },
  { source: require("./images/pear.png") },
  { source: require("./images/rose.png") },
  { source: require("./images/snake.png") },

  { source: require("./images/antlers.png") }
];
export default class Stickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickers: [],
      messages: [],
      ActivityIndicator: false,
      selectedItem: null,
      scale: 1,

      captured: null,
      captureConfig: null,
      stickerModal: false,
      seeSelfieModal: false,
      seeShareModal: false,
      picture: false,

      text: "",
      fontSize: DIMS.width * 0.08,
      fontColor: "hsl(0, 100%, 50%)",
      selfieURI: null,
      brandMark: false,
      textMode: false,
      hue: 0,
      saturation: 100,
      lightness: 50
    };
  }

  componentDidUpdate() {
    console.log("didUpdate");
    //this.iconAnimate();
  }
  componentWillReceiveProps() {
    console.log("recieveProps");
    this.clearArrays();
  }

  componentWillUnmount() {
    this.clearArrays();
    console.log("unmounting");
  }

  navigateBack = () => {
    let LastPage = this.props.lastPage;
    this.props.navigation.navigate(LastPage, {
      name: LastPage
    });
  };

  sharePress = () => {
    this.setState({ ActivityIndicator: !this.state.ActivityIndicator });
    //    setTimeout(()=>this.onImageShare(), 500);
  };
  savePress = () => {
    this.setState({ ActivityIndicator: true });
    setTimeout(() => this.onImageSave(), 500);
  };
  onImageSave = () => {
    //  this.setState({ActivityIndicator: true});
    this.viewShot.capture().then(uri => {
      this.setState({ selfieURI: uri });
      //  this.setState({ActivityIndicator: false});
      this.setState({ seeSelfieModal: true });
      CameraRoll.saveToCameraRoll(uri);
    });
  };

  onImageShare = () => {
    this.setState({ seeShareModal: true });
    this.setState({ brandMark: true });
  };

  captureView = () => {
    this.viewShot.capture().then(uri => {
      this.setState({ selfieURI: uri });
    });
  };

  closeModal = () => {
    this.setState({
      seeSelfieModal: false,
      stickerModal: false
      //  shareModal: false,
    });
  };

  textInputChange = value => {
    this.setState({
      text: value
    });
  };

  addEvents = (array, eArray) => {
    for (let i = 0; i < array.length; i++) {
      eArray[i] = {
        _rotateStr: array[i]._rotate.interpolate({
          inputRange: [-100, 100],
          outputRange: ["-100rad", "100rad"]
        }),
        _onPinchGestureEvent: Animated.event(
          [{ nativeEvent: { scale: array[i]._pinchScale } }],
          { useNativeDriver: USE_NATIVE_DRIVER }
        ),
        _onRotateGestureEvent: Animated.event(
          [{ nativeEvent: { rotation: array[i]._rotate } }],
          { useNativeDriver: USE_NATIVE_DRIVER }
        ),
        _onGestureEvent: Animated.event(
          [
            {
              nativeEvent: {
                translationX: array[i]._translateX,
                translationY: array[i]._translateY
              }
            }
          ],
          { useNativeDriver: USE_NATIVE_DRIVER }
        )
      };
    }
  };

  addFunctions = (array, fArray, type) => {
    for (let i = 0; i < array.length; i++) {
      fArray[i] = {
        _onRotateHandlerStateChange: event => {
          if (event.nativeEvent.oldState === State.ACTIVE) {
            array[i]._lastRotate += event.nativeEvent.rotation;
            array[i]._rotate.setOffset(array[i]._lastRotate);
            array[i]._rotate.setValue(0);
            this.selectItem(i, type);
          }
        },
        _onPinchHandlerStateChange: event => {
          if (event.nativeEvent.oldState === State.ACTIVE) {
            array[i]._lastScale *= event.nativeEvent.scale;
            array[i]._baseScale.setValue(array[i]._lastScale);
            array[i]._pinchScale.setValue(1);
            this.selectItem(i, type);
          }
        },
        _onHandlerStateChange: event => {
          if (event.nativeEvent.oldState === State.ACTIVE) {
            array[i]._lastOffset.x += event.nativeEvent.translationX;
            array[i]._lastOffset.y += event.nativeEvent.translationY;
            array[i]._translateX.setOffset(array[i]._lastOffset.x);
            array[i]._translateX.setValue(0);
            array[i]._translateY.setOffset(array[i]._lastOffset.y);
            array[i]._translateY.setValue(0);
            this.selectItem(i, type);
          }
        }
      };
    }
  };

  choosePicture = () => {
    ImagePicker.showImagePicker(options, response => {
      let source = { uri: response.uri };
      if (source.uri) {
        this.setState({ picture: true });
        this.clearArrays();
        this.setState({
          selfieSource: source.uri,
          selectedItem: null
        });
      }
    });
  };

  launchCamera = () => {
    ImagePicker.launchCamera(options, response => {
      let source = { uri: response.uri };
      if (source.uri) {
        this.setState({ picture: true });
        this.clearArrays();
        this.setState({
          selfieSource: source.uri,
          selectedItem: null
        });
      }
    });
  };

  closeStickerModal = stickerSource => {
    this.setState({
      stickerModal: false
    });
    stickers.push({
      source: stickerSource,
      _translateX: new Animated.Value(0),
      _translateY: new Animated.Value(0),
      _lastOffset: { x: 0, y: 0 },
      _baseScale: new Animated.Value(1),
      _pinchScale: new Animated.Value(1),

      _lastScale: 1,
      _rotate: new Animated.Value(0),
      _lastRotate: 0
    });

    const currentIndex = stickers.length - 1;

    //stickers[currentIndex]._scale= Animated.multiply(stickers[currentIndex]._baseScale, stickers[currentIndex]._pinchScale);
    stickers[currentIndex]._scale = 1;
    stickers[currentIndex]._idRotate = "rotate" + currentIndex;
    stickers[currentIndex]._idPinch = "pinch" + currentIndex;

    this.selectItem(currentIndex, "sticker");

    this.addEvents(stickers, stickerEvents);
    this.addFunctions(stickers, stickerFunctions, "sticker");
  };

  setFontState = (category, value) => {
    this.setState({ [category]: value });
  };

  addText = () => {
    const textColor = `hsl(${this.state.hue},${this.state.saturation}%,${
      this.state.lightness
    }%)`;

    const hueColors = [];
    const satColors = [];
    const lightColors = [];

    for (let i = 0; i <= 360; i += 10) {
      hueColors.push(`hsl(${i}, 100%, 50%)`);
    }
    for (let i = 0; i <= 100; i += 10) {
      satColors.push(`hsl(${this.state.hue}, ${i}%, 50%)`);
      lightColors.push(
        `hsl(${this.state.hue}, ${this.state.saturation}%, ${i}%)`
      );
    }

    return (
      <View
        style={[
          styles.animatedView,
          {
            height: this.state.fontSize * 6,
            top: DIMS.height / 6,
            width: DIMS.width,
            // borderColor:'red',
            // borderWidth: 1,
            justifyContent: "space-between"
          }
        ]}
      >
        <TextInput
          style={[
            {
              color: textColor,
              width: DIMS.width,
              textAlign: "center",
              fontSize: this.state.fontSize,
              alignSelf: "center",
              flex: 1
            }
          ]}
          returnKeyType="done"
          onChangeText={text => this.setState({ text })}
          onBlur={() => {
            this.setState({ textMode: false });
            if (this.state.text.replace(/\s/g, "").length) {
              this.closeTextView(
                textColor,
                this.state.fontFamily,
                this.state.text
              );
            }
          }}
          autoFocus={true}
          //  underlineColorAndroid="transparent"
          underlineColorAndroid={"rgba(0,0,0,0)"}
          selectionColor={textColor}
          spellCheck={true}
          placeholder=""
          placeholderTextColor={"#919191"}
          value={this.state.text}
          //multiline = {true}
          //numberOfLines = {3}
        />

        <LinearGradient
          colors={hueColors}
          style={{
            //  position: "absolute",
            bottom: 0,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 5,
            marginBottom: 5
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <Slider
            style={{ width: DIMS.width * 0.8, height: 20, borderRadius: 50 }}
            minimumValue={0}
            maximumValue={360}
            //value={this.state.slideValue}
            onValueChange={value => this.setState({ hue: value })}
            maximumTrackTintColor="black"
            minimumTrackTintColor="black"
          />
        </LinearGradient>
        <LinearGradient
          colors={satColors}
          style={{
            //  position: "absolute",
            bottom: 0,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 5,
            marginBottom: 5
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <Slider
            style={{ width: DIMS.width * 0.8, height: 20, borderRadius: 50 }}
            minimumValue={0}
            maximumValue={100}
            value={100}
            onValueChange={value => this.setState({ saturation: value })}
            maximumTrackTintColor="black"
            minimumTrackTintColor="black"
          />
        </LinearGradient>
        <LinearGradient
          colors={lightColors}
          style={{
            //  position: "absolute",
            bottom: 0,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 5,
            marginBottom: 5
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <Slider
            style={{ width: DIMS.width * 0.8, height: 20, borderRadius: 50 }}
            minimumValue={0}
            maximumValue={100}
            value={50}
            onValueChange={value => this.setState({ lightness: value })}
            maximumTrackTintColor="black"
            minimumTrackTintColor="black"
          />
        </LinearGradient>
      </View>
    );
  };

  closeTextView = (color, fontFamily, textContent) => {
    // this.setState({
    //   textModal: false
    // });
    messages.push({
      textStyles: { fontSize: this.state.fontSize, color, fontFamily },
      textContent,
      _translateX: new Animated.Value(0),
      _translateY: new Animated.Value(0),
      _lastOffset: { x: 0, y: 0 },
      _baseScale: new Animated.Value(1),
      _pinchScale: new Animated.Value(1),

      _lastScale: 1,
      _rotate: new Animated.Value(0),
      _lastRotate: 0
    });

    const currentIndex = messages.length - 1;

    messages[currentIndex]._scale = 1;
    messages[currentIndex]._idRotate = "rotateText" + currentIndex;
    messages[currentIndex]._idPinch = "pinchText" + currentIndex;

    this.selectItem(currentIndex, "text");

    this.addEvents(messages, messageEvents);
    this.addFunctions(messages, messageFunctions, "text");
    this.setState({ text: "" });
  };

  showModal = (key, value) => {
    this.setState({ [key]: !value });
  };

  selectItem = (index, type) => {
    this.setState({ selectedItem: { type, index } });
  };

  addBrandMark = () => {
    //NOTE get brankMark from props
    const brandMark = require("./Logo.png");
    const height = DIMS.width * 0.2;
    const width = DIMS.width * 0.2;
    return (
      <View
        style={{
          position: "absolute",
          height: height,
          width: width * 1.2,
          top: DIMS.height - height,
          alignSelf: "flex-end"
        }}
      >
        <Image source={brandMark} style={{ height: height, width: width }} />
      </View>
    );
  };

  setBrandMarkState = () => {
    this.setState({ brandMark: true });
  };

  scaleSlider = () => {
    if (this.state.selectedItem !== null) {
      const type = this.state.selectedItem.type;
      const scaleToAdjust =
        type === "sticker"
          ? stickers[this.state.selectedItem.index]._scale
          : messages[this.state.selectedItem.index]._scale;

      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "black"
          }}
        >
          <View
            style={{
              width: DIMS.width * 0.2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: DIMS.width * 0.04 }}>
              RESIZE
            </Text>
          </View>
          <Slider
            style={{ width: DIMS.width * 0.8, height: 30, borderRadius: 50 }}
            minimumValue={0}
            maximumValue={4}
            orientation="vertical"
            value={scaleToAdjust}
            onValueChange={
              type === "sticker"
                ? value => {
                    stickers[this.state.selectedItem.index]._scale = value;
                    this.setState({ scale: value });
                  }
                : value => {
                    messages[this.state.selectedItem.index]._scale = value;
                    this.setState({ scale: value });
                  }
            }
            maximumTrackTintColor="white"
            minimumTrackTintColor="white"
          />
        </View>
      );
    }
  };

  deleteButton = () => {
    if (this.state.selectedItem !== null) {
      return (
        <TouchableOpacity
          style={[
            styles.iconButtonContainer,
            {
              height: DIMS.width * 0.11,
              width: DIMS.width * 0.11,
              borderRadius: DIMS.width * 0.1,
              backgroundColor: "white",
              margin: DIMS.width * 0.03
            }
          ]}
          onPress={() => this.deleteItem()}
        >
          <Image
            source={trashImg}
            style={{ height: DIMS.width * 0.11, width: DIMS.width * 0.11 }}
          />
        </TouchableOpacity>
      );
    }
  };

  deleteItem = () => {
    if (this.state.selectedItem.type === "sticker") {
      stickers.splice(this.state.selectedItem.index, 1);
      stickerEvents.splice(this.state.selectedItem.index, 1);
      stickerFunctions.splice(this.state.selectedItem.index, 1);
      this.addEvents(stickers, stickerEvents);
      this.addFunctions(stickers, stickerFunctions, "sticker");
    }
    if (this.state.selectedItem.type === "text") {
      messages.splice(this.state.selectedItem.index, 1);
      messageEvents.splice(this.state.selectedItem.index, 1);
      messageFunctions.splice(this.state.selectedItem.index, 1);
      this.addEvents(messages, messageEvents);
      this.addFunctions(messages, messageFunctions, "text");
    }
    this.setState({ selectedItem: null });
  };

  clearArrays = () => {
    stickers = [];
    stickerEvents = [];
    stickerFunctions = [];

    messages = [];
    messageEvents = [];
    messageFunctions = [];
  };

  render() {
    const iconSize = DIMS.width * 0.11;
    const backgroundSize = {
      width: DIMS.width,
      height: DIMS.height
    };
    const stickerSize = 150;
    const containerSize = Math.sqrt(
      Math.pow(stickerSize, 2) + Math.pow(stickerSize, 2)
    );
    let containerSize2 = 1.25 * containerSize;
    const containerSize3 = 1.5 * containerSize;
    const selectedStickers = stickers.map((sticker, i) => {
      return (
        <Animated.View
          style={[
            styles.animatedView,
            {
              top: DIMS.height / 5,
              marginLeft: DIMS.width * 0.05,
              height: containerSize,
              width: containerSize,
              transform: [
                { translateX: stickers[i]._translateX },
                { translateY: stickers[i]._translateY },
                { scale: stickers[i]._scale }
              ]
            }
          ]}
          collapsable={false}
          key={`Hola+${sticker.source}+${i}`}
        >
          <PanGestureHandler
            {...this.props}
            onGestureEvent={stickerEvents[i]._onGestureEvent}
            onHandlerStateChange={stickerFunctions[i]._onHandlerStateChange}
          >
            <Animated.View
              style={[
                styles.animatedView,
                {
                  height: containerSize,
                  width: containerSize,
                  transform: [{ rotate: stickerEvents[i]._rotateStr }]
                }
              ]}
            >
              <RotationGestureHandler
                id={sticker.rotate}
                simultaneousHandlers={sticker.pinch}
                onGestureEvent={stickerEvents[i]._onRotateGestureEvent}
                onHandlerStateChange={
                  stickerFunctions[i]._onRotateHandlerStateChange
                }
              >
                <Animated.Image
                  style={{
                    position: "absolute",
                    height: stickerSize,
                    width: stickerSize
                  }}
                  source={sticker.source}
                />
              </RotationGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      );
    });

    const addedText = messages.map((message, i) => {
      const textContainerSize =
        message.textContent.length * message.textStyles.fontSize;
      const textContainerHeight = message.textStyles.fontSize * 2;
      const textContainerSize3 = textContainerSize * 1.5;
      return (
        <Animated.View
          style={[
            styles.animatedView,
            {
              height: textContainerHeight,
              width: textContainerSize,
              top: DIMS.height / 5,
              alignSelf: "center",
              //marginLeft: DIMS.width * 0.05,
              transform: [
                { translateX: messages[i]._translateX },
                { translateY: messages[i]._translateY },
                { scale: messages[i]._scale }
              ]
            }
          ]}
          collapsable={false}
          key={`${message.textContent}+${i}`}
        >
          <PanGestureHandler
            {...this.props}
            onGestureEvent={messageEvents[i]._onGestureEvent}
            onHandlerStateChange={messageFunctions[i]._onHandlerStateChange}
          >
            <Animated.Text style={message.textStyles}>
              {message.textContent}
            </Animated.Text>
          </PanGestureHandler>
        </Animated.View>
      );
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <ViewShot
            ref={_viewshot => (this.viewShot = _viewshot)}
            options={backgroundSize}
          >
            {this.state.selfieSource ? (
              <Image
                style={[backgroundSize]}
                source={{ uri: this.state.selfieSource }}
              />
            ) : (
              <Image
                style={[backgroundSize]}
                source={require("./images/catSelfie.jpeg")}
              />
            )}
            {/* {this.addBrandMark()} */}
            {selectedStickers}
            {addedText}
            {this.state.textMode ? this.addText() : null}

            {this.state.brandMark ? this.addBrandMark() : null}
          </ViewShot>
          {this.state.ActivityIndicator ? (
            <View
              style={[
                backgroundSize,
                {
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,.5)",
                  position: "absolute"
                }
              ]}
            >
              <ActivityIndicator size="large" color="#D92A1C" />
            </View>
          ) : null}
          <View
            style={{
              position: "absolute",
              left: 0,
              display: "flex",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={[
                styles.iconButtonContainer,
                {
                  borderRadius: 50,
                  backgroundColor: "black",
                  height: iconSize,
                  width: iconSize,
                  margin: DIMS.width * 0.03
                }
              ]}
              onPress={this.choosePicture}
            >
              <Icon
                style={{ top: DIMS.width * 0.016, left: DIMS.width * 0.016 }}
                name={"camera"}
                size={DIMS.width * 0.08}
                color={"white"}
              />
            </TouchableOpacity>

            {this.deleteButton()}
          </View>
          <View style={{ position: "absolute", bottom: 0 }}>
            {this.scaleSlider()}
          </View>
          <View
            style={{ position: "absolute", right: 0, backgroundColor: "black" }}
          >
            <TouchableOpacity
              onPress={e =>
                //  this.navigateBack()
                this.showModal("stickerModal", this.state.stickerModal)
              }
              style={{ margin: DIMS.width * 0.015 }}
            >
              <Icon
                name={"collections"}
                size={DIMS.width * 0.08}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ textMode: !this.state.textMode });
              }}
              style={{ margin: DIMS.width * 0.015 }}
            >
              <Icon
                name={"text-fields"}
                size={DIMS.width * 0.08}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onImageSave}
              style={{ margin: DIMS.width * 0.015 }}
            >
              <Icon name={"archive"} size={DIMS.width * 0.08} color={"white"} />
            </TouchableOpacity>
          </View>

          <StickerModal
            DIMS={DIMS}
            stickerModal={this.state.stickerModal}
            closeStickerModal={this.closeStickerModal}
            closeModal={this.closeModal}
            images={stickerImages}
          />

          <SeeSelfie
            DIMS={DIMS}
            source={this.state.selfieURI}
            closeModal={this.closeModal}
            seeSelfieModal={this.state.seeSelfieModal}
          />
          {/* <ShareModal
          isVisible={this.state.seeShareModal}
          closeModal={() => this.setState({seeShareModal: false, brandMark:false})}
          uri={this.state.selfieURI}
          navigateBack={this.navigateBack}
          sharePress={this.sharePress}
          setBrandMarkState={this.setBrandMarkState}
          captureView={this.captureView}
        /> */}
          {/* <Modal
          isVisible={this.state.facebookShareAlert}
          //backdropOpacity={100}
          //animationIn='none'
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          style={[styles.topModal, {
            marginTop: Platform.OS === 'ios' ? DIMS.height * 0.03 : DIMS.height * 0,
            marginBottom: DIMS.height * 0.5,
            height: DIMS.height * 0.5,
            width: DIMS.width * 0.8,
            padding: DIMS.width * 0.08,
          }]}
        >
          <Text>Share to facebook a success</Text>
        </Modal> */}
        </View>
      </SafeAreaView>
    );
  }
}
