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
      data2: "",
      penjuals: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(respon => {
      if (respon != null) {
        console.log(respon);
        this.setState({token: respon});
        this.ambilData();
      } else {
        alert("anda belum login")
      }
    });
  }

  ambilData = () => {
    const url = `https://faedah.herokuapp.com/api/toko/${this.props.route.params.item.id}`;

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
        console.log("ini res");
        console.log(resJson);
        this.setState({
          data2:resJson.data[0].penjuals.users[0],
          penjuals: resJson.data[0].penjuals,
          data: resJson.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  

 
  render() {
    console.log(this.state.penjuals);
    console.log();
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() =>
              this.props.navigation.goback()
            }
          />
          <Text style={{fontSize: 20, color: 'white', marginStart: 10}}>
        {  this.state.penjuals.name_toko}
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
                      this.props.navigation.navigate('Barang', {
                        item: value,
                      })
                    }>
                    <Image
                      style={{width: 150, height: 190, resizeMode:"stretch"}}
                      source={{uri: value.image}}
                    />
                    <View>
                      <Text>{value.name_produk}</Text>
                      <Text style={styles.tek}>Rp. {value.harga}</Text>
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
