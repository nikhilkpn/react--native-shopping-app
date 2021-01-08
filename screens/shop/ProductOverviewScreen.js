import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import {  HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'

const ProductOverviewScreen = (props) => {
    const products = useSelector(state=> state.products.availableProducts)
    const dispatch = useDispatch();
    return <FlatList 
        data={products}
        keyExtractor={(item,index)=> item.id}
        renderItem={itemData=><ProductItem 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={()=>{
                props.navigation.navigate('ProductDetail',{
                    productId:itemData.item.id,
                    productTitle:itemData.item.title
                    })

            }}
            onAddToCart={()=>{dispatch(cartActions.addToCart(itemData.item))}}
            />}
    />
}

ProductOverviewScreen.navigationOptions = navData=> {
    return {
        headerTitle:'All Products',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName='md-menu' iconSize={23} onPress={()=>{
                navData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>,
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='cart' iconName='md-cart' iconSize={23} onPress={()=>{
                navData.navigation.navigate('Cart')
            }}/>
        </HeaderButtons>

    }
}

export default ProductOverviewScreen

const styles = StyleSheet.create({})
