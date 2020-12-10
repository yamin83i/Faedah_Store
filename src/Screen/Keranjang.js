import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "lodash"

class Tas extends React.Component {
  state = {
    data: [],
    data2: [],
    token: '',
    id: '',
    total: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token});
        this.ranjang();
        this.ranjang2();
      } else {
        alert("anda belum login")
      }
    });
  }

  ranjang = () => {
    console.log('Sedang mengambil keranjang...');
    const url = 'https://faedah.herokuapp.com/api/keranjangaja';

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
        console.log(resJson.data);
        this.setState({data: resJson.data});
      })
      .catch(err => {
        console.log('selesai.');
        console.log(err);
      });
  };

  ranjang2 = () => {
    console.log('Sedang mengambil keranjang...');
    const url = 'https://faedah.herokuapp.com/api/keranjang';

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
        this.setState({data2: resJson.data, total: resJson.data[0].subtotal});

        console.log('selesai.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  hapus(id) {
    console.log(id);
    const url = `https://faedah.herokuapp.com/api/keranjang/delete/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.status == 'Succes') {
          ToastAndroid.show(
            "Terhapus",
             ToastAndroid.SHORT,
             ToastAndroid.CENTER,
           );
          this.componentDidMount();
        } else {
          console.log('erere');
        }
      })
      .catch(err => {
        console.log('ini errro  ');
        console.log(err);
      });
  }
  Checkout = () => {
    const url = 'https://faedah.herokuapp.com/api/keranjangaja/chekout';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        ToastAndroid.show(
          "Selamat Barang Anda Sudah Sampai Ke Tempat Anda",
           ToastAndroid.SHORT,
           ToastAndroid.CENTER,
         );
          this.componentDidMount();
      })
      .catch(error => {
        console.log('error is ' + error);
      });
  };

  toPrice(price){
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g,'.')
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
         
          <Text style={styles.kata}>My Keranjang</Text>
        </View>
        {this.state.data == null || this.state.token == "" ? (
          <View style={{justifyContent:"flex-start",flex:1}}>
            <Text>Tidak ada Pemesanan...</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <ScrollView>
            {this.state.data.map((value, index) => {
              return (
                <View key={index} style={{flex: 1}}>
                  
                    <View style={styles.barang}>
                      <View style={styles.gambar}>
                        <Image
                          style={{width: 150, height: 190,resizeMode:"stretch"}}
                          source={{uri: value.produks[0].image}}
                        />
                      </View>
                      <View style={{marginStart: 20, marginTop: 5,maxWidth:"50%"}}>
                        <Text>{value.produks[0].name_produk}</Text>
                        <Text>Harga: Rp. {this.toPrice(value.produks[0].harga)}</Text>
                        <Text>Jumlah Pesanan: {value.jumlah_pesan}</Text>

                        <View
                          style={{
                            paddingTop: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 90,
                              height: 35,
                              backgroundColor: '#6d0303',
                            }}
                            onPress={() => this.hapus(value.id)}>
                            <Icon name="trash-2" color="white" size={25} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    </View>
                 
              );
            })}
            </ScrollView>

           
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: 'white',
                    elevation: 3,
                    height: 50,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, paddingStart: 10, fontWeight: '500'}}>
                    Sub Total :
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingStart: 10,
                      }}>
                      Rp.  {this.toPrice(this.state.total)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 35,
                    backgroundColor: '#6d0303',
                  }}
                  onPress={() => this.Checkout()}>
                  <Text style={{color: 'white'}}>CheckOut</Text>
                </TouchableOpacity>
              </View>
            
          </View>
        )}

        <View />
      </View>
    );
  }
}
export default Tas;

const styles = StyleSheet.create({
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
    marginStart: 15,
  },
  barang: {
    marginHorizontal: 15,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 9,
    flexDirection: 'row',
    marginTop:9
 
  },
  gambar: {
    paddingVertical: 10,
    paddingStart: 10,
  },
});
