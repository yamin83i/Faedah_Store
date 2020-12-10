import React, {Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    alamat: '',
    phone_number: '',
  };

  register = () => {
    const {
      name,
      email,
      password,
      password_confirmation,
      alamat,
      phone_number,
    } = this.state;
    const url = 'https://faedah.herokuapp.com/api/register';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        alamat: alamat,
        phone_number: phone_number,
      }),
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.token) {
          this.props.navigation.replace('Login');
          ToastAndroid.show(
            'Register Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('try again');
        }
      })
      .catch(error => {
        console.log('error is ' + error);
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          
      
          <View
            style={{
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
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Icon size={50} name="book-open" color="#ef8181" />
            </View>
            <View
              style={{
                width: '90%',
                marginBottom: 5,
                marginHorizontal: '5%',
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
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
              style={{
                width: '90%',
                marginBottom: 5,
                marginHorizontal: '5%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
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
              style={{
                width: '90%',
                marginBottom: 5,
                marginHorizontal: '5%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
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
              style={{
                width: '90%',
                marginBottom: 5,
                marginHorizontal: '5%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
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
              style={{
                width: '90%',
                marginBottom: 5,
                marginHorizontal: '5%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
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
            {/* <View
            style={{width: '90%', marginBottom: 15, marginHorizontal: '5%',alignItems:"center",flexDirection:"row"}}>
            <Icon size={20}
              name="phone"
              />
            <TextInput
              style={{borderBottomWidth: 1, borderColor: 'gray',width: '85%'}}
              placeholder="phone number"
              value={this.state.phone_number}
              onChangeText={(teks) => this.setState({phone_number: teks})}
            />
          </View> */}
            <TouchableOpacity
              style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ef8181',
                marginHorizontal: '5%',
                height: 35,
                marginTop: 17,
              }}
              onPress={() => this.register()}>
              <Text style={{fontSize: 20, color: 'white'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
