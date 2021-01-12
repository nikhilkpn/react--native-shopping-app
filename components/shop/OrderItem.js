import React ,{useState} from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { shallowEqual } from 'react-redux';
import Card from '../UI/Card';
import CartItem from './CartItem'


const OrderItem = (props) => {
    const [showDetails , setShowDetails] = useState(false)

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>{props.amount.toFixed()}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={showDetails ? 'Hide Details': 'View Details'} 
                onPress={()=>{setShowDetails(prev=> !showDetails)}}
            />

            {showDetails && (<View style={styles.showDetails}>{
                props.items.map(item=><CartItem 
                    key={item.productId}
                    quantity={item.quantity}
                    amount={item.sum}
                    title={item.productTitle}

                />)
                }</View>)}
        </Card>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    orderItem:{
        margin: 20,
        padding:20,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        margin: 10,
    },
    amount:{
        fontSize:16
    },
    date:{
        fontSize:16,
        color:'#888'
    },
    showDetails:{
        width:'100%'
    }

})