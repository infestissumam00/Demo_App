import React,{Component}from 'react';
import { AppRegistry,View,Text,StyleSheet,TouchableOpacity,Image, AsyncStorage,ToastAndroid } from 'react-native';
import Component5 from './Component5';
import Base64 from "base-64"
export default class Component9 extends Component{

  constructor(props) {
      super(props);

      this.state = {

      };
  }

  logout=(navigation) => {
      const hash = Base64.encode('bayer:bayer#123')
      let value = AsyncStorage.getItem('myAccessToken')
      .then((value)=> {

          return fetch('http://13.127.76.18:8080/digitrial/api/user/logout', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${value}`,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          }).then((response) => {
              //alert (JSON.stringify(response.json()));
              if (response.status === 200) {
                ToastAndroid.show(
                   'Logging Out!',
                   ToastAndroid.SHORT,
                   ToastAndroid.BOTTOM
                );
              } else {
                ToastAndroid.show(
                   'Something went wrong!',
                   ToastAndroid.SHORT,
                   ToastAndroid.BOTTOM
                );
                  //alert(JSON.stringify(response))
              }
          }).then(() =>{
              AsyncStorage.removeItem('myAccessToken').then(() =>{
                  //alert('here')
                  navigation.navigate('Home')
                  ToastAndroid.show(
                     'Logged out successfully!',
                     ToastAndroid.SHORT,
                     ToastAndroid.BOTTOM
                  );

              })


          })
  })
  }

  render(){
    return(
      <View style={styles.container}>
         <View style={styles.header}>
           <Text style={{color:'rgb(255,255,255)',fontSize:20}}> Profile </Text>
         </View>

         <View style={styles.container}>
           <Image
               source={require("./images/logout1.png")}
               style={styles.logo}
             />
         </View>
         <View style={styles.container1}>
           <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.logout(this.props.navigation)}}
            >
              <Text style={{fontSize:20,}}> Logout </Text>
            </TouchableOpacity>

         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: 'rgb(0,0,0)',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
   container: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor: 'rgb(32,37,56)'
   },
   logo: {
     height: 200,
     width: 200,
     margin: 80,
     resizeMode: Image.resizeMode.contain
   },
   button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,197,206)',
    height: 50,
    width: 300,
    borderRadius: 15,
    margin: 30
   }
})
