import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Platform} from 'react-native';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

class Penjualan extends Component {
  constructor() {
    super();
    this.state = {
      modalViible: false,
      token: '',
      name_produk: '',
      desc: '',
      harga: '',
      stok: '',
      image: '',
      data: [],
      data2: '',
      penjuals: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(respon => {
      if (respon != null) {
        console.log(respon);
        this.setState({token: respon});
        this.getdata();
        this.ambilData();
      } else {
        alert("anda belum login")
      }
    });
  }

  ambilData = () => {
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
        this.setState({
          penjuals: resJson.data[0].penjuals[0],
          data2: resJson.data[0],
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getdata = () => {
    const url = 'https://faedah.herokuapp.com/api/finishp';

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
        this.setState({data: resJson.data});
        console.log(this.state.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.penjuals);
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => this.props.navigation.replace('Penjualan')}
          />
          <Text style={{fontSize: 20, color: 'white', marginStart: 10}}>
            Detail Transaksi
          </Text>
        </View>

        <ScrollView style={{flex: 1}}>
          {this.state.data == null ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {this.state.data.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={value.id}
                    style={{
                      marginStart: "7%",
                      backgroundColor: 'white',
                      elevation: 3,
                      borderRadius: 9,
                      Width: "43%",
                      marginBottom:20
                    }}
                    >
                    <Image
                      style={{width: 150, height: 190}}
                      source={{uri: value.produks.image}}
                    />
                    <View style={{maxWidth:150}}>
                      <Text>{value.produks.name_produk}</Text>
                      <Text style={styles.tek}>Terjual {value.qty} stok</Text>
                      <Text>Rp. {value.produks.harga}</Text>
                    </View>
                    
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Penjualan;

const styles = StyleSheet.create({
  barang: {
    marginStart: 13,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 14,
  },
  sen: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 5,
  },
  gambar: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 14,
    width: 160,
    height: 160,
    backgroundColor: '#6d0303',
    justifyContent: 'center',
    alignItems: 'center',
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
  gambara: {
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
