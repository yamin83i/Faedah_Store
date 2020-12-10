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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Beranda extends React.Component {
  state = {
    data: [],
    token: '',
    cari: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token != null) {
        this.setState({token: token});
        console.log('ada tokenm');
      } else {
        alert("anda belum login")
      }
    });
    
  }

  searc = () => {
      console.log("cari produk ....");
      const {cari} = this.state
    const url = 'https://faedah.herokuapp.com/api/searc';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify( {
          cari:cari
      })
      ,
    })
      .then(respon => respon.json())
      .then(resJson => {
          if (resJson.status == 'Succes') {
              this.setState({data:resJson.data.data})
              ToastAndroid.show(
                "Tertampil",
                 ToastAndroid.SHORT,
                 ToastAndroid.CENTER,
               );
              console.log(this.state.data)
        } else {
          alert('error');
        }
      })
      .catch(error => {
        console.log('error is ' + error);
      });
  };


  render() {
      
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            marginBottom: 10,
            backgroundColor: '#6d0303',
          }}>
          <View
            style={{
              margin: 8,
              width: '80%',
              flexDirection: 'row',
              backgroundColor: '#fffffff5',
              borderRadius: 10,
              paddingStart: 10,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Icon name="search" size={18} />
            </View>
            <View style={{justifyContent: 'center', width: '85%'}}>
              <TextInput
              style={styles.cari}
                placeholder="search"
                value={this.state.cari}
                onChangeText={(teks) => this.setState({cari: teks})}
                autoFocus={true}
                onEndEditing={()=>this.searc()}
              />
            </View>
          </View>
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
              onPress={() => this.props.navigation.navigate('Chatt')}
            />
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
         
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
                  onPress={() =>
                    this.props.navigation.navigate('Barang', {item: value})
                  }>
                  <Image
                    style={{width: 150, height: 190}}
                    source={{uri: value.image}}
                  />
                  <View style={{maxWidth:150}}>
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
  cari:{
    height:50
  }
});

