import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator }from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Feather"

import Beranda from "../Screen/Beranda"
import Register from "../Screen/Register"
import Login from "../Screen/Login"
import Splash from "../Screen/Splash"
import Jualbarang from "../Screen/Jualbarang"
import Keranjang from "../Screen/Keranjang"
import Akun from "../Screen/Akun"
import Chatting from "../Screen/Chatting"
import Chatt from "../Screen/Chatt"
import Barang from"../Screen/Barang"
import Bukatoko from "../Screen/Bukatoko"
import Penjualan from "../Screen/Penjualan"
import Pembayaran from "../Screen/Pembayaran"
import Edit from "../Screen/Editprofile"
import Editbarang from "../Screen/EditBarang"
import TransaksiSeller from "../Screen/TransaksiSeller"
import TransaksiBuyer from "../Screen/TransaksiBuyer"
import Search from "../Screen/Search"
import TokoSeller from "../Screen/TokoSeller"
import Bantuan from "../Screen/Bantuan"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Beranda') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Keranjang') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } 
          else if (route.name === 'Akun') {
            iconName = focused ? 'user' : 'user';
          }
          return <Icon name={iconName} size={15} color={color} />;
        },
      })}
      tabBarOptions={{
        // inactiveBackgroundColor:"#6d0303",
        // activeBackgroundColor:"#6d0303",
        keyboardHidesTabBar:true,
        activeTintColor: '#ad0000f5',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Beranda" component={Beranda} />
      <Tab.Screen name="Keranjang" component={Keranjang} />

      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Chatting" component={Chatting} />
        <Stack.Screen name="Chatt" component={Chatt} />
        <Stack.Screen name="Barang" component={Barang} />
        <Stack.Screen name="Bukatoko" component={Bukatoko} />
        <Stack.Screen name="Penjualan" component={Penjualan} />
        <Stack.Screen name="Pembayaran" component={Pembayaran} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Editbarang" component={Editbarang} />
        <Stack.Screen name="Jualbarang" component={Jualbarang} />
        <Stack.Screen name="TransaksiSeller" component={TransaksiSeller} />
        <Stack.Screen name="TransaksiBuyer" component={TransaksiBuyer} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="TokoSeller" component={TokoSeller} />
        <Stack.Screen name="Bantuan" component={Bantuan} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;