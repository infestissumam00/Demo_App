import React,{Component}from 'react';
import { AppRegistry,View,Text,NetInfo,StyleSheet,Image,TextInput,TouchableOpacity,KeyboardAvoidingView,Picker,ToastAndroid,Slider,Switch,AsyncStorage,renderIf } from 'react-native';
import Base64 from 'base-64';
export default class myapp extends Component{
  constructor(props) {
    super(props);
    this.state = {age: 18,text1: '',  text2: '',arr:['Java','Python','Ruby','JavaScript','Rust'],aToken:'',flag:false};
  }

  login = (navigation) =>
  {
    NetInfo.isConnected.fetch()
    .then(isConnected => {
    if(isConnected)
    {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.text1) == true && this.state.text2 != '')
        {
              const hash = Base64.encode('bayer:bayer#123');
              var formData = new FormData()
              formData.append('grant_type','password')
              formData.append('scope','webclient')
              formData.append('username',this.state.text1)
              formData.append('password',this.state.text2)

              return fetch('http://13.127.76.18:8080/digitrial/oauth/token',
            {
              method: 'POST',
              headers: {
                'Authorization': 'Basic '+hash,
                'Accept': 'application/json',
                'Content-Type':'multipart/formData'
              },
              body: formData,
            }).then((response) => {

              if(response.status === 200) {
                //alert('here')
                //alert('Success')
                return response.json();
              }
              else if(response.status === 400) {
                ToastAndroid.show(
                   'Either Username or Password is incorrect!',
                   ToastAndroid.SHORT,
                   ToastAndroid.BOTTOM
                );
              }
              else{
                  return 'nCon'
              }
            }).then((responseJson) => {
              if(responseJson!= 'nCon'){
              this.setState({aToken: responseJson.access_token , flag:true});
              AsyncStorage.setItem('myAccessToken', this.state.aToken);
              //alert(this.state.aToken);
              navigation.navigate('Movies')
            }
            else{
              ToastAndroid.show(
                 'Server Error',
                 ToastAndroid.SHORT,
                 ToastAndroid.BOTTOM
               );
            }
          })
            .catch((error)=>{
              //alert('error')
            })
        }
        else if(reg.test(this.state.text1) == true && this.state.text2 == ''){
          ToastAndroid.show(
             'Password cannot be empty!',
             ToastAndroid.SHORT,
             ToastAndroid.BOTTOM
          );
        }

        else if(reg.test(this.state.text1) == false && this.state.text2 != ''){
          ToastAndroid.show(
             'Username format is invalid!',
             ToastAndroid.SHORT,
             ToastAndroid.BOTTOM
          );
        }
        else if(reg.test(this.state.text1) == false || this.state.text2 == ''){
          ToastAndroid.show(
             'Username/Password is invalid!',
             ToastAndroid.SHORT,
             ToastAndroid.BOTTOM
          );
        }
        else {
          ToastAndroid.show(
             'Something went wrong!',
             ToastAndroid.SHORT,
             ToastAndroid.BOTTOM
          );
        }
  }
       else
       {
         ToastAndroid.show(
            'No Internet Connection!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
         );
       }
})
  .catch(() =>{
  });

 }
//
//  deleteToken= () => {
//    AsyncStorage.removeItem('myAccessToken')
//    alert("Token deleted")
//    this.setState({flag:false,text1:null,text2:null})
// }

componentWillMount()
{

   AsyncStorage.getItem('myAccessToken')
  .then((value)=>{
  if (value != null){
    //alert("You are already logged in "+value)
    this.setState({flag:true,text1:'yael.dvori@bayer.com',text2:'password'})
    this.props.navigation.navigate('Movies')
  }
  else{
    //alert('not logged in...')
    this.setState({flag:false})
  }})

}

    render(){
      //let {flag} = this.state;
    return(

    <View style={styles.container}>

      <View style={styles.container2}>
      <Image
          source={require("./images/Logo.png")}
          style={styles.logo}
        />
      </View>

     <View style={styles.container1}>

    <KeyboardAvoidingView
     style={styles.container}
     behavior="padding"
      >
      <TextInput
        style={styles.input}
        placeholder='Username'
        placeholderTextColor='rgb(100,100,100)'
        onChangeText={(text1) => this.setState({text1})}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='rgb(100,100,100)'
        onChangeText={(text2) => this.setState({text2})}
        secureTextEntry
      />
      </KeyboardAvoidingView>
      </View>
      <View style={styles.bcontainer}>
      <TouchableOpacity
         style={styles.button}
         onPress={()=>{this.login(this.props.navigation)}}
       >
         <Text style={{fontSize:20}}> Login </Text>
       </TouchableOpacity>


     </View>

 </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    //justifyContent: 'space-around',
    backgroundColor: 'rgb(32,37,56)'
  },
  bcontainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgb(32,37,56)',
    margin:30,
  },

  container1: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(32,37,56)'
  },
  container2: {
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(32,37,56)'
  },

  logo: {
    height: 200,
    width: 200,
    resizeMode: Image.resizeMode.contain
  },
  input: {
    height: 60,
    margin:20,
    width: 300,
    color:'rgb(100,100,100)'

  },
  button: {
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'rgb(0,197,206)',
   height: 50,
   width: 300,
   borderRadius: 15,
   //margin: 40
  }
}
)
