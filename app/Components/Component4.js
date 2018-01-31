import React,{Component}from 'react';
import { AppRegistry,View,Text,StyleSheet,Image,TextInput,TouchableOpacity,KeyboardAvoidingView,Picker,ToastAndroid,Slider,Switch } from 'react-native';
import Component9 from './Component9'

import Component7 from './Component7'
import {TabNavigator} from 'react-navigation'


const Component4 = TabNavigator({


      Movies: {
      screen: Component7,
      navigationOptions: {
      tabBarIcon: () => (
      <Image
        style={{height:25,width:25}}
        source={require('./images/video-camera.png')}
        />
      )}
    },

      Profile: {
      screen: Component9,
      navigationOptions: {
      tabBarIcon: () => (
      <Image
        style={{height:25,width:25}}
        source={require('./images/user.png')}
        />
      )}
    }
},
    {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarIcon: {focused:'true',tintColor:'white'},
    tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'black',
    activeBackgroundColor: 'rgb(180,180,180)',
    inactiveBackgroundColor: 'rgb(220,220,220)',
    indicatorStyle: {
      backgroundColor:'rgb(200,200,200)'
    },
    showLabel: false,
    showIcon: true,
    style: {
    backgroundColor: 'rgb(0,0,0)',
    //inactiveBackgroundColor: 'white',
    //activeBackgroundColor:'rgb(100,100,100)'}
}}});

export default Component4;
