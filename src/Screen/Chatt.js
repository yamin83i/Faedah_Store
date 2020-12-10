import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pusher from 'pusher-js/react-native';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      input: '',
      token: '',
      receiver_id: '',
      message: '',
    };
    this.getoken();
  }

  componentDidMount() {
    this.getoken();
    Pusher.logToConsole = true;

    var pusher = new Pusher('65cc2e5ff5fbd2addc7a', {
      cluster: 'ap1',
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      // alert(JSON.stringify(data))
      console.log(data);
      this.getpesan();
    
    });
  }


  getoken() {
    AsyncStorage.getItem('token').then(respon => {
      if (respon != null) {
        console.log(respon);
        this.setState({token: respon});
        this.getpesan();
      } else {
        alert("anda belum login")
      }
    });
  }

  getpesan = () => {
    console.log('Sedang mengambil pesan...');
    const url = `https://faedah.herokuapp.com/api/pesan/${
      this.props.route.params.item.id
    }`;

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
        console.log('ini id ku ');
        console.log(resJson.data);
        this.setState({data: resJson.data});
      })
      .catch(err => {
        console.log('selesai.');
        console.log(err);
      });
  };

  Send = () => {
    const url = `https://faedah.herokuapp.com/api/send/pesan/${
      this.props.route.params.item.id
    }`;
    const {receiver_id, message} = this.state;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.status == 'succes') {
          console.log('berhasil terkirim');
          this.setState({message: ""})
          this.getpesan();
        } else {
          alert('try again');
        }
      })
      .catch(error => {
        console.log('error is ' + error);
      });
  };

  render() {
    console.log(this.props.route.params.item);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            color="white"
            size={25}
            onPress={() => this.props.navigation.replace('Chatting')}
          />
          <Text style={styles.kata}>{this.props.route.params.item.name}</Text>
        </View>

        <ScrollView style={{flex: 1}} ref={ref => this.scrollView = ref}
    onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
    }}>
          {this.state.data == null ? (
            <View />
          ) : (
            <View>
              {this.state.data.map((value, index) => {
                return (
                  <View
                    key={value.id}
                    style={{
                      marginHorizontal: 15,
                      // backgroundColor: 'white',
                      // elevation: 1,
                      // borderRadius: 1,
                      marginBottom: 10,
                    }}>
                    {value.from == this.props.route.params.item.id ? (
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          padding: 4,
                          backgroundColor: 'white',
                          maxWidth: '60%',
                        }}>
                        <Text>{value.message}</Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          padding: 4,
                          backgroundColor: '#12b3eddb',
                          maxWidth: '60%',
                        }}>
                        <Text>{value.message}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
        <View style={styles.indata}>
          <View style={styles.end}>
            <TextInput
              style={styles.inputtext}
              value={this.state.message}
              onChangeText={teks => this.setState({message: teks})}
              placeholder="Tulis Kegiatan"
            />
            <View>
              <Icon
                color="#0A9EBE"
                name="send"
                size={34}
                onPress={() => this.Send()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#6d0303',
    paddingStart: 10,
    alignItems: 'center',
  },
  indata: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 30,
  },
  inputbox: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    elevation: 5,
  },
  inputtext: {
    height: 39,
    borderColor: 'gray',
    borderWidth: 1,
    width: '85%',
    marginRight: 10,
    borderRadius: 13,
    padding: 7,
  },
  end: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    height: '8%',
    justifyContent: 'center',
  },
  delete: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A90101',
  },
  kata: {
    fontSize: 20,
    color: 'white',
    marginStart: 15,
  },
});
