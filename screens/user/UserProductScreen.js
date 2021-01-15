import React from 'react'
import { StyleSheet, Alert, View , FlatList, Button, Text} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import {HeaderButtons ,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'
import {Entypo} from '@expo/vector-icons'
import * as productActions from '../../store/actions/product'

const UserProductScreen = ({navigation}) => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch  = useDispatch();
    const deleteHandler =(id) =>{
        Alert.alert('Are you sure?','You want to delete the item?',
        [{text:'No', style:'default'},
        {
            text:'yes', style:'destructive',
            onPress:()=>{dispatch(productActions.deleteProduct(id))}
        }]
        )}
    if(userProducts.length===0){
        return <View style={styles.message}>
            <Text>No products found</Text>
        </View>
    }
    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item=>item.id}
            renderItem={itemData=>(
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=>{
                        navigation.navigate('EditProduct',{productId:itemData.item.id})
                    }}
                >
                <Button
                    title="Edit"
                    onPress={() => {
                    navigation.navigate('EditProduct',{productId:itemData.item.id})
                    }}
                />
                <Button
                    title="Delete"
                    onPress={deleteHandler.bind(this,itemData.item.id)}
                />
                </ProductItem>
            )}
            />
        )
}
UserProductScreen.navigationOptions = navData =>{
    return {
        headerTitle:'Your Products',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName='md-menu' iconSize={23} onPress={()=>{
                navData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>,
        headerRight: ()=> <HeaderButtons icon HeaderButtonComponent={HeaderButton}>
                <Item title='Add' iconName='md-create' iconSize={23} onPress={()=>{
                    navData.navigation.navigate('EditProduct')
                }}/>
            </HeaderButtons>
    }
}

export default UserProductScreen

const styles = StyleSheet.create({
    message:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
