import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Jual extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      name_toko: '',
      phone_number: '',
      id: '',
      data: [],
      penjual: [],
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token});
        this.getData()
      } else {
        alert("anda belum login")
      }
    });
  }

  getData = () => {
    const url = 'https://faedah.herokuapp.com/api/userp';

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
        
        this.setState({data: resJson.data, penjual: resJson.data[0].penjuals});
      })
      .catch(err => {
        console.log(err);
      });
  };

  toko = () => {
    const {name_toko, phone_number, id} = this.state;
    const url = 'https://faedah.herokuapp.com/api/penjual';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        name_toko: name_toko,
        phone_number: phone_number,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        console.log('in resjson');
        console.log(resJson);
        if (resJson.status == 'succes') {
          this.props.navigation.navigate('Penjualan');
          ToastAndroid.show(
            "Toko berhasil dibuat",
             ToastAndroid.SHORT,
             ToastAndroid.CENTER,
           );
        } else {
          alert('try again');
          console.log('Ulangi');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.penjual == "" ? (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{margin: 20}}>
                <Icon
                  name="arrow-left"
                  size={30}
                  onPress={() => this.props.navigation.navigate('Akun')}
                />
              </View>
              <View style={{marginStart: 20}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Masukkan Info Toko
                </Text>
                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#af0e0e',
                    width: '90%',
                  }}
                  placeholder="Apa nama tokomu?"
                  value={this.state.name_toko}
                  onChangeText={teks => this.setState({name_toko: teks})}
                />
              </View>
              <View style={{marginStart: 20, marginTop: 30}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Masukkan No Hp.
                </Text>
                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#af0e0e',
                    width: '90%',
                  }}
                  placeholder="No Hp."
                  value={this.state.phone_number}
                  onChangeText={teks => this.setState({phone_number: teks})}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.lanjut}
                onPress={() => this.toko()}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          this.props.navigation.replace('Penjualan')
          
        )}
      </View>
    );
  }
}
export default Jual;

const styles = StyleSheet.create({
  lanjut: {
    marginStart: 20,
    backgroundColor: '#af0e0e',
    width: '90%',
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
