import React,{Component}from 'react';
import { Modal,AppRegistry,AsyncStorage,View,Text,StyleSheet,ToastAndroid,TouchableOpacity,FlatList,ActivityIndicator,RefreshControl,NetInfo,connectionInfo,Image} from 'react-native';
//import Modal from 'react-native-modal';
const contData = [
  {title:"Star Wars", desc:"Luke and Han Solo must free Princess Leia, the leader of the Rebel Alliance, who is held captive by Darth, and destroy a space station that has the potential to wipe away the entire planet.",img:require("./images/SW.jpg")},
  {title:"Back to the Future", desc:"Marty travels back in time using a time machine invented by an eccentric scientist. He meets his parents there and accidentally attracts his mother's attention. He must make his parents fall in love.",img:require("./images/BTF.jpg")},
  {title:"The Matrix", desc:"Thomas, a computer programmer, is led to fight an underground war against powerful computers who now rule the world with a system called 'The Matrix'.",img:require("./images/TM.jpg")},
  {title:"Inception", desc:"Cobb steals information from his targets by entering their dreams. He is wanted for his alleged role in his wife's murder and his only chance at redemption is to perform the impossible, an inception.",img:require("./images/IN.jpg")},
  {title:"Interstellar", desc:"In the future, Earth is slowly becoming uninhabitable. Ex-NASA pilot Cooper, along with a team of researchers, is sent on a planet exploration mission to report which planet can sustain life.",img:require("./images/IT.jpg")}
];
export default class Component7 extends Component{

  constructor(){
    super();
    this.state={
     data:[],
     isLoading: true,
     refreshing: false,
     isConnected: false,
     isModalVisible: false,
     modTitle: '',
     modDesc: '',
     modImage: null
  }
}
_toggleModal(titl){
    this.setState({isModalVisible:true});
    //this.setState({modTitle: titl});
    contData.forEach((element)=>{
      if(element.title==titl){
        //alert("Yeah")
        this.setState({
          modDesc:element.desc,
          modImage:element.img
        })

      }});

  }

closeModel = () =>{
      this.setState({isModalVisible:false});}

_onRefresh() {

  this.setState({refreshing:true,isLoading:true});
  this.getMovies().then(() => {
    this.setState({refreshing:false,isLoading:false});
});

}


componentWillMount() {
  NetInfo.isConnected.fetch().then(isConnected => {
  if(isConnected) {
    ToastAndroid.show(
       'Online!',
       ToastAndroid.SHORT,
       ToastAndroid.BOTTOM
    );
     this.getMovies();
   }
   else {
     ToastAndroid.show(
        'Offline!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
     );
      AsyncStorage.getItem('myMovieList')
       .then((value)=>{
       if (value != null){
       //alert("You are already logged in "+value)
       this.setState({data: JSON.parse(value),isLoading: false})
       }
       else
       {
         alert("No Internet")
       }
   });
 }
});
 this.changeConnection();
}

showMessage = (isConnected)=>{
  //alert("You are "+ (isConnected?"Online":"offline"))
  if(this.isConnected){
    this.getMovies()
  }
}

changeConnection(isConnected) {
   NetInfo.isConnected.addEventListener('connectionChange',this.showMessage)
}

getMovies() {

   return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => {
        if(response.status === 200)
        {
        return response.json() }
      })
    .then((responseJson) => {
      this.setState({data:responseJson.movies,isLoading:false});
      AsyncStorage.setItem('myMovieList', JSON.stringify(this.state.data));
    })

  .catch((error) => {
      // if (error.status){
      //   alert('Unable to fetch movies');
      // }
      // else{alert("You are offline")}
    });
}


  render(){
    const {isLoading} = this.state;
    return(
       <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{color:'rgb(255,255,255)',fontSize:20}}> Movies </Text>
          </View>
          <View style={styles.container}>
          <Modal visible={this.state.isModalVisible}
                 transparent={true}
                 animationType={'slide'}
                 onRequestClose={()=> {this.closeModel()}}
                 >
             <View style={{ position:'absolute',backgroundColor:'rgba(32,37,56,0.7)',
                            alignItems:'center',justifyContent:'center',top:200,bottom:0,left:0,right:0, }}>

               <Text style={{fontSize:20,color:'rgb(100,100,100)',alignItems:'center',justifyContent:'space-around',textAlign:'center'}}>{this.state.modDesc}</Text>
               <Image
                   source={this.state.modImage}
                   style={{height:200,width:200,resizeMode:Image.resizeMode.contain,margin:10}}
                 />

              <View style={{margin:0}}>
               <TouchableOpacity onPress={()=>{this.closeModel()}}>
                 <Text style={{fontSize:25,color:'rgb(24,70,122)',bottom:5,position:'absolute'}}>HIDE</Text>
               </TouchableOpacity>
               </View>
             </View>
         </Modal>
             {isLoading && (<ActivityIndicator size="small" color="#00ff00"/>)}
             <FlatList
                 refreshControl={
                 <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={()=>{this._onRefresh()}}
                />
               }
               data={this.state.data}
               keyExtractor={(item,index) => index}
               renderItem={({item,index}) =>
               <View style={{height:90,justifyContent:'center',borderBottomColor:'black',borderBottomWidth:1,
                           elevation:3,margin:7,flex:1,backgroundColor:'rgb(0,0,0)',}}>
                 <TouchableOpacity onPress={()=>{this._toggleModal(item.title)}}>
                 <Text style={{fontSize:20,color:'rgb(24, 70, 122)'}}>Title: {item.title}</Text>
                 <Text style={{fontSize:20,color:'rgb(10, 46, 98)'}}>Year: {item.releaseYear}</Text>
                 </TouchableOpacity>

               </View>
              }/>
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
     height: 100,
     width: 100,
     resizeMode: Image.resizeMode.contain
   },
   button: {
     alignItems: 'center',
     justifyContent: 'space-around',
     backgroundColor: 'rgb(0,197,206)',
     height: 50,
     width: 200,
     borderRadius: 15,
     margin: 20
   }
}
)
