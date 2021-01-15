import React ,{ useEffect,useState }from 'react'
import { StyleSheet, Text, View,FlatList, ActivityIndicator } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order'


const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const orders = useSelector(state=> state.orders.orders)
    useEffect(() => {
        setIsLoading(true)
        dispatch(ordersActions.fetchOrders()).then(()=>{
            setIsLoading(false)
        })
    }, [dispatch])
   
    if (isLoading){
        return <View style={styles.centered}>
          <ActivityIndicator size='large' color='blue'/>
        </View>
      }
    if(orders.length===0){
        return <View style={styles.centered}>
            <Text>No order found</Text>
        </View>
        }
    return (
        <FlatList 
            data={orders}
            keyExtractor={item=>item.id}
            renderItem={itemData=> <OrderItem 
                amount={itemData.item.totalAmount} 
                date={itemData.item.date}
                items={itemData.item.items}/>}
        />
    )
}
OrdersScreen.navigationOptions =navData=> {
    return {
        headerTitle:'Your Orders',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName='md-menu' iconSize={23} onPress={()=>{
                navData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>

    }
}

export default OrdersScreen

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
