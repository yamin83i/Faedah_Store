import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export class Bantuan extends Component {
  render() {
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
            Pusat Bantuan
          </Text>
        </View>
        <View>
            <Text>  A. Cara Membeli Barang</Text>
            <Text>      1. Pilih barang yang mau kamu beli</Text>
            <Text>      2. Masukkan jumlah pesanan yang kamu ingin beli</Text>
            <Text>      3. Klik Tambahkan ke keranjang</Text>
            <Text>      4. Klik Checkout</Text>
            <Text>      </Text>
            <Text>  B. Cara Chat Penjual</Text>
            <Text>      1. Pilih barang yang mau kamu beli</Text>
            <Text>      2. klik Icon Chat</Text>
            <Text>      3. Ketik pesan yang mau kamu kirimkan</Text>
            <Text>      </Text>
            <Text>  C. Cara Menjadi Penjual</Text>
            <Text>      1. Klik BukaToko yang ada di Akun</Text>
            <Text>      2. Masukkan nama toko dan no Hp.</Text>
            <Text>      3. Klik Next</Text>
            <Text>      </Text>
            <Text>  D. Cara Menjual Barang</Text>
            <Text>      1. Lakukan step C terlebih dahulu</Text>
            <Text>      2. Klik Jual Barang</Text>
            <Text>      3. Masukkan apa saja yang dibutuhkan</Text>
            <Text>      4. Klik Tambah Barang</Text>
            <Text>      </Text>
            <Text>  E. Cara Mengedit Profile</Text>
            <Text>      1. Klik Edit Profile yang ada di Akun</Text>
            <Text>      2. Klik Edit</Text>
            <Text>      3. Masukkan apa saja yang dibutuhkan</Text>
            <Text>         (Tidak Perlu semua )</Text>
            <Text>      4. Klik Edit</Text>
        </View>
      </View>
    );
  }
}

export default Bantuan;
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',

    backgroundColor: '#6d0303',
    paddingStart: 10,
    alignItems: 'center',
  },
});
