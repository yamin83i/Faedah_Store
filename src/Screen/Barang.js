import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "lodash"

export class Barang extends Component {
  state = {
    token: '',   
    produk_id: this.props.route.params.item.id,
    phone_number: '',
    jumlah_pesan:""
  };

  componentDidMount() {
    this.ambldata();
    // this.getData();
  }

  ambldata = () => {
    AsyncStorage.getItem('token').then(token => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token});
      } else {
        alert("anda belum login")
      }
    });
  };

  cart = () => {
    const {
      jumlah_pesan
    } = this.state;
    const url = `https://faedah.herokuapp.com/api/keranjang/${this.state.produk_id}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        jumlah_pesan: jumlah_pesan,
      }),
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.status=="Succes") {
          this.props.navigation.replace("Home",{screen:"Keranjang"});
        } else {
          alert('try again');
        }
      })
      .catch(error => {
        console.log('error is ' + error);
      });
  };

  toPrice(price){
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g,'.')
  }

  render() {
    console.log("string  ");
    console.log(this.props.route.params.item.penjuals);
   const {image,harga,name_produk,stok,desc,penjuals} = this.props.route.params.item
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={{fontSize: 20, color: 'white', marginStart: 10}}>
            Details Produk
          </Text>
        </View>

        <ScrollView style={{flex: 1}}>
          <Image
            source={{uri: image}}
            style={styles.image}
          />
          <View style={styles.box}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color:"#790b0b"}}>
                Rp. {this.toPrice(harga)}
              </Text>
            
            </View>
            <Text style={{fontSize: 20}}>
              {name_produk}
            </Text>
            <View style={{alignItems: 'flex-end', paddingEnd: 10}}>
              <Text style={styles.tek}>
                stok: {stok}
              </Text>
            </View>
            
          </View>
          
              <View style={{width:"100%", height:50,backgroundColor:"white",marginTop:20,elevation:1,paddingStart:5}}>

              <TextInput 
              keyboardType="numeric"
              placeholder="Masukkan Jumlah Pemesanan"
              value={this.state.jumlah_pesan}
              onChangeText={(teks)=>this.setState({jumlah_pesan:teks})}
              />
              
            </View>
          <View style={styles.desc}>
            <Text style={styles.tek}>Deskripsi Barang: </Text>
            <Text style={{fontSize: 20, marginTop: 10}}>
              {desc}
            </Text>
          </View>
          <View style={styles.sel}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
              Penjual:{' '}
            </Text>
            <TouchableOpacity
              style={styles.toko} onPress={()=>this.props.navigation.replace("TokoSeller",{item: penjuals})}>
              <Image
               source={{uri: penjuals.users[0].avatar}}
                style={styles.penjual}
              />
              <Text style={{marginStart: 10, marginBottom: 20}}>{penjuals.name_toko}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Icon
              name="message-circle"
              size={30}
              onPress={() => this.props.navigation.navigate('Chatt',{item:penjuals.users[0]})}
            />
            
          </View>

          <TouchableOpacity style={styles.keranjan} onPress={() => this.cart()}>
            <Text style={{fontSize: 20, color: 'white', }}>
              Tambahkan ke Keranjang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Barang;

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
    marginEnd: 180,
  },
  image: {width: '100%', height: 300, marginTop: 20, resizeMode: 'contain'},
  box: {
    width: '100%',
    backgroundColor: 'white',
    paddingStart: 10,
    paddingTop: 3,
    elevation: 1,
  },
  tek: {fontSize: 20},
  desc: {
    width: '100%',
    backgroundColor: 'white',
    paddingStart: 10,
    paddingTop: 3,
    elevation: 1,
    marginTop: 20,
  },
  sel: {
    width: '100%',
    backgroundColor: 'white',
    paddingStart: 10,
    paddingTop: 3,
    elevation: 1,
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#afa7a7',
  },
  keranjan: {
    backgroundColor: '#6d0303',
 width:"80%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  penjual:{
    width: 60,
    height: 60,
    backgroundColor: 20,
    borderRadius: 90,
  },
  toko:{flexDirection: 'row', alignItems: 'center',paddingBottom:5}
});
