import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const ProductOverviewScreen = () => {
    const products = useSelector(state=> state.products.availableProducts)

    return <FlatList 
        data={products}
        keyExtractor={(item,index)=> item.id}
        renderItem={itemData=><Text>{itemData.item.title}</Text>}
    />
}

ProductOverviewScreen.navigationOptions = {
    headerTitle:'All Products'
}

export default ProductOverviewScreen

const styles = StyleSheet.create({})
