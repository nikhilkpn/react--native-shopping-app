import React from 'react'
import { StyleSheet, Image,Text, View, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = ({navigation}) => {
    const productId = navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(item=>item.id===productId))
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button title='Add to Card' onPress={()=>{dispatch(cartActions.addToCart(selectedProduct))}}/>
            </View>
            <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}
ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle:navData.navigation.getParam('productTitle')
    }
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    actions:{
        marginVertical:10,
        textAlign:'center'
    },
    image:{
        height:300,
        width:'100%'
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20
    }
    
})
