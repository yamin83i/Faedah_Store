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
  ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

export class Jualbarang extends Component {
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
      data2: [],
      penjuals: [],
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then(respon => {
      if (respon != null) {
        console.log(respon);
        this.setState({token: respon});
      } else {
        alert("anda belum login")
      }
    });
  }

  adddata = () => {
    const {name_produk, desc, harga, stok, image, modalViible} = this.state;
    const url = 'https://faedah.herokuapp.com/api/produk';
    const data = {
      name_produk: name_produk,
      desc: desc,
      harga: harga,
      stok: stok,
    };

    fetch(url, {
      method: 'POST',
      body: this.createFromData(image, data),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.state.token,
      },
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.status == 'succes') {
          
          this.setState({data: resJson.data});
          this.props.navigation.replace('Penjualan');
          ToastAndroid.show(
            "Barang Bertambah",
             ToastAndroid.SHORT,
             ToastAndroid.CENTER,
           );
        } else {
          console.log(error);
          alert('try again');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  createFromData = (photo, body) => {
    const data = new FormData();
    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    return data;
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.uri) {
        this.setState({image: response});
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() =>
              this.props.navigation.replace("Penjualan")
            }
          />
          <Text style={{fontSize: 20, color: 'white', marginStart: 10}}>
            Jual Barang
          </Text>
        </View>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
            <View style={{justifyContent:"center",alignItems:"center"}}>
             <TouchableOpacity
            style={styles.gambar}
            onPress={() => this.handleChoosePhoto()}>
              
            {this.state.image !== '' ? (
              
              <Image
                source={this.state.image}
                style={{width: 160, height: 190, position: 'absolute',resizeMode:"stretch"}}
              />
              
            ) : (
              
              <Icon name="image" size={30} color="white" />
             
            )}
            
          </TouchableOpacity>
          <View style={styles.sen}>
            
            <TextInput
              style={styles.input}
              placeholder="Masukkan Nama Barang"
              value={this.state.name_produk}
              onChangeText={teks => this.setState({name_produk: teks})}
            />
          </View>

          <View style={styles.sen}>
            
            <TextInput
              style={styles.input}
              placeholder="masukkan harga. "
              value={this.state.harga}
              onChangeText={teks => this.setState({harga: teks})}
            />
          </View>
          <View style={styles.sen}>
           
            <TextInput
              style={styles.input}
              placeholder="stok "
              value={this.state.stok}
              onChangeText={teks => this.setState({stok: teks})}
            />
          </View>

          <View style={styles.sen}>
            
            <TextInput
              style={styles.input}
              placeholder="deskripsi"
              value={this.state.desc}
              onChangeText={teks => this.setState({desc: teks})}
            />
          </View>
         

          <TouchableOpacity
            style={{
              ...styles.sen,
              width: '90%',
              height: 40,
              backgroundColor: '#6d0303',
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.adddata()}>
            <Text style={{color: 'white'}}>Tambah Barang</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Jualbarang;

const styles = StyleSheet.create({
  barang: {
    marginStart: 13,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 14,
  },
  sen: {
    width: '90%',
  marginBottom: 5,
  marginHorizontal: '5%',
  flexDirection: 'row',
  alignItems: 'center',
  },
  input: {
    borderWidth: 1,
                  borderColor: 'gray',
                  width: '100%',
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
});
