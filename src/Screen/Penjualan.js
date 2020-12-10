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
import _ from "lodash"

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
      data2: "",
      penjuals: "",
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
    const url = 'https://faedah.herokuapp.com/api/produkp';

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

  toPrice(price){
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g,'.')
  }
 
  render() {
    console.log(this.state.penjuals);
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() =>
              this.props.navigation.replace('Home', {screen: 'Akun'})
            }
          />
          <Text style={{fontSize: 20, color: 'white', marginStart: 10}}>
            Penjualan
          </Text>
        </View>
        <ScrollView style={{flex:1}}>
        <View style={styles.namaa}>
                <View style={styles.gambara}>
                  {!this.state.data2.avatar ? (
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
                    source={{uri: this.state.data2.avatar}}
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
                <View style={{justifyContent:"center",alignItems:"center"}}> 
                  <Text
                    style={{fontSize: 15}}
                    >
                   {this.state.data2.name}
                  </Text>
                  <Text
                    style={{fontSize: 15}}
                    >
                   Nama Toko: {this.state.penjuals.name_toko}
                  </Text>
                  <Text
                    style={{fontSize: 15}}
                    >
                   No. Hp. : {this.state.penjuals.phone_number}
                  </Text>
                
                </View>
                <View>
                  <Text
                    style={{fontSize: 15}}
                    >
                     Alamat: {this.state.data2.alamat}
                  </Text>
                
                </View>
              </View>

              <View style={{marginStart: 15,marginTop:30}}>
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
                    
                  }} onPress={()=>this.props.navigation.replace("TransaksiSeller")}>
                  <Icon name="shopping-bag" size={20} />
                  <Text>Semua Transaksi</Text>
                </TouchableOpacity>
              </View>
        
        <TouchableOpacity
          style={{
            backgroundColor: '#af0e0e',
            margin: 20,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={()=> this.props.navigation.replace("Jualbarang")}>
          <Text>Jual Barang</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          {this.state.data == null ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View style={{flexDirection:"row",flexWrap:"wrap"}}>
              {this.state.data.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={value.id}
                    style={{
                      margin: 15,
                      backgroundColor: 'white',
                      elevation: 3,
                      borderRadius: 9,
                      width: 150,
                    }}
                    onPress={() =>
                      this.props.navigation.replace('Editbarang', {
                        item: value,
                      })
                    }>
                    <Image
                      style={{width: 150, height: 190, resizeMode:"stretch"}}
                      source={{uri: value.image}}
                    />
                    <View>
                      <Text>{value.name_produk}</Text>
                  <Text style={styles.tek}>Rp. {this.toPrice(value.harga)}</Text>
                    </View>
                    <View style={{alignItems: 'flex-end', paddingEnd: 4}}>
                      <Text>stok: {value.stok}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
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
