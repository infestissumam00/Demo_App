import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Animated,Easing } from 'react-native';
import {StackNavigator} from 'react-navigation'
import Component1 from './Component1';
import Component4 from './Component4';




const Component5 = StackNavigator({

    Home: {
      screen: Component1,

    },

    Movies: {
      screen: Component4,

    },
},{headerMode:'none'});

export default Component5;
