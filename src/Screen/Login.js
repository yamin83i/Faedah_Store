import React from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import AsynStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    token:""
  };
  login = () => {
    const {email, password} = this.state;
    const url = 'https://faedah.herokuapp.com/api/login';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.token) {
          AsynStorage.setItem('token', resJson.token)
          
          
          .catch((err) =>
            console.log(err),
          );
          this.props.navigation.replace('Home'),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        } else if (resJson.error) {
          alert('Try Again');
        } else {
          console.log("kaa");
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  register = () => {
    this.props.navigation.navigate('Register');
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
            style={styles.login}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Icon size={50} name="book-open" color="#ef8181" />
            </View>

            <View
              style={styles.mail}>
              <Icon name="mail" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(teks) => this.setState({email: teks})}
              />
            </View>
            <View
              style={styles.lock}>
              <Icon name="lock" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(teks) => this.setState({password: teks})}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.signin} onPress={() => this.login()}>
              <Text style={{fontSize: 20, color: 'white'}}>Sign In</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                top: 38,
              }}>
              <Text>New Users? </Text>
              <Text style={{color: '#ef8181'}} onPress={this.register}>
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  signin: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef8181',
    marginHorizontal: '5%',
    marginBottom: 15,
    height: 35,
  },
  login:{
    flex: 1,
    marginHorizontal: '10%',
    width: '80%',
    height: 320,
    backgroundColor: 'white',
    position: 'absolute',
    top: 120,
    borderRadius: 9,
    marginBottom: 5,
    marginTop: 25,
    elevation: 9,
  },
  mail:{
    width: '90%',
    marginBottom: 10,
    marginHorizontal: '5%',
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lock:{
    width: '90%',
    marginBottom: 20,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
