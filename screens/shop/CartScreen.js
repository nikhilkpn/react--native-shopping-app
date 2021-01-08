import React from 'react'
import { Button, StyleSheet, Text, View, ViewBase } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import {removeFromCart} from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/order'


const CartScreen = (props) => {
    const dispatch = useDispatch()
    const cartTotalAmount = useSelector(state=> state.cart.totalAmount)
    const cartItems = useSelector(state=>{
        const transformedCartItems = [];
        for (const key in state.cart.items){
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum,
            })
        }
        return transformedCartItems
    })
    return (
        <View style={styles.screen}>
            <View  style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.summaryAmount}>${cartTotalAmount}</Text>
                </Text>
            <Button 
                title='order now' 
                disabled={cartItems.length===0}
                onPress={()=>{
                    dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))
                }
                }
                />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={(item)=>item.productId}
                renderItem={itemData=> <CartItem 
                    amount={itemData.item.sum}
                    title={itemData.item.productTitle}
                    quantity={itemData.item.quantity}
                    onRemove={()=>{dispatch(removeFromCart(itemData.item.productId))}}

                />}
            />
        </View>
    )
}
CartScreen.navigationOptions = {
    headerTitle:'Your Cart'
}
export default CartScreen

const styles = StyleSheet.create({
    screen:{
        margin: 20,
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white'
        
    },
    summaryText:{
        fontSize:18
    },
    summaryAmount:{
        color:'green'
    },

})
