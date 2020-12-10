import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';

class Akun extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      image: {},
      user: {},
      avatar: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      alamat: '',
      phone_number: '',
    };
  }

  componentDidMount() {
    this.ambldata();
  }

  ambldata = () => {
    AsyncStorage.getItem('token').then(token => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getData());
      } else {
        console.log("tidak ada token");
      }
    });
  };

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

  
  logout() {
    AsyncStorage.clear();
    this.props.navigation.replace('Home');
  }

  // toko=()=>{
  //   if()
  // }

  render() {
    const {id, name, avatar, email, email_verified_at, phone_number, alamat, } = this.state.user;
    console.log(avatar);
    return (
      <View style={{flex: 1}}>
        {this.state.token == '' ? (
          <View style={{flex: 1}}>
            <Swiper style={{}} containerStyle={{flex: 1}} autoplay={true}>
              <View style={styles.gif}>
                <LottieView
                  source={require('../Assets/23211-receive-order.json')}
                  autoPlay
                  loop
                />
                <Text style={{top: 120}}>Pengiriman Cepat</Text>
              </View>
              <View style={styles.gif}>
                <LottieView
                  source={require('../Assets/6533-wallet-animation-loader.json')}
                  autoPlay
                  loop
                />
                <Text style={{top: 120}}>Belanja Lebih Murah</Text>
              </View>
              <View style={styles.gif}>
                <LottieView
                  source={require('../Assets/20546-i-stay-at-home.json')}
                  autoPlay
                  loop
                />
                <Text style={{top: 120}}>Banyak Buku Favorite</Text>
              </View>
            </Swiper>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 12,
              }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  marginHorizontal: 5,
                  backgroundColor: '#6d0303',
                  width: '45%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}  onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                 
                  style={{fontSize: 20, color: 'white'}}>
                  Masuk
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 50,
                  marginHorizontal: 5,
                  backgroundColor: '#6d0303',
                  width: '45%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }} onPress={() => this.props.navigation.navigate('Register')}>
                <Text
                  
                  style={{fontSize: 20, color: 'white'}}>
                  Daftar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <Text style={styles.kata}>My Account</Text>
            </View>
            <ScrollView style={{flex: 1}}>
              <View style={styles.namaa}>
                <View style={styles.gambar}>
                  {!avatar ? (
                  <Image
                    source={require("../Image/user-hero-blue.png")}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 50,
                      position: 'absolute',
                      // resizeMode:"cover"
                    }}
                  />
                  ):(
                    <Image
                    source={{uri: avatar}}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 50,
                      position: 'absolute',
                      // resizeMode:"cover"
                    }}
                  />
                  )}
                </View>
                <View>
                  <Text
                    style={{fontSize: 15}}
                    >
                    {name}
                  </Text>
                
                </View>
                <View>
                  <Text
                    style={{fontSize: 15}}
                    >
                     alamat: {alamat}
                  </Text>
                
                </View>
              </View>
              <TouchableOpacity style={styles.shop} onPress={()=>this.props.navigation.navigate("Bukatoko")} >
                <Text>Buka Toko </Text>
                <Icon name="arrow-right" />
              </TouchableOpacity>
              <View style={{marginStart: 15}}>
                <Text>Daftar Transaksi</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                

                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                   
                  }} onPress={()=>this.props.navigation.replace("TransaksiBuyer")}>
                  <Icon name="shopping-bag" size={20} />
                  <Text>Semua Transaksi</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.pesan}
                onPress={() => this.props.navigation.navigate('Chatting')}>
                <Text>Chat</Text>
                <Icon name="message-circle" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.help}  onPress={() => this.props.navigation.navigate('Edit')}>
                <Text>Edit Profile</Text>
                <Icon name="user-check" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.help}  onPress={() => this.props.navigation.navigate('Bantuan')} >
                <Text>Pusat Bantuan</Text>
                <Icon name="help-circle" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logout}
                onPress={() => this.logout()}>
                <Text>Log Out</Text>
                <Icon name="log-out" />
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
export default Akun;

const styles = StyleSheet.create({
  gif: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',

    backgroundColor: '#6d0303',
    paddingStart: 10,
    alignItems: 'center',
  },
  kata: {
    fontSize: 20,
    color: 'white',
    marginEnd: 180,
  },
  logout: {
    width: '90%',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    marginStart: 15,
    paddingStart: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  help: {
    width: '90%',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    marginStart: 15,
    paddingStart: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  pesan: {
    width: '90%',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    paddingStart: 10,
    flexDirection: 'row',
    elevation: 5,
    marginTop: 30,
    marginStart: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  shop: {
    width: '90%',
    margin: '5%',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    paddingStart: 10,
    flexDirection: 'row',
    elevation: 5,
    marginVertical: 25,
  },
  namaa: {
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 170,
    marginTop: 20,
    elevation: 5,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  gambar: {
    marginHorizontal: 20,
    marginBottom: 5,
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
