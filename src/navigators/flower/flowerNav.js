import React, { Component } from "react";
import { withNavigation } from 'react-navigation';

//import { connect } from "react-redux";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Button,
} from "react-native";

import NavModal from "./NavModal";
import {
  Flower,
} from "./animSVGs";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;
DIMS = { height: Height, width: Width };

class FlowerNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHomeIcon: true,
      logoWidth: DIMS.width*0.125,
      logoHeight: DIMS.width*0.125,
      iconRotate: new Animated.Value(0),
      iconsPressRotate: new Animated.Value(0),
      iconsGrow: new Animated.Value(0),
      logoGrow: new Animated.Value(0),
      iconsShow: new Animated.Value(0),
      iconsFade: new Animated.Value(0),
      toggleRotate: false,
      showProducts: false,
      isAtomVisible: false
    };
  }
  componentDidMount(){
  //  this.iconAnimate();
  }
  componentWillReceiveProps(newProps) {

  }

  iconAnimate=()=>{
    console.log("icon Press");
    //this.setState({isAtomVisible:true});
    Animated.sequence([
      Animated.timing(this.state.iconRotate, {
        toValue: 200,
        duration: 2000
      }),
      Animated.timing(this.state.iconRotate, {
        toValue: 0,
        duration: 2000
      }),
      // Animated.timing(this.state.iconRotate, {
      //   toValue: 200,
      //   duration: 2000
      // }),
      // Animated.timing(this.state.iconRotate, {
      //   toValue: 0,
      //   duration: 2000
      // }),
    ]).start();
}

iconPress=()=> {
  Animated.sequence([
    Animated.timing(this.state.iconRotate, {
      toValue: 200,
      duration: 2000
    }),
    Animated.timing(this.state.iconRotate, {
      toValue: 0,
      duration: 2000
    }),

  ]).start();
    Animated.sequence([
      Animated.spring(this.state.logoGrow, {
        toValue: 60,
        velocity: 1,
        speed: 1,
        delay: 200
      })
    ]).start();
    Animated.sequence([
      Animated.spring(this.state.iconsGrow, {
        toValue: 70,
        velocity: 1,
        speed: 1,
        delay: 400
      })
    ]).start();
  }


  // navigate(onHomeScreen) {
  //   return this.setState({ isAtomVisible: !this.state.isAtomVisible });
  // }

  render() {

    const animateS1={
      transform: [
        {
          rotateZ: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        },
      ]
    }
    const animateS2={
      transform: [
        {
          rotateY: this.state.iconRotate.interpolate({
            inputRange: [0, 200],
            outputRange: ["0deg", "720deg"]
          })
        },
      ]
    }

    return (
       <View style={{ display:'flex', height:this.state.logoHeight, width:this.state.logoWidth, justifyContent:'center', alignItems:'center'}}>

        <Flower
          //calculateIcon={this.calculateIcon}
          showIcon={this.state.showHomeIcon}
          logoWidth={this.state.logoWidth}
          logoHeight={this.state.logoHeight}
          iconRotate={this.state.iconRotate}
          animate={animateS2}
          inCircle={true}
          color='silver'
          onPress={() => {
            //this.navigate();
            this.iconPress();
            this.setState({isAtomVisible:true});

            //this.props.toolTip(false, null);
          }}
        />
      {/* </View> */}


        <NavModal
          isVisible={this.state.isAtomVisible}
          navigation={this.props.navigation}
          closeModal={() => this.setState({ isAtomVisible: !this.state.isAtomVisible })}
          DIMS={DIMS}
          iconsGrow={this.state.iconsGrow}
          iconsShow={this.state.iconsShow}
          iconsFade={this.state.iconsFade}
          logoGrow={this.state.logoGrow}
          iconsPressRotate={this.state.iconsPressRotate}
          //  isOpening={this.state.isOpening}
        />
      </View>
    );
  }
}

export default withNavigation(FlowerNav);
