import React,{Component}from 'react';
import { AppRegistry,View,Text, } from 'react-native';

import Component5 from './app/Components/Component5';
export default class myapp extends Component{
  render(){
    return(
      <View>
        <Component5/>

      </View>
    );
  }
}


AppRegistry.registerComponent('myapp', () => Component5);
