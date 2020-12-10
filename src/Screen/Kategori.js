import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class Kategori extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#6d0303'}}>
        
        <ScrollView style={{flex: 1,marginTop:10,marginBottom:10}}>
          <TouchableOpacity style={styles.judul}>
            <TouchableOpacity style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
            <Image
              style={{height: 100}}
              resizeMode="contain"
              source={require('../Image/adven.jpg')}
            /></TouchableOpacity>
            <TouchableOpacity style={styles.touch}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Adventure
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              height: 135,
              backgroundColor: '#f8f7f7',
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: '5%',
              borderRadius: 40,
            }}>
              <TouchableOpacity style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
            <Image
              style={{height: 100}}
              resizeMode="contain"
              source={require('../Image/lovebok.jpg')}
            /></TouchableOpacity>
            <TouchableOpacity style={styles.touch}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Biographic
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.judul}>
          <TouchableOpacity style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
            <Image
              style={{height: 100}}
              resizeMode="contain"
              source={require('../Image/edu.jpg')}
            /></TouchableOpacity>
            <TouchableOpacity style={styles.touch}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Children
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.judul}>
          <TouchableOpacity style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
            <Image
              style={{height: 100}}
              resizeMode="contain"
              source={require('../Image/come.jpg')}
            /></TouchableOpacity>
            <TouchableOpacity style={styles.touch}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Cook
              </Text>
            </TouchableOpacity>
          </View>
         
        </ScrollView>
      </View>
    );
  }
}
export default Kategori;

const styles = StyleSheet.create({
  touch: {
    backgroundColor: '#693535',
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  judul: {
    width: '90%',
    height: 135,
    backgroundColor: 'white',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
    borderRadius: 40,
  },
});
