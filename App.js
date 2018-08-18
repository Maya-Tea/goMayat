import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigator, createBottomTabNavigator, TabNavigator, TabBarBottom, SafeAreaView } from 'react-navigation'; // Version can be specified in package.json
import About from './src/about';
import Help from './src/help';
import StopWatch from './src/stopWatch';
import Selfie from './src/selfie';
import FlowerAnimation from './src/navigators/flower/flowerAnimation';
import catList from './src/catList';
import SplashScreen from 'react-native-splash-screen';

import FlowerNav from './src/navigators/flower/flowerNav';


class HomeScreen extends React.Component {

  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'silver' }}>
        <FlowerAnimation />
      </View>
    </SafeAreaView>
    );
  }
}


const HomeStack = StackNavigator({
  Home: { screen: HomeScreen,   navigationOptions: {
        header: null,
        tabBarVisible: false
      }},
  Help: { screen: Help,   navigationOptions: {
        header: null,
      }},
      About: { screen: About,   navigationOptions: {
            header: null,
          }},
  StopWatch: { screen: StopWatch,   navigationOptions: {
        header: null,
      }},
   Selfie: { screen: Selfie,   navigationOptions: {
        header: null,
        tabBarVisible: false
      }},
   catList: { screen: catList,  navigationOptions: {
        header: null,
      }}
});


export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack,  navigationOptions: {
         header: null,
         marginTop:100,
       }} ,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
      return <FlowerNav navigation={navigation} />
      },
    }),

    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      style: {backgroundColor: 'black', height: 60, padding:0, margin:0}
    },
    lazy: true,
    labeled: false,
    animationEnabled: false,
    swipeEnabled: false,
  }
);
