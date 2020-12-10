import React from 'react';
import {View, Text, ScrollView, TouchableOpacity,StyleSheet,Image} from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import AsyncStorage from '@react-native-async-storage/async-storage';

class Chatting extends React.Component {
state={
  data:[],
  token:""
}


  componentDidMount() {
    this.ambldata();
  }

  ambldata = () => {
    AsyncStorage.getItem('token').then(token => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getData());
      } else {
        alert("anda belum login")
      }
    });
  };

  getData = () => {
    const url = 'https://faedah.herokuapp.com/api/chat';

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
        console.log('ini resjon');
        console.log(resJson);
        this.setState({data: resJson.data});
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Icon name="arrow-left" color="white" size={25} onPress={()=>this.props.navigation.replace("Home",{screen: "Akun"})} />
          <Text style={styles.kata}>Chatting Berfaedah</Text>
        </View>
        {this.state.data != null ? (
        <ScrollView style={{flex: 1}}>
        {this.state.data.map((value, index) => {
              return (
                <TouchableOpacity
                  key={value.id}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 9,
                    flexDirection:"row",
                    marginHorizontal:5,
                    marginBottom:5
                  }}
                  onPress={() =>
                    this.props.navigation.replace('Chatt', {item: value})
                  }>
                  <Image
                    style={{width: 50, height: 50,borderRadius:50,}}
                    source={{uri: value.avatar}}
                  />
                  <View>
                    <Text style={{paddingStart:5}}>{value.name}</Text>
                    <Text style={{padding:5}}>Pesan terakhir</Text>
                   
                  </View>
                  
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        ):(
          <View></View>
        )}
      </View>
    );
  }
}
export default Chatting;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#6d0303',
    paddingStart: 10,
    alignItems: 'center',
  },
  kata: {
    fontSize: 20,
    color: 'white',
    marginStart: 15,
  },
})