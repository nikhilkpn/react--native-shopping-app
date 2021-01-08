import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'



const OrderItem = (props) => {
    console.log(props);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>{props.amount.toFixed()}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title='View Details'/>
        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    orderItem:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        padding:10,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    amount:{
        fontSize:16
    },
    date:{
        fontSize:16,
        color:'#888'
    },

})