import React, { Component } from "react";

import {
  Animated,
  TouchableOpacity,
  Platform,
  View,
  Dimensions
} from "react-native";
import Svg, { Polyline, Circle, G, Line, Path } from "react-native-svg";

const height = 200;
const width = height;

const bigR = 93.23 / 200 * height;
const smallR = 73.05 / 200 * height;

const bigStrokeWidth = 9.77 / 200 * height;
const smallStrokeWidth = 6.51 / 200 * height;

const bigCX = height / 2;
const smallCX = 112.28 / 200 * height;

const bigCY = height / 2;
const smallCY = 114.91 / 200 * height;

const strokeColor = "black";
const outlineColor = "rgb(200,200,200)";

export const LargeCircle = props => {
  const rotate1 = props.iconRotate.interpolate({
    inputRange: [0, 50],
    outputRange: ["0deg", "360deg"]
  });
  const rotate2 = props.iconRotate.interpolate({
    inputRange: [50, 100],
    outputRange: ["360deg", "720deg"]
  });
  const iconAnimate = {
    transform: [
      {
        rotate: rotate1
      },
      {
        rotateY: rotate2
      }
    ]
  };

  const renderWidth = props.logoWidth * 0.7;
  const shift = (props.logoWidth - props.logoWidth * 0.7) * 0.5;

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          backgroundColor: "transparent",
          height: props.logoWidth * 0.7,
          width: props.logoWidth * 0.7,
          position: "absolute"
        },
        iconAnimate
      ]}
    >
      <Svg
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          top: 0,
          right: 0,
          zIndex: 0
        }}
        height={renderWidth}
        width={renderWidth}
        viewBox={`0 0 ${height} ${width}`}
      >
        <Circle
          cx={bigCX}
          cy={bigCY}
          r={bigR}
          stroke={strokeColor}
          strokeWidth={bigStrokeWidth}
          fill="transparent"
        />
      </Svg>
    </Animated.View>
  );
};

export const SmallCircle = props => {
  const marginHeight = props.logoHeight;
  const rotate = props.iconRotate.interpolate({
    inputRange: [0, 200],
    outputRange: ["0deg", "720deg"]
  });
  const iconAnimate = {
    transform: [
      {
        rotate: rotate
      }
    ]
  };

  const renderWidth = props.logoWidth * 0.7;
  const shift = (props.logoWidth - props.logoWidth * 0.7) * 0.5;

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          // top: shift,
          // right: shift,
          justifyContent: "center",
          backgroundColor: "transparent",
          height: props.logoWidth * 0.7,
          width: props.logoWidth * 0.7,
          position: "absolute"
        },
        iconAnimate
      ]}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          top: 0,
          right: 0
        }}
        activeOpacity={1}
        onPress={() => props.onPress()}
      >
        <Svg
          height={renderWidth}
          width={renderWidth}
          viewBox={`0 0 ${height} ${width}`}
        >
          <Circle
            cx={smallCX}
            cy={smallCY}
            r={smallR}
            stroke={strokeColor}
            strokeWidth={smallStrokeWidth}
            fill="none"
          />
        </Svg>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const MedCircle = props => {
  const rotate = props.iconRotate.interpolate({
    inputRange: [0, 200],
    outputRange: ["0deg", "720deg"]
  });
  const rotate2 = props.iconRotate.interpolate({
    inputRange: [0, 200],
    outputRange: ["720deg", "0deg"]
  });
  const iconAnimate = {
    transform: [
      {
        rotateY: rotate
      },
      {
        rotateX: rotate2
      }
    ]
    //transform([{ rotateX: '45deg' }, { rotateZ: '0.785398rad' }])
  };

  const renderWidth = props.logoWidth * 0.7;
  const shift = (props.logoWidth - props.logoWidth * 0.7) * 0.5;

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          // top: shift,
          // right: shift,
          justifyContent: "center",
          backgroundColor: "transparent",
          height: props.logoWidth * 0.7,
          width: props.logoWidth * 0.7,
          position: "absolute"
        },
        iconAnimate
      ]}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          top: 0,
          right: 0
        }}
        activeOpacity={1}
        onPress={() => props.onPress()}
      >
        <Svg
          height={renderWidth}
          width={renderWidth}
          viewBox={`0 0 ${height} ${width}`}
        >
          <Path
            fill={strokeColor}
            d="m 138.7636,27.06741 a 57.698101,94.69965 50.648571 0 0 -39.13974,7.65054 57.698101,94.69965 50.648571 0 0 -82.692911,100.18219 57.698101,94.69965 50.648571 0 0 81.016681,34.00046 57.698101,94.69965 50.648571 0 0 82.69294,-100.18216 57.698101,94.69965 50.648571 0 0 -41.87697,-41.65103 z m 0.91591,3.31102 a 49.046045,88.74744 50.192032 0 1 23.89963,8.35406 49.046045,88.74744 50.192032 0 1 -28.25735,92.54596 49.046045,88.74744 50.192032 0 1 -102.317599,27.03145 49.046045,88.74744 50.192032 0 1 28.255576,-92.54591 49.046045,88.74744 50.192032 0 1 78.419743,-35.38556 z"
          />
        </Svg>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const Flower = props => {
  const iconAnimate = props.animate;

  return (
    <Animated.View
      style={[
        {
          flex: 1,

          justifyContent: "center",
          backgroundColor: "transparent",

          position: "absolute"
        },
        iconAnimate
      ]}
    >

        <TouchableOpacity
          style={{
            zIndex: -1,
            height: props.logoWidth,
            width: props.logoWidth,
          }}
          activeOpacity={1}
          onPress={() => props.onPress()}
        >

        <Svg
          style={{
            alignItems: "center",
          }}

          width={props.logoWidth}
          height={props.logoWidth}
          viewBox={`0 0 ${1250} ${1250}`}
        >
          <G>
            {props.inCircle ? (
              <Circle cx={625} cy={625} r={625} fill="black" />
            ) : null}
            <G fill={props.color}>
            <Path

              d="m 1225.2261,594.22153 c -34.3593,-26.1158 -72.7963,-47.8535 -113.4367,-64.4867 32.6657,-29.9657 61.3963,-63.8928 84.4431,-99.7055 l 16.0339,-28.3793 -30.5249,-11.4333 c -41.2194,-12.7891 -84.7727,-20.0696 -128.6513,-21.7999 20.4473,-39.331 35.8409,-81.0383 45.2494,-122.5738 l 5.3603,-32.1517 -32.5938,-0.3038 c -43.1079,2.0802 -86.5254,10.135 -128.34936,23.5164 5.7625,-43.95247 5.96289,-88.40955 0.5979,-130.65798 L 937.3957,74.19971 906.66289,85.06211 C 866.86665,101.76069 828.82236,124.1792 794.09727,151.0582 784.47964,107.78559 769.4626,65.94097 749.97173,28.07544 L 733.41118,0 708.2479,20.71831 C 676.56206,50.02114 648.48052,84.09936 625.04238,121.23403 601.20469,83.86069 572.78218,49.67563 541.51533,20.76006 L 516.35132,0.04175 499.79146,28.11719 c -19.7525,38.3728 -34.4857,80.00034 -43.80943,122.91176 -35.18247,-26.96635 -73.5832,-49.3688 -112.8542,-65.84668 l -30.73213,-10.8623 -5.95893,32.04614 c -5.43701,42.81431 -5.04424,86.97036 0.87099,130.48282 -42.28408,-13.3068 -86.03032,-21.2245 -128.5686,-23.2773 l -32.59443,0.3039 5.36098,32.1517 c 9.53428,42.0919 25.00591,83.4505 45.44649,122.3156 -44.28565,1.9577 -88.10181,9.4798 -128.77647,22.0998 l -30.524949,11.4334 16.033939,28.3792 c 23.3561,36.2925 52.0396,69.8654 84.54057,99.3955 -40.94502,16.9861 -79.54614,39.0407 -113.452097,64.8112 L 0,615.64583 l 24.773193,21.1838 c 87.019627,66.1405 200.127397,104.3428 309.205767,102.0859 106.09829,-6.8429 211.52265,-52.474 291.02099,-123.2697 -81.67207,60.8842 -190.00596,100.5052 -292.2,95.6648 -87.52139,-4.1456 -177.24609,-41.3846 -247.36489,-95.6617 27.76411,-21.4719 58.30522,-39.9601 90.53042,-54.8313 40.80376,30.563 86.02021,54.9915 133.36264,71.1217 102.04004,29.8573 216.71348,23.0355 315.63082,-16.3008 -97.57085,29.2789 -212.92227,29.4582 -307.29776,-10.0427 -35.69297,-14.9393 -69.57671,-36.0973 -100.3707,-61.5179 33.56431,-11.7614 68.3668,-19.5969 103.31318,-22.8636 0.71895,0.5857 1.42583,1.1883 2.14815,1.7691 85.67387,62.9564 195.76513,95.7667 302.17075,92.6342 -92.03228,-5.3009 -189.59365,-37.9785 -263.02012,-95.5703 42.07153,2.0241 84.27085,10.2164 124.80293,23.7104 42.11997,31.0506 89.10596,55.5819 138.19033,71.8279 -34.09966,-14.6831 -67.51191,-33.8635 -98.49428,-56.6911 35.0749,15.1154 68.34126,34.2099 98.49565,56.6763 -7.3e-4,0 -7.3e-4,0.01 -10e-4,0.015 6.4e-4,0 0.002,-0.01 0.003,-0.014 0.005,0 0.0101,0.01 0.0155,0.012 0.003,0.012 0.006,0.023 0.009,0.034 -0.002,-0.011 -0.003,-0.021 -0.005,-0.032 0.004,0 0.007,0.01 0.0114,0.01 0.0101,0.015 0.0202,0.03 0.0303,0.045 -0.007,-0.013 -0.0141,-0.025 -0.0215,-0.038 0.0208,0.015 0.0416,0.03 0.0625,0.045 -0.0235,-0.021 -0.0484,-0.041 -0.0719,-0.062 -0.005,-0.01 -0.0102,-0.019 -0.0155,-0.028 -10e-4,-0.011 -0.003,-0.021 -0.005,-0.032 0.002,-0.01 0.004,-0.021 0.006,-0.031 0.005,-0.01 0.0107,-0.018 0.0168,-0.027 0.008,-0.01 0.0162,-0.013 0.0242,-0.02 0.0101,0 0.0202,-0.01 0.031,-0.011 0.0101,3e-4 0.0209,2e-4 0.0316,5e-4 0.0102,0 0.0202,0.01 0.0296,0.012 79.55688,70.8292 185.08481,116.4906 291.2604,123.2314 107.81613,4.4958 223.30603,-37.0172 308.91873,-102.089 l 24.7738,-21.1838 -24.7739,-21.1838 z m -93.2436,-163.354 c -18.7464,29.6731 -41.1218,57.492 -66.3174,82.488 -34.2301,-10.357 -69.4651,-17.1193 -104.7162,-19.879 25.5137,-24.644 48.3351,-52.9023 67.9753,-83.3913 35.241,3.174 70.1095,10.24 103.0583,20.7823 z m -486.13167,167.0393 c 32.43838,-28.7944 61.28467,-62.1941 85.35098,-98.7037 33.16147,-26.3935 69.66079,-48.3687 108.03325,-63.7874 -22.78848,35.4226 -50.98301,67.8724 -82.93516,96.2273 -39.55146,17.2816 -76.90635,39.6565 -110.44907,66.2638 z m 77.49209,-39.4545 c -30.62793,22.8182 -63.79741,42.0804 -98.33086,56.9617 -0.003,0 -0.007,0 -0.0101,-0.01 0.0154,-0.012 0.0295,-0.024 0.0451,-0.036 29.75356,-22.175 63.05347,-41.5089 98.29585,-56.9187 z m -91.75791,-100.3005 c 8.43735,-41.534 22.27192,-81.8292 41.75615,-118.306 5.31192,41.7834 4.57202,84.7643 -1.67876,127.024 -19.1896,38.6616 -33.42236,79.8126 -42.01504,121.7556 6.34097,-42.9085 6.96914,-87.0358 1.93765,-130.4736 z m 53.42783,11.7432 c 22.13408,-36.1436 48.91621,-69.277 79.70083,-96.8901 -9.29892,41.0805 -24.69458,81.2163 -45.02212,118.7897 -31.25537,29.7665 -58.704,63.5679 -81.12329,100.0424 20.63291,-38.1522 36.31646,-79.4032 46.44458,-121.942 z m 192.294,-45.0731 c 0.5811,-0.9163 1.13593,-1.8542 1.70971,-2.7766 33.39615,-9.0993 68.66201,-13.5724 104.23185,-13.858 -18.1511,30.5844 -39.77472,58.9572 -64.44571,83.9229 -0.92681,0.013 -1.85625,0.01 -2.78243,0.025 -39.97583,2.5782 -79.85483,10.6684 -118.28852,23.5312 30.39121,-26.899 57.35766,-57.4467 79.5751,-90.8449 z m 56.99306,-140.4974 c 34.2012,-9.0704 69.383,-14.3564 103.9515,-15.7191 -7.4668,34.2953 -18.9791,68.0894 -34.1057,100.1953 -35.7085,1.975 -71.13178,7.6717 -105.20049,17.1349 15.54703,-31.8842 27.32696,-66.2435 35.35469,-101.6111 z M 894.67515,148.18701 c 4.71328,34.78081 5.45381,70.47422 2.22011,105.81762 -32.87895,14.0688 -64.21767,31.5373 -92.99536,52.082 3.70449,-35.2786 3.02251,-71.5948 -1.53012,-107.5753 29.03593,-20.22071 60.28862,-37.22085 92.30537,-50.32432 z m -97.80894,201.84172 c 0.23272,-1.0599 0.43316,-2.1309 0.65713,-3.1939 28.26982,-19.9727 59.879,-36.2376 93.20654,-48.6718 -6.59648,34.9481 -17.2122,69.0056 -31.85595,100.9035 -0.86695,0.3296 -1.74195,0.6406 -2.60621,0.9755 -36.68295,16.0954 -71.38989,37.337 -103.10668,62.5693 19.35839,-35.6713 34.25097,-73.5999 43.70517,-112.5826 z m -26.13042,-17.8977 c -0.70146,0.6061 -1.41777,1.1977 -2.11518,1.8079 -28.96602,27.6711 -54.31426,59.5021 -75.48858,94.0605 5.99053,-40.141 7.01284,-80.8757 2.5645,-120.7412 -0.14394,-1.0756 -0.32216,-2.1506 -0.4748,-3.226 19.73369,-28.4371 43.87329,-54.532 70.93799,-77.6149 5.75439,35.0966 7.42773,70.7309 4.57607,105.7137 z M 718.57241,84.13647 c 16.32446,31.07129 29.22891,64.35889 38.27827,98.67681 -26.08471,24.46555 -49.55849,51.59895 -69.57397,80.74725 -8.58525,-34.4178 -21.64717,-68.31058 -38.2312,-100.5641 20.36924,-28.93227 43.92241,-55.59619 69.5269,-78.85996 z m -53.5522,215.24056 c -0.452,0.8095 -0.92207,1.6104 -1.36933,2.4223 -17.75498,35.9094 -30.6877,74.4905 -38.76519,114.2066 -8.09965,-39.769 -21.07143,-78.3968 -38.88632,-114.3365 -0.50308,-0.9617 -1.03843,-1.911 -1.54961,-2.8692 8.81733,-33.4715 22.57661,-66.249 40.1144,-97.1965 17.4106,31.012 31.17065,63.9251 40.45605,97.7733 z m -40.12651,316.1441 c -0.003,-0.01 -0.007,-0.012 -0.0101,-0.018 0.003,0 0.006,0 0.009,-0.01 10e-4,0.01 0.003,0.013 0.005,0.019 -10e-4,0 -0.002,0 -0.003,0.01 z m 0.004,0 c 10e-4,0 0.003,0.01 0.004,0.013 -7.4e-4,8e-4 -7.4e-4,0 -7.4e-4,0 -0.002,0 -0.004,-0.01 -0.006,-0.011 10e-4,0 0.002,0 0.003,0 z m -0.0141,-0.016 c -0.009,-0.017 -0.0195,-0.035 -0.0289,-0.052 -16.6709,-33.152 -29.92847,-69.3026 -38.98384,-106.6846 17.15307,34.1249 30.36289,70.1351 39.02148,106.7284 -0.003,0 -0.006,0.01 -0.009,0.01 z m -13.61474,-23.5726 c -22.72456,-36.9449 -50.60703,-71.1518 -82.38233,-101.1924 -20.23413,-37.2403 -35.5376,-77.0013 -44.05898,-117.4683 30.92783,28.5933 57.98774,61.9942 80.36396,98.3848 10.15103,41.951 25.69873,82.6232 46.07735,120.2759 z m -33.90591,-126.5395 c -6.2771,-41.915 -7.05855,-84.5121 -1.22539,-125.453 19.28305,37.4467 33.28784,78.0888 41.86772,119.9377 -4.80952,42.8923 -4.10937,86.429 2.16162,128.7803 -8.71777,-42.4885 -23.21958,-84.1686 -42.80395,-123.265 z M 531.18403,84.17939 c 25.967,23.61411 49.47784,50.48086 69.71866,79.63408 -16.14356,31.91163 -28.92159,65.43716 -37.76109,99.67316 -19.83862,-29.4057 -43.70459,-56.7871 -70.3206,-81.4234 9.24575,-34.15415 22.25918,-67.26582 38.36303,-97.88384 z m -48.16357,142.53594 c 26.96777,23.1868 51.15513,49.4087 71.45713,78.0398 -0.14795,0.9153 -0.31607,1.8289 -0.45801,2.7447 -4.40259,39.8163 -3.36011,80.494 2.63311,120.5777 -21.21265,-34.6005 -46.61407,-66.4621 -75.64659,-94.1413 -0.80175,-0.7316 -1.629,-1.4406 -2.4374,-2.1661 -3.1624,-34.4687 -1.44331,-69.9753 4.45176,-105.0548 z m -30.07105,123.6375 c 9.48047,38.9208 24.37305,76.7888 43.71392,112.4053 -31.76719,-25.2586 -66.53403,-46.5111 -103.28291,-62.5911 -1.00278,-0.4133 -2.02305,-0.7967 -3.03125,-1.2017 -14.76006,-31.3086 -25.28906,-65.2619 -31.74702,-100.2421 33.27173,12.565 64.96831,28.9333 93.83877,48.8938 0.17427,0.9107 0.32827,1.8267 0.50849,2.7358 z M 355.11025,148.31045 c 32.47808,13.30874 63.75967,30.51406 92.75122,50.98618 -4.25595,35.5086 -4.79672,71.3826 -1.39355,106.5771 -28.70034,-20.8469 -60.49175,-38.4145 -93.92822,-52.4619 -2.99356,-35.2565 -2.08965,-70.82209 2.57055,-105.10138 z m -38.92461,136.67288 c 8.14541,34.8226 19.90655,68.7183 35.14214,100.6262 -34.09966,-9.7736 -69.98227,-15.4084 -106.20654,-17.1728 -14.87173,-32.1063 -26.18691,-65.8361 -33.5313,-99.6422 35.07075,1.3981 70.35078,6.8669 104.5957,16.1888 z m -132.66455,228.2808 c -24.95547,-25.0836 -47.12451,-52.9093 -65.58838,-82.1646 33.43379,-10.6811 68.45621,-17.6086 103.82432,-20.5613 19.56421,29.9366 42.20943,57.7656 67.43931,82.5384 -35.38565,2.4784 -71.03218,9.456 -105.67525,20.1875 z m 150.17139,-20.8911 c -1.08486,-0.045 -2.17373,-0.057 -3.25991,-0.093 -24.57818,-24.3719 -46.08472,-52.6765 -64.11753,-83.3384 35.5625,0.4277 70.94604,4.9677 104.90244,13.8504 0.47485,0.7962 0.93355,1.6042 1.41309,2.397 22.2208,33.331 49.1664,63.8218 79.52324,90.6753 -38.49082,-12.87 -78.42969,-20.9502 -118.46133,-23.4917 z m 158.31006,38.7627 c -31.75108,-28.0738 -59.72974,-60.203 -81.57798,-95.315 38.8419,16.2912 75.69439,38.4225 109.16724,64.9656 23.88608,35.9486 52.40678,68.8496 84.43296,97.2617 -33.98872,-26.9443 -71.88902,-49.5514 -112.02222,-66.9123 z m 59.71426,-2.5485 c 27.78965,26.2002 52.51914,55.5208 73.1709,86.9458 -10e-4,0 -0.003,0.01 -0.005,0.011 -0.0149,-0.013 -0.0303,-0.026 -0.0451,-0.039 -27.00415,-25.451 -51.82647,-54.8874 -73.12114,-86.9175 z m 73.18159,86.9703 c -0.005,0 -0.0101,-0.01 -0.0154,-0.014 0.002,0 0.004,-0.01 0.005,-0.01 0.004,0.01 0.007,0.011 0.0107,0.016 0,0 0,0 -6.8e-4,0.01 z m 0.0115,0.01 c 0,7e-4 0,0 0,0 -0.003,0 -0.006,-0.01 -0.009,-0.01 6.3e-4,0 10e-4,0 10e-4,-0.01 0.003,0 0.005,0.01 0.008,0.012 z m -0.007,-0.078 c 0.001,0 0.003,0 0.004,0 -7.3e-4,0 -7.3e-4,0.01 -10e-4,0.014 -6.4e-4,6e-4 -6.4e-4,0 -6.4e-4,0 -7.3e-4,0 -10e-4,-0.01 -0.002,-0.012 z m 0.005,-0.01 c -0.002,0 -0.003,0 -0.005,0.01 -10e-4,-0.01 -0.002,-0.014 -0.003,-0.021 0.003,0 0.007,0 0.0108,0 -6.8e-4,0.01 -0.001,0.013 -0.002,0.019 z m 0.002,-0.021 c -0.003,0 -0.007,0 -0.0108,0 -0.003,-0.02 -0.006,-0.04 -0.009,-0.06 -4.32656,-36.8542 -4.42011,-75.3587 -0.14458,-113.5831 4.44698,37.9337 4.54385,76.2902 0.1648,113.638 z m 0.0107,0.01 c 0,5e-4 -6.3e-4,0 -10e-4,0 6.4e-4,0 10e-4,-0.01 0.002,-0.012 0.002,-6e-4 0.004,0 0.005,0 -0.002,0 -0.004,0.01 -0.006,0.012 z m 0.008,-0.016 c -0.002,0 -0.005,0 -0.007,0 10e-4,-0.01 0.003,-0.014 0.004,-0.02 0.004,2e-4 0.007,0 0.0114,2e-4 -0.003,0.01 -0.006,0.012 -0.009,0.017 z m -0.003,-0.018 c 0.004,-0.019 0.007,-0.038 0.0114,-0.057 8.53891,-36.1123 21.62026,-72.3276 38.71206,-106.7852 -8.79507,37.1669 -21.82261,73.2434 -38.71138,106.8412 -0.004,10e-5 -0.008,6e-4 -0.0121,8e-4 z m 0.0195,0.011 c -7.3e-4,3e-4 -0.001,6e-4 -0.002,8e-4 0.002,0 0.004,-0.01 0.006,-0.011 0.002,10e-5 0.004,0 0.006,10e-5 -0.003,0 -0.007,0.01 -0.0101,0.01 z m 0.0134,-0.013 c -0.003,2e-4 -0.005,3e-4 -0.007,5e-4 0.003,-0.01 0.007,-0.012 0.0108,-0.018 0.003,0 0.007,0 0.0101,0 -0.005,0 -0.009,0.01 -0.0135,0.013 z m 0.003,-0.018 c 0.0101,-0.016 0.0195,-0.033 0.0295,-0.049 20.37529,-31.014 45.0544,-60.5714 72.90054,-87.1052 -20.97661,31.9176 -45.55742,61.3628 -72.91865,87.1579 -0.004,0 -0.008,0 -0.0114,0 z m 0.0147,0.017 c -6.4e-4,0 -0.002,1e-4 -0.003,1e-4 0.003,0 0.007,-0.01 0.0101,-0.01 10e-4,7e-4 0.003,0 0.005,0 -0.005,0 -0.009,0 -0.0127,0.01 z m 0.009,-0.01 c 0.005,0 0.0108,-0.01 0.0162,-0.013 0.003,0 0.006,0.01 0.009,0.01 -0.006,0 -0.0122,0.01 -0.0182,0.01 -0.002,-7e-4 -0.005,0 -0.007,0 z m 0.0242,0.01 c -6.4e-4,-2e-4 -0.001,-5e-4 -0.002,-6e-4 0.004,0 0.008,0 0.0122,0 10e-4,0 0.003,0 0.004,0 -0.005,2e-4 -0.009,8e-4 -0.0141,10e-4 z m 0.0128,-0.01 c 49.61367,-16.4371 97.09263,-41.3337 139.55899,-72.8802 40.18837,-13.4602 82.00234,-21.6264 123.33403,-22.9912 -74.63374,56.7435 -169.43765,90.4716 -262.88765,95.8757 -0.002,0 -0.003,0 -0.005,0 z m 0.0202,0.015 c -6.4e-4,-5e-4 -10e-4,-9e-4 -10e-4,0 106.45474,3.107 216.6206,-29.7452 302.27363,-92.8188 0.85957,-0.6623 1.70161,-1.3539 2.55645,-2.0244 34.49373,2.8715 69.16313,10.7297 102.68573,22.6271 -34.7729,28.4725 -73.5436,51.7448 -114.68896,67.8095 -92.71225,32.0636 -198.80112,32.6034 -292.82553,4.4079 z m 276.70078,96.0303 c -98.08872,-1.5797 -197.96572,-37.3579 -276.67725,-96.0132 98.97315,39.3304 213.73267,46.1388 315.79356,16.1638 47.36732,-15.0369 92.91472,-39.8178 133.96932,-70.9928 32.0301,15.0357 62.3789,33.601 89.7354,54.777 -74.6075,57.6985 -169.2425,93.897 -262.82103,96.0652 z"
            />
            <Path d="m 1233.6238,640.25064 c -34.3593,26.1158 -72.7963,47.8535 -113.4367,64.4867 32.6657,29.9657 61.3963,63.8928 84.4431,99.7055 l 16.0339,28.3793 -30.5249,11.4333 c -41.2194,12.7891 -84.7727,20.0696 -128.6513,21.7999 20.4473,39.331 35.8409,81.0383 45.2494,122.5738 l 5.3603,32.15166 -32.5938,0.3038 c -43.1079,-2.0802 -86.52544,-10.135 -128.34944,-23.51636 5.7625,43.95246 5.9629,88.40946 0.5979,130.65796 l -5.9589,32.0462 -30.73286,-10.8624 c -39.79624,-16.6985 -77.84053,-39.117 -112.56562,-65.9961 -9.61763,43.2727 -24.63467,85.1173 -44.12554,122.9828 l -16.56055,28.0755 -25.16328,-20.7184 c -31.68584,-29.3028 -59.76738,-63.381 -83.20552,-100.5157 -23.83769,37.3734 -52.2602,71.5584 -83.52705,100.474 l -25.16401,20.7183 -16.55986,-28.0754 c -19.7525,-38.3728 -34.4857,-80.0004 -43.80943,-122.9118 -35.18247,26.9664 -73.5832,49.3688 -112.8542,65.8467 l -30.73213,10.8623 -5.95893,-32.0462 c -5.43701,-42.8143 -5.04424,-86.9703 0.87099,-130.48276 -42.28408,13.30676 -86.03032,21.22446 -128.5686,23.27726 l -32.59443,-0.3039 5.36098,-32.15166 c 9.53428,-42.0919 25.00591,-83.4505 45.44649,-122.3156 -44.28565,-1.9577 -88.10181,-9.4798 -128.776469,-22.0998 l -30.52494,-11.4334 16.03393,-28.3792 c 23.3561,-36.2925 52.039599,-69.8654 84.540569,-99.3955 -40.94502,-16.9861 -79.546139,-39.0407 -113.452089,-64.8112 L 8.3976159,618.82637 33.170811,597.64257 c 87.019619,-66.1405 200.127389,-104.3428 309.205759,-102.0859 106.09829,6.8429 211.52265,52.474 291.02099,123.2697 -81.67207,-60.8842 -190.00596,-100.5052 -292.2,-95.6648 -87.52139,4.1456 -177.24609,41.3846 -247.364889,95.6617 27.764109,21.47187 58.305219,39.96007 90.530419,54.83127 40.80376,-30.563 86.02021,-54.99147 133.36264,-71.12167 102.04004,-29.8573 216.71348,-23.0355 315.63082,16.3008 -97.57085,-29.2789 -212.92227,-29.4582 -307.29776,10.0427 -35.69297,14.93927 -69.57671,36.09727 -100.3707,61.51787 33.56431,11.7614 68.3668,19.5969 103.31318,22.8636 0.71895,-0.5857 1.42583,-1.1883 2.14815,-1.7691 85.67387,-62.9564 195.76513,-95.76667 302.17075,-92.63417 -92.03228,5.3009 -189.59365,37.97847 -263.02012,95.57027 42.07153,-2.0241 84.27085,-10.2164 124.80293,-23.7104 42.11997,-31.0506 89.10596,-55.58187 138.19033,-71.82787 -34.09966,14.6831 -67.51191,33.86347 -98.49428,56.69107 35.0749,-15.1154 68.34126,-34.2099 98.49565,-56.67627 -7.3e-4,0 -7.3e-4,-0.01 -10e-4,-0.015 6.4e-4,0 0.002,0.01 0.003,0.014 0.005,0 0.0101,-0.01 0.0155,-0.012 0.003,-0.012 0.006,-0.023 0.009,-0.034 -0.002,0.011 -0.003,0.021 -0.005,0.032 0.004,0 0.007,-0.01 0.0114,-0.01 0.0101,-0.015 0.0202,-0.03 0.0303,-0.045 -0.007,0.013 -0.0141,0.025 -0.0215,0.038 0.0208,-0.015 0.0416,-0.03 0.0625,-0.045 -0.0235,0.021 -0.0484,0.041 -0.0719,0.062 -0.005,0.01 -0.0102,0.019 -0.0155,0.028 -10e-4,0.011 -0.003,0.021 -0.005,0.032 0.002,0.01 0.004,0.021 0.006,0.031 0.005,0.01 0.0107,0.018 0.0168,0.027 0.008,0.01 0.0162,0.013 0.0242,0.02 0.0101,0 0.0202,0.01 0.031,0.011 0.0101,-3e-4 0.0209,-2e-4 0.0316,-5e-4 0.0102,0 0.0202,-0.01 0.0296,-0.012 79.55688,-70.8292 185.08481,-116.4906 291.26038,-123.2314 107.81624,-4.4958 223.30614,37.0172 308.91884,102.089 l 24.7738,21.1838 -24.7739,21.18377 z m -93.2436,163.354 c -18.7464,-29.6731 -41.1218,-57.492 -66.3174,-82.488 -34.2301,10.357 -69.4651,17.1193 -104.71624,19.879 25.5137,24.644 48.33514,52.9023 67.97534,83.3913 35.241,-3.174 70.1095,-10.24 103.0583,-20.7823 z M 654.24844,636.56537 c 32.43838,28.79437 61.28467,62.19407 85.35098,98.70367 33.16147,26.3935 69.66079,48.3687 108.03325,63.7874 -22.78848,-35.4226 -50.98301,-67.8724 -82.93516,-96.2273 -39.55146,-17.2816 -76.90635,-39.6565 -110.44907,-66.26377 z m 77.49209,39.45447 c -30.62793,-22.8182 -63.79741,-42.08037 -98.33086,-56.96167 -0.003,0 -0.007,0 -0.0101,0.01 0.0154,0.012 0.0295,0.024 0.0451,0.036 29.75356,22.17497 63.05347,41.50887 98.29585,56.91867 z m -91.75791,100.3005 c 8.43735,41.534 22.27192,81.8292 41.75615,118.306 5.31192,-41.7834 4.57202,-84.7643 -1.67876,-127.024 -19.1896,-38.6616 -33.42236,-79.8126 -42.01504,-121.7556 6.34097,42.9085 6.96914,87.0358 1.93765,130.4736 z m 53.42783,-11.7432 c 22.13408,36.1436 48.91621,69.277 79.70083,96.8901 -9.29892,-41.0805 -24.69458,-81.2163 -45.02212,-118.7897 -31.25537,-29.7665 -58.704,-63.5679 -81.12329,-100.0424 20.63291,38.1522 36.31646,79.4032 46.44458,121.942 z m 192.294,45.0731 c 0.5811,0.9163 1.13593,1.8542 1.70971,2.7766 33.39615,9.0993 68.662,13.5724 104.2319,13.858 -18.1511,-30.5844 -39.7748,-58.9572 -64.4458,-83.9229 -0.9268,-0.013 -1.8562,-0.01 -2.78239,-0.025 -39.97583,-2.5782 -79.85483,-10.6684 -118.28852,-23.5312 30.39121,26.899 57.35766,57.4467 79.5751,90.8449 z m 56.99311,140.4974 c 34.2012,9.0704 69.38304,14.3564 103.95154,15.7191 -7.4668,-34.2953 -18.9791,-68.0894 -34.1057,-100.1953 -35.70854,-1.975 -71.13184,-7.6717 -105.20058,-17.1349 15.54703,31.8842 27.32694,66.2435 35.35474,101.6111 z m -39.6248,136.13746 c 4.71328,-34.7808 5.45381,-70.4742 2.22011,-105.81756 -32.87895,-14.0688 -64.21767,-31.5373 -92.99536,-52.082 3.70449,35.2786 3.02251,71.5948 -1.53012,107.57526 29.03593,20.2207 60.28862,37.2208 92.30537,50.3243 z M 805.26382,884.44344 c 0.23272,1.0599 0.43316,2.1309 0.65713,3.1939 28.26982,19.9727 59.879,36.2376 93.20654,48.6718 -6.59648,-34.9481 -17.2122,-69.0056 -31.85595,-100.9035 -0.86695,-0.3296 -1.74195,-0.6406 -2.60621,-0.9755 -36.68295,-16.0954 -71.38989,-37.337 -103.10668,-62.5693 19.35839,35.6713 34.25097,73.5999 43.70517,112.5826 z m -26.13042,17.8977 c -0.70146,-0.6061 -1.41777,-1.1977 -2.11518,-1.8079 -28.96602,-27.6711 -54.31426,-59.5021 -75.48858,-94.0605 5.99053,40.141 7.01284,80.8757 2.5645,120.7412 -0.14394,1.0756 -0.32216,2.1506 -0.4748,3.226 19.73369,28.4371 43.87329,54.532 70.93799,77.61486 5.75439,-35.09656 7.42773,-70.73086 4.57607,-105.71366 z m -52.16338,247.99456 c 16.32446,-31.0713 29.22891,-64.3589 38.27827,-98.6769 -26.08471,-24.4655 -49.55849,-51.5989 -69.57397,-80.74716 -8.58525,34.41776 -21.64717,68.31056 -38.2312,100.56406 20.36924,28.9323 43.92241,55.5962 69.5269,78.86 z m -53.5522,-215.24056 c -0.452,-0.8095 -0.92207,-1.6104 -1.36933,-2.4223 -17.75498,-35.9094 -30.6877,-74.4905 -38.76519,-114.2066 -8.09965,39.769 -21.07143,78.3968 -38.88632,114.3365 -0.50308,0.9617 -1.03843,1.911 -1.54961,2.8692 8.81733,33.4715 22.57661,66.24896 40.1144,97.19646 17.4106,-31.012 31.17065,-63.92506 40.45605,-97.77326 z M 633.29131,618.95107 c -0.003,0.01 -0.007,0.012 -0.0101,0.018 0.003,0 0.006,0 0.009,0.01 10e-4,-0.01 0.003,-0.013 0.005,-0.019 -10e-4,0 -0.002,0 -0.003,-0.01 z m 0.004,0 c 10e-4,0 0.003,-0.01 0.004,-0.013 -7.4e-4,-8e-4 -7.4e-4,0 -7.4e-4,0 -0.002,0 -0.004,0.01 -0.006,0.011 0.001,0 0.002,0 0.003,0 z m -0.0141,0.016 c -0.009,0.017 -0.0195,0.035 -0.0289,0.052 -16.6709,33.15197 -29.92847,69.30257 -38.98384,106.68457 17.15307,-34.1249 30.36289,-70.1351 39.02148,-106.72837 -0.003,0 -0.006,-0.01 -0.009,-0.01 z m -13.61474,23.57257 c -22.72456,36.9449 -50.60703,71.1518 -82.38233,101.1924 -20.23413,37.2403 -35.5376,77.0013 -44.05898,117.4683 30.92783,-28.5933 57.98774,-61.9942 80.36396,-98.3848 10.15103,-41.951 25.69873,-82.6232 46.07735,-120.2759 z m -33.90591,126.5395 c -6.2771,41.915 -7.05855,84.5121 -1.22539,125.453 19.28305,-37.4467 33.28784,-78.0888 41.86772,-119.9377 -4.80952,-42.8923 -4.10937,-86.429 2.16162,-128.7803 -8.71777,42.4885 -23.21958,84.1686 -42.80395,123.265 z m -46.17892,381.21366 c 25.967,-23.6141 49.47784,-50.4809 69.71866,-79.6341 -16.14356,-31.9117 -28.92159,-65.4372 -37.76109,-99.67316 -19.83862,29.40566 -43.70459,56.78706 -70.3206,81.42336 9.24575,34.1541 22.25918,67.2658 38.36303,97.8839 z m -48.16357,-142.536 c 26.96777,-23.18676 51.15513,-49.40866 71.45713,-78.03976 -0.14795,-0.9153 -0.31607,-1.8289 -0.45801,-2.7447 -4.40259,-39.8163 -3.36011,-80.494 2.63311,-120.5777 -21.21265,34.6005 -46.61407,66.4621 -75.64659,94.1413 -0.80175,0.7316 -1.629,1.4406 -2.4374,2.1661 -3.1624,34.4687 -1.44331,69.9753 4.45176,105.05476 z M 461.34702,884.11934 c 9.48047,-38.9208 24.37305,-76.7888 43.71392,-112.4053 -31.76719,25.2586 -66.53403,46.5111 -103.28291,62.5911 -1.00278,0.4133 -2.02305,0.7967 -3.03125,1.2017 -14.76006,31.3086 -25.28906,65.2619 -31.74702,100.2421 33.27173,-12.565 64.96831,-28.9333 93.83877,-48.8938 0.17427,-0.9107 0.32827,-1.8267 0.50849,-2.7358 z m -97.83916,202.04236 c 32.47808,-13.3088 63.75967,-30.5141 92.75122,-50.9862 -4.25595,-35.50856 -4.79672,-71.38256 -1.39355,-106.57706 -28.70034,20.8469 -60.49175,38.4145 -93.92822,52.4619 -2.99356,35.25646 -2.08965,70.82206 2.57055,105.10136 z M 324.58325,949.48884 c 8.14541,-34.8226 19.90655,-68.7183 35.14214,-100.6262 -34.09966,9.7736 -69.98227,15.4084 -106.20654,17.1728 -14.87173,32.1063 -26.18691,65.8361 -33.5313,99.6422 35.07075,-1.3981 70.35078,-6.8669 104.5957,-16.1888 z M 191.9187,721.20804 c -24.95547,25.0836 -47.12451,52.9093 -65.58838,82.1646 33.43379,10.6811 68.45621,17.6086 103.82432,20.5613 19.56421,-29.9366 42.20943,-57.7656 67.43931,-82.5384 -35.38565,-2.4784 -71.03218,-9.456 -105.67525,-20.1875 z m 150.17139,20.8911 c -1.08486,0.045 -2.17373,0.057 -3.25991,0.093 -24.57818,24.3719 -46.08472,52.6765 -64.11753,83.3384 35.5625,-0.4277 70.94604,-4.9677 104.90244,-13.8504 0.47485,-0.7962 0.93355,-1.6042 1.41309,-2.397 22.2208,-33.331 49.1664,-63.8218 79.52324,-90.6753 -38.49082,12.87 -78.42969,20.9502 -118.46133,23.4917 z m 158.31006,-38.7627 c -31.75108,28.0738 -59.72974,60.203 -81.57798,95.315 38.8419,-16.2912 75.69439,-38.4225 109.16724,-64.9656 23.88608,-35.9486 52.40678,-68.8496 84.43296,-97.26167 -33.98872,26.94427 -71.88902,49.55137 -112.02222,66.91227 z m 59.71426,2.5485 c 27.78965,-26.2002 52.51914,-55.5208 73.1709,-86.94577 -10e-4,0 -0.003,-0.01 -0.005,-0.011 -0.0149,0.013 -0.0303,0.026 -0.0451,0.039 -27.00415,25.45097 -51.82647,54.88737 -73.12114,86.91747 z M 633.296,618.91467 c -0.005,0 -0.0101,0.01 -0.0154,0.014 0.002,0 0.004,0.01 0.005,0.01 0.004,-0.01 0.007,-0.011 0.0107,-0.016 0,0 0,0 -6.8e-4,-0.01 z m 0.0115,-0.01 c 0,-7e-4 0,0 0,0 -0.003,0 -0.006,0.01 -0.009,0.01 6.3e-4,0 10e-4,0 10e-4,0.01 0.003,0 0.005,-0.01 0.008,-0.012 z m -0.007,0.078 c 10e-4,0 0.003,0 0.004,0 -7.3e-4,0 -7.3e-4,-0.01 -10e-4,-0.014 -6.4e-4,-6e-4 -6.4e-4,0 -6.4e-4,0 -7.3e-4,0 -10e-4,0.01 -0.002,0.012 z m 0.005,0.01 c -0.002,0 -0.003,0 -0.005,-0.01 -0.001,0.01 -0.002,0.014 -0.003,0.021 0.003,0 0.007,0 0.0108,0 -6.8e-4,-0.01 -10e-4,-0.013 -0.002,-0.019 z m 0.002,0.021 c -0.003,0 -0.007,0 -0.0108,0 -0.003,0.02 -0.006,0.04 -0.009,0.06 -4.32656,36.85417 -4.42011,75.35867 -0.14458,113.58307 4.44698,-37.9337 4.54385,-76.2902 0.1648,-113.63797 z m 0.0107,-0.01 c 0,-5e-4 -6.3e-4,0 -0.001,0 6.4e-4,0 0.001,0.01 0.002,0.012 0.002,6e-4 0.004,0 0.005,0 -0.002,0 -0.004,-0.01 -0.006,-0.012 z m 0.008,0.016 c -0.002,0 -0.005,0 -0.007,0 10e-4,0.01 0.003,0.014 0.004,0.02 0.004,-2e-4 0.007,0 0.0114,-2e-4 -0.003,-0.01 -0.006,-0.012 -0.009,-0.017 z m -0.003,0.018 c 0.004,0.019 0.007,0.038 0.0114,0.057 8.53891,36.11227 21.62026,72.32757 38.71206,106.78517 -8.79507,-37.1669 -21.82261,-73.2434 -38.71138,-106.84117 -0.004,-10e-5 -0.008,-6e-4 -0.0121,-8e-4 z m 0.0195,-0.011 c -7.3e-4,-3e-4 -0.001,-6e-4 -0.002,-8e-4 0.002,0 0.004,0.01 0.006,0.011 0.002,-10e-5 0.004,0 0.006,-10e-5 -0.003,0 -0.007,-0.01 -0.0101,-0.01 z m 0.0134,0.013 c -0.003,-2e-4 -0.005,-3e-4 -0.007,-5e-4 0.003,0.01 0.007,0.012 0.0108,0.018 0.003,0 0.007,0 0.0101,0 -0.005,0 -0.009,-0.01 -0.0135,-0.013 z m 0.003,0.018 c 0.0101,0.016 0.0195,0.033 0.0295,0.049 20.37529,31.01397 45.0544,60.57137 72.90054,87.10517 -20.97661,-31.9176 -45.55742,-61.3628 -72.91865,-87.15787 -0.004,0 -0.008,0 -0.0114,0 z m 0.0147,-0.017 c -6.4e-4,0 -0.002,-10e-5 -0.003,-10e-5 0.003,0 0.007,0.01 0.0101,0.01 10e-4,-7e-4 0.003,0 0.005,0 -0.005,0 -0.009,0 -0.0127,-0.01 z m 0.009,0.01 c 0.005,0 0.0108,0.01 0.0162,0.013 0.003,0 0.006,-0.01 0.009,-0.01 -0.006,0 -0.0122,-0.01 -0.0182,-0.01 -0.002,7e-4 -0.005,0 -0.007,0 z m 0.0242,-0.01 c -6.4e-4,2e-4 -0.001,5e-4 -0.002,6e-4 0.004,0 0.008,0 0.0122,0 10e-4,0 0.003,0 0.004,0 -0.005,-2e-4 -0.009,-8e-4 -0.0141,0 z m 0.0128,0.01 c 49.61367,16.4371 97.09263,41.33367 139.55899,72.88017 40.18837,13.4602 82.00234,21.6264 123.33403,22.9912 -74.63374,-56.7435 -169.43765,-90.47157 -262.88765,-95.87567 -0.002,0 -0.003,0 -0.005,0 z m 0.0202,-0.015 c -6.4e-4,5e-4 -0.001,9e-4 -0.001,0 106.45474,-3.107 216.6206,29.74517 302.27366,92.81877 0.8595,0.6623 1.7016,1.3539 2.5564,2.0244 34.4938,-2.8715 69.16324,-10.7297 102.68584,-22.6271 -34.7729,-28.4725 -73.54364,-51.7448 -114.68904,-67.80947 -92.71226,-32.0636 -198.80113,-32.6034 -292.82554,-4.4079 z m 276.70078,-96.0303 c -98.08872,1.5797 -197.96572,37.3579 -276.67725,96.0132 98.97315,-39.3304 213.73267,-46.1388 315.79353,-16.1638 47.3674,15.0369 92.91484,39.81777 133.96944,70.99277 32.0301,-15.0357 62.3789,-33.601 89.7354,-54.77697 -74.6075,-57.6985 -169.2425,-93.897 -262.82112,-96.0652 z" />
          </G>
        </G>
        </Svg>
      </TouchableOpacity>
    </Animated.View>
  );
};
export const Star = props => {
  const iconAnimate = props.animate;
  const renderHeight = props.logoWidth * 0.6;
  const renderWidth = props.logoWidth * 0.6;

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          //top: shift,
          //right: shift,
          justifyContent: "center",
          backgroundColor: "transparent",
          height: props.logoWidth * 0.6,
          width: props.logoWidth * 0.6,
          position: "absolute"
        },
        iconAnimate
      ]}
    >
      <TouchableOpacity
        style={{ zIndex: -1 }}
        activeOpacity={1}
        onPress={() => props.onPress()}
      >
        <Svg
          style={{
            backgroundColor: "transparent",
            alignItems: "center"
          }}
          width={renderWidth}
          height={renderWidth}
          viewBox={`0 0 ${1164} ${1107}`}
        >
          <G>
            <Path
              fill={props.color}
              d="M940.8,1106.2c-15.6-11.3-31.3-22.5-46.9-33.8C791.5,997.6,689,922.8,586.7,848c-3.2-2.3-5-1.6-7.7,0.3
                  c-116.4,85-232.8,170-349.2,255c-1.5,1.1-3,2-4.6,2.9c-0.3-0.2-0.5-0.4-0.8-0.7c13-40,26-79.9,39.1-119.9
                  c32.3-98.8,64.7-197.6,97.2-296.4c1.3-3.9-0.1-5.5-2.9-7.5c-117-84.5-234-169.1-350.9-253.7c-1.4-1-2.8-2.1-5.2-3.9
                  c2.7,0,4.3,0,5.9,0c144.3,0.3,288.7,0.6,433,1c4.6,0,6.4-1.2,7.9-5.7c44.2-137.6,88.6-275.1,132.9-412.7c0.4-1.2,0.9-2.4,1.7-4.5
                  c0.8,2.2,1.5,3.6,1.9,5c44.4,137.7,88.8,275.4,133.1,413.1c1.2,3.6,2.7,4.7,6.6,4.7c145.2-0.4,290.3-0.7,435.5-1c1,0,2,0,4.4,0
                  c-2.3,1.8-3.7,2.9-5.2,3.9c-117,84.6-233.9,169.2-350.9,253.7c-3.1,2.3-4,4-2.7,8c45,137.1,89.9,274.3,134.7,411.5
                  c0.5,1.4,0.9,2.9,1.3,4.3C941.3,1105.7,941.1,1106,940.8,1106.2z M909.4,507c-3.4,0-5.2,0-7,0c-78.8,0.2-157.6,0.3-236.5,0.6
                  c-4.7,0-6.7-1.1-8.3-5.9c-24.1-75.1-48.4-150.2-72.6-225.2c-0.5-1.6-1.1-3.1-2.2-5.9c-1,2.9-1.5,4.3-2,5.7
                  c-24.3,75.2-48.6,150.4-72.7,225.7c-1.4,4.3-3,5.6-7.5,5.5c-79.2-0.3-158.3-0.4-237.5-0.6c-1.7,0-3.5,0-6.6,0
                  c68.3,49.4,135.4,97.9,202.4,146.4c-25.9,79-51.5,157.5-77.7,237.3c3-2.1,4.7-3.4,6.5-4.7c63.7-46.5,127.5-93,191.1-139.6
                  c3-2.2,5-2.4,8.1-0.1c61.4,45,122.8,89.8,184.3,134.6c4.1,3,8.2,5.9,13.4,9.7c-26.2-79.9-51.9-158.5-77.7-237.2
                  C774.2,604.8,841.2,556.3,909.4,507z"
            />
          </G>
        </Svg>
      </TouchableOpacity>
    </Animated.View>
  );
};