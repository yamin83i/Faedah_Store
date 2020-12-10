import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

class Beranda extends React.Component {
  state = {
    data: [],
    token: '',
    cari: '',
  };

  componentDidMount() {
    this.produk();
  }

  produk = () => {
    const url = 'https://faedah.herokuapp.com/api/produk';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson.data);
        // let data =JSON.parse(resJson)
        if (resJson.data != undefined) {
          this.setState({data: resJson.data});
        } else {
          console.log(resJson);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            backgroundColor: '#af0404f5',
            elevation:3

          }}>
          <TouchableOpacity
            style={{
              margin: 8,
              width: '85%',
              flexDirection: 'row',
              backgroundColor: '#fffffff5',
              borderRadius: 10,
              paddingStart: 10,
            }}
            onPress={() => this.props.navigation.navigate('Search')}>
            <View style={{justifyContent: 'center'}}>
              <Icon name="search" size={18} />
            </View>
            <View
              style={{justifyContent: 'center', width: '85%',}}>
              <Text>Search</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              marginStart: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              color="white"
              name="message-circle"
              size={25}
              onPress={() => this.props.navigation.navigate('Chatting')}
            />
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <Swiper
            style={{}}
            containerStyle={{
              width: '100%',
              height: 400,
              backgroundColor: 'white',
              marginBottom: 10,
            }}
            autoplay={true}>
              <View>
              <Image
                style={{height: 400, width: '100%', resizeMode: "stretch"}}
                source={require('../Image/asbtract-colorful-sales-background_23-2148393356.jpg')}
              />
            </View>
            <View>
              <Image
                style={{height: 400, width: '100%', resizeMode: "stretch"}}
                source={require('../Image/photo_2020-12-05_09-12-23.jpg')}
              />
            </View>
            <View>
            <Image
                style={{height: 400, width: '100%', resizeMode: "stretch"}}
                source={require('../Image/photo_2020-12-05_09-12-51.jpg')}
              />
            </View>
          </Swiper>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.state.data.map((value, index) => {
              return (
                <TouchableOpacity
                  key={value.id}
                  style={{
                    marginStart: "5.5%",
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 9,
                    Width: "40%",
                    marginBottom:20
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Barang', {item: value})
                  }>
                  <Image
                    style={{width: 150, height: 190}}
                    source={{uri: value.image}}
                  />
                  <View style={{maxWidth:150}}>
                    <Text>{value.name_produk}</Text>
                    <Text style={styles.tek}>
                      Rp. {this.toPrice(value.harga)}
                    </Text>
                  </View>
                  <View style={{alignItems: 'flex-end', paddingEnd: 4}}>
                    <Text>stok: {value.stok}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Beranda;

const styles = StyleSheet.create({
  tek: {
    color: '#6d0303',
  },
});
