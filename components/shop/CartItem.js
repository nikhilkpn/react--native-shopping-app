import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import {Ionicons} from '@expo/vector-icons';

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount}</Text>
                { props.deletable && <TouchableOpacity style={styles.deleteButton}
                    onPress={props.onRemove}
                    >
                    <Ionicons 
                        name={Platform.OS==='android'? 'md-trash':'ios-trash'}
                        color='red'
                        size={23}/>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'

    },
    mainText:{
        fontSize:16,
        color:'#888'
    },
    deleteButton:{
        marginLeft:20
    }
})
