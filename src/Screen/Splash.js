import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';

class Splash extends React.Component {
  render() {
    setTimeout(() => {
      this.props.navigation.replace('Home');
    }, 3000);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#6d0303',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
          }}>
          <LottieView
            style={{width: 200, height: 200, paddingStart: 65}}
            source={require('../Assets/14944-book-button.json')}
            autoPlay
            loop
          />
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              paddingEnd: 120,
              fontFamily: 'serif',
              fontStyle: 'italic',
            }}>
            Faedah.Store
          </Text>
        </View>
      </View>
    );
  }
}
export default Splash;

// class akun extends React.Component{
//   render(){
//     return(
//       <View style={{flex:1}}>
//       <View style={styles.header}>
//         <Text style={styles.kata}>My Account</Text>
//         <Text style={{color:"white",paddingStart:161}}>edit profile</Text>
//         </View>
//       </View>
//     )
//   }
// }
// export default akun

// const styles = StyleSheet.create({
//   header:{width: '100%',
//   height: 40,
//   flexDirection: 'row',
//   marginBottom: 10,
//   backgroundColor: '#6d0303',
//   paddingStart:10,
//   alignItems:"center"
//   },
//   kata:{
//     fontSize:20,
//     color:"white",
//   }
// })
