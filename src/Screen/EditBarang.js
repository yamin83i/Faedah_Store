import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export class EditBarang extends Component {
  state = {
    token: '',
    name_produk: '',
    desc: '',
    harga: '',
    stok: '',
    image: {uri: '', fileName: '', type: ''},
    data: [],
    modalViible: false,
    produk_id: this.props.route.params.item.id,
  };

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

  hapus = () => {
    const url = `https://faedah.herokuapp.com/api/produk/delete/${
      this.props.route.params.item.id
    }`;

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
            'Terhapus',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.replace('Penjualan');
        } else {
          alert('try again');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  update = () => {
    console.log('mulai updat');
    const {name_produk, desc, harga, stok, image} = this.state;
    const url = `https://faedah.herokuapp.com/api/produk/${
      this.props.route.params.item.id
    }`;
    const data = {
      name_produk: name_produk,
      desc: desc,
      harga: harga,
      stok: stok,

      _method: 'PUT',
    };

    fetch(url, {
      method: 'POST',
      body: this.createFromData(image, data),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(res => res.text())
      .then(resJson => {
        console.log(resJson);

        this.setState({data: resJson.data});
        this.props.navigation.replace('Penjualan');
        ToastAndroid.show(
          'berhasil terupdate',
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
    if (photo.fileName) {
      data.append('image', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });
    }
    Object.keys(body).forEach(key => {
      if (body[key]) {
        data.append(key, body[key]);
      }
    });
    console.log('ini data ');
    console.log(data._parts);
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

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    console.log(this.toPrice(10000000000));
    console.log(this.props.route.params.item.gambar);
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
            <View style={styles.sen}>
              <Text>Nama Barang</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan Nama Barang"
                value={this.state.name_produk}
                onChangeText={teks => this.setState({name_produk: teks})}
              />
            </View>

            <View style={styles.sen}>
              <Text> masukkan harga</Text>
              <TextInput
                style={styles.input}
                placeholder="Rp. "
                value={this.state.harga}
                onChangeText={teks => this.setState({harga: teks})}
              />
            </View>
            <View style={styles.sen}>
              <Text>Stok</Text>
              <TextInput
                style={styles.input}
                placeholder="stok "
                value={this.state.stok}
                onChangeText={teks => this.setState({stok: teks})}
              />
            </View>

            <View style={styles.sen}>
              <Text> deskripsi barang</Text>
              <TextInput
                style={styles.input}
                placeholder="deskripsi"
                value={this.state.desc}
                onChangeText={teks => this.setState({desc: teks})}
              />
            </View>
            <TouchableOpacity
              style={styles.gambar}
              onPress={() => this.handleChoosePhoto()}>
              {this.state.image.uri !== '' ? (
                <Image
                  source={this.state.image}
                  style={{
                    width: 160,
                    height: 160,
                    position: 'absolute',
                    resizeMode: 'stretch',
                  }}
                />
              ) : (
                <Icon name="image" size={30} color="white" />
              )}
            </TouchableOpacity>

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
              onPress={() => this.update()}>
              <Text style={{color: 'white'}}>EDIT</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => this.props.navigation.replace('Penjualan')}
          />
          <Text style={{fontSize: 20, color: 'white', marginStart: 10}}>
            Details Produk
          </Text>
        </View>

        <ScrollView style={{flex: 1}}>
          <Image
            source={{uri: this.props.route.params.item.image}}
            style={styles.image}
          />
          <View style={styles.box}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Rp. {this.toPrice(this.props.route.params.item.harga)}
              </Text>
            </View>
            <Text style={{fontSize: 20}}>
              {this.props.route.params.item.name_produk}
            </Text>
            <View style={{alignItems: 'flex-end', paddingEnd: 10}}>
              <Text style={styles.tek}>
                stok: {this.props.route.params.item.stok}
              </Text>
            </View>
          </View>
          <View style={styles.desc}>
            <Text style={styles.tek}>Deskripsi Barang: </Text>
            <Text style={{fontSize: 20, marginTop: 10}}>
              {this.props.route.params.item.desc}
            </Text>
          </View>
        </ScrollView>
        <View style={{marginBottom: 5}}>
          <Button
            title="Edit Barang"
            color="#6d0303"
            onPress={() => this.setState({modalViible: true})}
          />
        </View>
        <Button title="Hapus" color="#6d0303" onPress={() => this.hapus()} />
      </View>
    );
  }
}

export default EditBarang;

const styles = StyleSheet.create({
  barang: {
    marginStart: 13,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 14,
  },
  sen: {backgroundColor: 'white', marginHorizontal: 20, marginTop: 20},
  input: {borderWidth: 1, borderColor: 'gray', marginTop: 5},
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
  image: {width: '100%', height: 300, marginTop: 20, resizeMode: 'contain'},
  box: {
    width: '100%',
    backgroundColor: 'white',
    paddingStart: 10,
    paddingTop: 3,
    elevation: 2,
  },
  tek: {fontSize: 20},
  desc: {
    width: '100%',
    backgroundColor: 'white',
    paddingStart: 10,
    paddingTop: 3,
    elevation: 2,
    marginVertical: 20,
  },
});
