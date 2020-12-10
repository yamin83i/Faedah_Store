import React, {Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  StyleSheet,
  Modal,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    alamat: '',
    phone_number: '',
    avatar:{uri:"",fileName:"",type:""},
    user:{},
    modalViible:false,
    
  };
  
  componentDidMount() {
    AsyncStorage.getItem('token').then(respon => {
      if (respon) {
        console.log(respon);
        this.setState({token: respon});
        this.getData()
      }else{
        alert("anda belum login")
      }
    });
  }

  getData = () => {
    const url = 'https://faedah.herokuapp.com/api/useraja';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(res => res.json())
      .then(resJson => {
        console.log('ini resjon');
        console.log(resJson);
        this.setState({user: resJson.user});
      })
      .catch(err => {
        console.log(err);
      });
  };

  update = () => {
    console.log("mulai updat");
    const {
        name,
        email,
        avatar,
        phone_number,
        password,
        password_confirmation,
        alamat

      } = this.state;
      const url = "https://faedah.herokuapp.com/api/user/update";
      const data = {
        name: name,
        email: email,
        phone_number: phone_number,
        password: password,
        password_confirmation: password_confirmation,
        alamat: alamat,
        _method: 'PUT',
      };

    fetch(url, {
      method: 'POST',
      body: this.createFromData(avatar, data),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
      
        this.setState({data: resJson.data});
        this.props.navigation.replace("Home",{screen:"Akun"})
        ToastAndroid.show(
         "berhasil terupdate",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
       
        
      })
      .catch(error => {
        console.log(error);
      });
  };
  createFromData = (photo, body) => {
    const data = new FormData();
    if(photo.fileName){
    data.append('avatar', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    })}
    Object.keys(body).forEach(key => {
      if (body[key]){
      data.append(key, body[key]);
      }
    })
    console.log("ini data ");
    console.log(data._parts);
    return data;
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.uri) {
        this.setState({avatar: response});
      }
    });
  };

  render() {
    const {id, name, avatar, email, email_verified_at, phone_number, alamat, status} = this.state.user;
    return (
      <View style={{flex: 1}}>
         <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalViible}
          onRequestClose={() => this.setState({modalViible: false})}>

          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
              <View style={{justifyContent:"center",alignItems:"center"}}>
               <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 20}}>Edit Profile</Text>
            </View>
            <TouchableOpacity
              style={styles.gambar}
              onPress={() => this.handleChoosePhoto()}>
              {this.state.avatar.uri !== '' ? (
               <Image
               source={this.state.avatar}
               style={{width: 160, height: 190, position: 'absolute',resizeMode:"stretch"}}
             /> 
              ) : (
                <Icon name="image" size={30} color="white" />
              )}
            </TouchableOpacity>
           <View
              style={styles.edit}>
              <Icon size={20} name="user" />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '85%',
                }}
                placeholder="username"
                value={this.state.name}
                onChangeText={teks => this.setState({name: teks})}
              />
            </View>
            <View
              style={styles.edit}>
              <Icon size={20} name="mail" />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '85%',
                }}
                placeholder="email"
                value={this.state.email}
                onChangeText={teks => this.setState({email: teks})}
              />
            </View>
            <View
              style={styles.edit}>
              <Icon size={20} name="lock" />
              <TextInput
                style={{
                  borderBottomWidth: 0.5,
                  borderColor: 'gray',
                  width: '85%',
                }}
                placeholder="Password"
                value={this.state.password}
                onChangeText={teks => this.setState({password: teks})}
                secureTextEntry={true}
              />
            </View>
            <View
              style={styles.edit}>
              <Icon size={20} name="lock" />
              <TextInput
                style={{
                  borderBottomWidth: 0.5,
                  borderColor: 'gray',
                  width: '85%',
                }}
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChangeText={teks =>
                  this.setState({password_confirmation: teks})
                }
                secureTextEntry={true}
              />
            </View>
            <View
              style={styles.edit}>
              <Icon size={20} name="home" />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '85%',
                }}
                placeholder="Alamat"
                value={this.state.alamat}
                onChangeText={teks => this.setState({alamat: teks})}
              />
            </View>
            <View
              style={styles.edit}>
              <Icon size={20} name="phone" />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '85%',
                }}
                placeholder="phone number"
                value={this.state.phone_number}
                onChangeText={teks => this.setState({phone_number: teks})}
              />
            </View>
           
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.update()}
              >
              <Text style={{fontSize: 20, color: 'white'}}>Edit</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
          
        </Modal>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 20}}>Profile</Text>
            </View>
            <View
              style={styles.gambar2}
              >
              {avatar !== null ? (
               <Image
               source={{uri: avatar}}
               style={{width: 160, height: 160, position: 'absolute',borderRadius:50}}
             /> 
              ) : (
                <Icon name="image" size={30} color="white" />
              )}
            </View>
            <View
              style={styles.nama}>
              <Icon size={20} name="user"  />
              <Text style={styles.teks}>{name}</Text>
            </View>
            <View
              style={styles.nama}>
              <Icon size={20} name="mail" />
              <Text style={styles.teks}>{email}</Text>
            </View>
            
           
            <View
              style={styles.nama}>
              <Icon size={20} name="home" />
              <Text style={styles.teks}>{alamat}</Text>
              
            </View>
            <View
              style={styles.nama}>
              <Icon size={20} name="phone" />
              <Text style={styles.teks}>{phone_number}</Text>
              
            </View>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({modalViible: true})}>
              <Text style={{fontSize: 20, color: 'white'}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
bak:{
  flex: 1,
  marginHorizontal: '10%',
  width: '80%',
  height: 490,
  backgroundColor: '#ffffffc2',
  position: 'absolute',
  top: 50,
  borderRadius: 9,
  marginBottom: 5,
  marginTop: 20,
  elevation: 3,
},
nama:{
  width:"90%",
  height:40,flexDirection:"row",
  borderWidth:1,
  borderColor:"gray",
  alignItems:"center",
  padding:5,marginTop:20
},
edit:{
  width: '90%',
  marginBottom: 5,
  marginHorizontal: '5%',
  flexDirection: 'row',
  alignItems: 'center',
},
button:{
  width: '90%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ef8181',
  marginHorizontal: '5%',
  height: 35,
  marginTop: 17,
  marginBottom:10
},
gambar: {
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 14,
  width: 160,
  height: 190,
  backgroundColor: '#6d0303',
  justifyContent: 'center',
  alignItems: 'center',
  
},
gambar2: {
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 14,
  width: 160,
  height: 160,
  backgroundColor: '#6d0303',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:50
},
teks:{paddingStart:5}
})