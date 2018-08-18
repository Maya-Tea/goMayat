import React, { Component } from "react";
import {
  Dimensions,
  Text,
  View,
  Animated,
  TouchableOpacity,
  PanResponder,
  Platform,
  TextInput
} from "react-native";
import Svg, { Circle, Path, G } from "react-native-svg";
import { SafeAreaView } from "react-navigation";

const DIMS = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width
};

const r = DIMS.width * 0.22;
const svgDIMS = DIMS.width * 0.73;
const cx = svgDIMS / 2;
const cy = svgDIMS / 2;
const numberRingWidth = DIMS.width * 0.06;
const pathR = r - numberRingWidth / 2;
const outerR = r + numberRingWidth / 2;
const startR = r - numberRingWidth * 2;
const controllerR = DIMS.width * 0.025;
let passedPos = false;
let passedNeg = false;
let n = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timeLeftLast;

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: 60.0,
      timerDefault: 60.0,
      timerMode: true,
      start: true,
      minFocus: false,
      cSecFocus: false,
      minText: "",
      secText: "",
      cSecText: ""
    };
    this.lastXTouch = this.polarToCartesian(59.99 * 6, pathR).x;
    this.timeLeftLast = null;
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.countdownTimer);
  }

  switchModetoTimer = () => {
    clearInterval(this.state.intervalTimer);

    this.setState({ timeRemaining: this.state.timerDefault });
    this.setState({ timerMode: true });
    this.setState({ start: "START" });
  };

  switchModetoStopWatch = () => {
    if (this.minInputRef && this.secInputRef && this.cSecInputRef) {
      this.minInputRef.blur();
      this.secInputRef.blur();
      this.cSecInputRef.blur();
    }
    clearInterval(this.state.intervalTimer);

    this.setState({ timeRemaining: 0 });
    this.setState({ timerMode: false });
    this.setState({ start: "START" });
  };

  timer = startTime => {
    if (this.state.start) {
      clearInterval(this.state.countdownTimer);
    }
    if (this.state.timerMode && this.state.timeRemaining <= 0.1) {
      this.setState({ timeRemaining: 0 });
      this.setState({ start: true });
    } else {
      const currentTime = Date.now();
      milliseconds = currentTime - startTime;
      seconds = milliseconds / 1000;
      const timeLeft = this.state.timerDefault - seconds;
      this.setState({
        timeRemaining: this.state.timerMode ? timeLeft : seconds
      });
    }
  };

  startStopTime = () => {
    if (this.state.timerMode) {
      this.minInputRef.blur();
      this.secInputRef.blur();
      this.cSecInputRef.blur();
    }

    if (this.state.start) {
      const startTime = Date.now();
      const countdownTimer = setInterval(
        () => this.timer(startTime, timeLeftLast),
        100
      );
      this.setState({ countdownTimer });
      this.setState({
        timeRemaining: this.state.timerMode ? this.state.timerDefault : 0
      });
    }
    this.setState({ start: !this.state.start });
  };

  handlePanResponderMove = (e, gesture) => {
    this.minInputRef.blur();
    this.secInputRef.blur();
    this.cSecInputRef.blur();
    if (this.state.start && this.state.timerMode) {
      const { nativeEvent: { locationX, locationY } } = e;
      const { dx, dy } = gesture;
      const positionX = locationX + dx;
      const positionY = locationY + dy;

      const truncLocationX = Math.round(locationX);
      const truncLocationY = Math.round(locationY);

      let angle =
        this.cartesianToPolar(truncLocationX, truncLocationY) + n * 360;
      //let angle = this.cartesianToPolar(positionX, positionY) + (n * 360);
      let xDirection = positionX - this.lastXTouch;

      if (
        this.state.timeRemaining % 60 > 0 &&
        this.state.timeRemaining % 60 < 2
      ) {
        if (xDirection > 0 && !passedPos) {
          n = n + 1;
          passedPos = true;
          const passedPosTimeout = setTimeout(() => {
            passedPos = false;
          }, 500);
        }
        if (xDirection < 0 && !passedNeg && n !== 0) {
          n = n - 1;
          passedNeg = true;
          const passedNegTimeout = setTimeout(() => {
            passedNeg = false;
          }, 500);
        }
      }

      this.setState({ timeRemaining: angle / 6 });

      this.lastXTouch = positionX;
      this.setState({ timerDefault: this.state.timeRemaining });
    }
  };

  cartesianToPolar = (x, y) => {
    return Math.round(
      Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 90 : 270)
    );
  };

  polarToCartesian = (angle, r) => {
    const a = (angle + 270) * Math.PI / 180.0;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return { x, y };
  };

  polarToCartesian2 = (angle, r) => {
    const a = (angle + 270) * Math.PI / 180.0;
    const x = 0 + r * Math.cos(a);
    const y = 0 + r * Math.sin(a);
    return { x, y };
  };

  pad = (number, length) => {
    var str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  };

  textInputChangeMin = (value, sec, cSec) => {
    const reg = new RegExp("^[0-9]*$");

    if (reg.test(value)) {
      this.setState({ minText: value });
      if (value !== "") {
        this.setState({ timeRemaining: parseInt(value) * 60 + sec + cSec });
        this.setState({ timerDefault: parseInt(value) * 60 + sec + cSec });
      } else {
        this.setState({ timeRemaining: sec + cSec });
        this.setState({ timerDefault: sec + cSec });
      }
    } else if (Platform.OS !== "ios") {
      this.minInputRef.blur();
    }
    //}
  };

  textInputChangeSec = (value, min, cSec) => {
    // let reg = (value==='')?new RegExp('^$'):new RegExp('^[0-5]{1}[0-9]{0,1}$');
    const reg = new RegExp("^[0-9]*$");
    if (reg.test(value) || value === " ") {
      value >= 60
        ? this.setState({ secText: (parseInt(value) - 60).toString() })
        : this.setState({ secText: value });
      if (value !== "") {
        this.setState({ timeRemaining: parseInt(value) + min * 60 + cSec });
        this.setState({ timerDefault: parseInt(value) + min * 60 + cSec });
      } else {
        this.setState({ timeRemaining: min * 60 + cSec });
        this.setState({ timerDefault: min * 60 + cSec });
      }
    } else if (Platform.OS !== "ios") {
      this.secInputRef.blur();
      //  this.setState({secText:value});
    }
  };

  textInputChangeCSec = (value, min, sec) => {
    const reg = new RegExp("^[0-9]*$");

    if (reg.test(value) || value === " ") {
      this.setState({ cSecText: value });
      if (value !== "") {
        this.setState({
          timeRemaining: parseInt(value) / 100 + min * 60 + sec
        });
        this.setState({ timerDefault: parseInt(value) / 100 + min * 60 + sec });
      } else {
        this.setState({ timeRemaining: min * 60 + sec });
        this.setState({ timerDefault: min * 60 + sec });
      }
    } else if (Platform.OS !== "ios") {
      this.cSecInputRef.blur();
    }
  };

  formatTime = () => {
    const minutes = this.state.timeRemaining / 60,
      formattedMinutes = Math.floor(minutes),
      seconds = (minutes - formattedMinutes) * 60,
      formattedSeconds = Math.floor(seconds),
      decimalSeconds = seconds - Math.floor(seconds),
      centiSeconds = Math.trunc(decimalSeconds * 100);

    const minutesD = this.state.timerDefault / 60,
      formattedMinutesD = Math.floor(minutesD),
      secondsD = (minutesD - formattedMinutesD) * 60,
      formattedSecondsD = Math.floor(secondsD),
      decimalSecondsD = secondsD - Math.floor(secondsD),
      centiSecondsD = Math.trunc(decimalSecondsD * 100);

    return (
      <View style={{ flexDirection: "row", zIndex: 100 }}>
        {this.state.timerMode ? (
          <TextInput
            style={{
              color: "white",
              flexBasis: "auto",
              fontSize: DIMS.width * 0.08,
              paddingTop: 0,
              paddingBottom: 0,
              justifyContent: "center",
              alignItems: "center",
              width: Platform.OS === "ios" ? "auto" : DIMS.width * 0.11
            }}
            ref={ref => (this.minInputRef = ref)}
            onChangeText={text =>
              this.textInputChangeMin(text, formattedSeconds, decimalSeconds)
            }
            selectionColor={"white"}
            underlineColorAndroid={"transparent"}
            spellCheck={false}
            onFocus={() => {
              this.setState({ minFocus: true });
              this.setState({ minText: "" });
            }}
            onBlur={() => {
              this.setState({ minFocus: false });
            }}
            keyboardType={"default"}
            placeholder={
              Platform.OS === "ios" ? this.pad(formattedMinutesD, 2) : "00"
            }
            blurOnSubmit={true}
            maxLength={2}
            allowFontScaling={false}
            placeholderTextColor={"#919191"}
            value={
              this.state.minFocus
                ? this.state.minText
                : this.pad(formattedMinutes, 2)
            }
          />
        ) : (
          <Text style={{ color: "white", fontSize: DIMS.width * 0.08 }}>
            {this.pad(formattedMinutes, 2)}
          </Text>
        )}
        <Text style={{ color: "white", fontSize: DIMS.width * 0.08 }}>:</Text>

        {this.state.timerMode ? (
          <TextInput
            style={{
              color: "white",
              flexBasis: "auto",
              fontSize: DIMS.width * 0.08,
              paddingTop: 0,
              paddingBottom: 0,
              justifyContent: "center",
              alignItems: "center",
              width: Platform.OS === "ios" ? "auto" : DIMS.width * 0.11
            }}
            ref={ref => (this.secInputRef = ref)}
            onChangeText={text =>
              this.textInputChangeSec(text, formattedMinutes, decimalSeconds)
            }
            selectionColor={"white"}
            underlineColorAndroid={"transparent"}
            spellCheck={false}
            onFocus={() => {
              this.setState({ secFocus: true });
              this.setState({ secText: "" });
            }}
            onBlur={() => {
              this.setState({ secFocus: false });
            }}
            keyboardType={"default"}
            placeholder={
              Platform.OS === "ios" ? this.pad(formattedSecondsD, 2) : "00"
            }
            blurOnSubmit={true}
            maxLength={2}
            allowFontScaling={false}
            placeholderTextColor={"#919191"}
            value={
              this.state.secFocus
                ? this.state.secText
                : this.pad(formattedSeconds, 2)
            }
          />
        ) : (
          <Text style={{ fontSize: DIMS.width * 0.08, color: "white" }}>
            {this.pad(formattedSeconds, 2)}
          </Text>
        )}

        <Text style={{ fontSize: DIMS.width * 0.08, color: "white" }}>
          {`.`}
        </Text>

        {this.state.timerMode ? (
          <TextInput
            style={{
              color: "white",
              flexBasis: "auto",
              fontSize: DIMS.width * 0.08,
              paddingTop: 0,
              paddingBottom: 0,
              justifyContent: "center",
              alignItems: "center",
              width: Platform.OS === "ios" ? "auto" : DIMS.width * 0.11
            }}
            ref={ref => (this.cSecInputRef = ref)}
            onChangeText={text =>
              this.textInputChangeCSec(text, formattedMinutes, formattedSeconds)
            }
            selectionColor={"white"}
            underlineColorAndroid={"transparent"}
            spellCheck={false}
            onFocus={() => {
              this.setState({ cSecFocus: true });
              this.setState({ cSecText: "" });
            }}
            onBlur={() => {
              this.setState({ cSecFocus: false });
            }}
            keyboardType={"default"}
            placeholder={
              Platform.OS === "ios" ? this.pad(centiSecondsD, 2) : "00"
            }
            blurOnSubmit={true}
            maxLength={2}
            allowFontScaling={false}
            placeholderTextColor={"#919191"}
            value={
              this.state.cSecFocus
                ? this.state.cSecText
                : this.pad(centiSeconds, 2)
            }
          />
        ) : (
          <Text style={{ fontSize: DIMS.width * 0.08, color: "white" }}>
            {this.pad(centiSeconds, 2)}
          </Text>
        )}
      </View>
    );
  };

  hideForm = async () => {
    if (this.formRef) {
      await Promise.all([this.formRef.fadeOut(300)]);
    }
  };

  render() {
    //GA.trackScreenView("Training - Stop Watch");
    const clock = [
      "00",
      "05",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55"
    ];

    const startAngle = 0;
    const timeRemaining = this.state.timeRemaining;
    const endAngle = timeRemaining * 6;
    const angleDifference = Math.abs(endAngle - startAngle);
    const startCoord = this.polarToCartesian(startAngle, pathR);
    const endCoord = this.polarToCartesian(endAngle, pathR);

    return (
      <View
        style={{
          height: DIMS.height,
          width: DIMS.width,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black"
        }}
      >
        <View
          style={[
            {
              height: DIMS.width * 0.75,
              width: DIMS.width * 0.97,
              alignSelf: "center",
              backgroundColor: "black"
            }
          ]}
          ref={ref => {
            this.formRef = ref;
          }}
        >
          <View
            style={{
              zIndex: 1,
              flex: 0.5,
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            {this.formatTime()}
          </View>

          <View style={{ flex: 3, justifyContent: "center" }}>
            {clock.map((digit, i) => {
              const coors = this.polarToCartesian(i * 30, r);
              return (
                <Text
                  style={{
                    color: "white",
                    position: "absolute",
                    backgroundColor: "transparent",
                    top: coors.y - numberRingWidth * 1.95,
                    left: coors.x + numberRingWidth * 1.7,
                    fontSize: DIMS.width * 0.0325
                  }}
                  key={digit}
                >
                  {digit}
                </Text>
              );
            })}

            <Animated.View {...this._panResponder.panHandlers}>
              <Svg
                style={{ alignSelf: "center", justifyContent: "center" }}
                width={svgDIMS}
                height={svgDIMS}
                viewBox={`0 0 ${svgDIMS} ${svgDIMS}`}
              >
                <G>
                  <Circle
                    cx={cx}
                    cy={cy}
                    r={outerR}
                    stroke={"rgb(50,50,50)"}
                    strokeWidth={DIMS.width * 0.01}
                    fill={"transparent"}
                    strokeOpacity={1}
                  />
                  <Circle cx={cx} cy={cy} r={pathR} fill={"silver"} />
                  <Circle
                    cx={cx}
                    cy={cy}
                    r={startR}
                    stroke={"yellow"}
                    strokeWidth={DIMS.width * 0.003}
                    fill={"black"}
                    strokeOpacity={1}
                  />
                  <Circle
                    cx={endCoord.x}
                    cy={endCoord.y}
                    r={controllerR}
                    fill={"yellow"}
                    strokeOpacity={1}
                  />
                  <Path
                    stroke={"yellow"}
                    strokeWidth={DIMS.width * 0.015}
                    stroke-linecap="round"
                    fill="none"
                    d={`M ${startCoord.x} ${
                      startCoord.y
                    } A ${pathR} ${pathR} 0 ${
                      angleDifference - 360 * Math.floor(timeRemaining / 60) >=
                      180
                        ? 1
                        : 0
                    } 1 ${endCoord.x} ${endCoord.y}`}
                  />
                </G>
              </Svg>
            </Animated.View>
            <TouchableOpacity
              onPress={this.startStopTime}
              style={{
                position: "absolute",
                height: DIMS.width * 0.2,
                width: DIMS.width * 0.2,
                alignSelf: "center",
                alignItems: "center",
                borderRadius: DIMS.width * 0.2 / 2,
                justifyContent: "center"
              }}
            >
              {/* top:cy-35, left:cx -55 */}
              <Text style={{ fontSize: DIMS.width * 0.055, color: "white" }}>
                {" "}
                {this.state.start ? "START" : "STOP"}{" "}
              </Text>
            </TouchableOpacity>
            {/* <View style={{height:svgDIMS, width:svgDIMS, position: 'absolute', alignSelf:'center', borderColor:'red', borderWidth:2}}> */}
          </View>
          <View
            style={{
              flex: 0.7,
              alignSelf: "center",
              justifyContent: "center",
              width: DIMS.width
            }}
          >
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  borderColor: "yellow",
                  borderWidth: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: !this.state.timerMode
                    ? "silver"
                    : "transparent",

                  height: DIMS.width * 0.1,
                  width: DIMS.width * 0.4,
                  marginLeft: 7
                }}
                onPress={() => {
                  this.switchModetoStopWatch();
                }}
              >
                <Text
                  style={{
                    color: !this.state.timerMode ? "black" : "silver",
                    fontSize: DIMS.width * 0.045
                  }}
                >{`STOP WATCH`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "yellow",
                  borderWidth: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: !this.state.timerMode
                    ? "transparent"
                    : "silver",
                  height: DIMS.width * 0.1,
                  width: DIMS.width * 0.4,
                  marginLeft: 7
                }}
                onPress={() => {
                  this.switchModetoTimer();
                }}
              >
                <Text
                  style={{
                    color: !this.state.timerMode ? "silver" : "black",
                    fontSize: DIMS.width * 0.045
                  }}
                >{`TIMER`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
