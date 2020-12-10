import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Pembayaran extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={styles.tek}>Pembayaran</Text>
                </View>
                <View style={styles.box}>

                </View>
                <View style={styles.bayar}>
                    <TouchableOpacity>
                        <Text>pilih pembayarang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>
                            Byar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box:{
        marginTop:10,
        width:"100%",
        backgroundColor:"red",
        height:150
    },
    header:{
        width: '100%',
    height: 40,
    flexDirection: 'row',
        justifyContent:"center",
    backgroundColor: '#6d0303',
    paddingStart: 10,
    alignItems: 'center',
    },
    tek:{
        color:"white",
        fontSize:20
    },
    bayar:{
            width:"100%",
            backgroundColor:"yellow",
            height:70,
            flexDirection:"row",
            // justifyContent:"center",
            alignItems:"center"
    }
})