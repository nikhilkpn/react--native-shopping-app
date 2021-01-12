import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {Ionicons} from '@expo/vector-icons'
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Colors.primary,
    },
    headerTintColor:'white'
}


const ProductNavigator = createStackNavigator({
    ProductOverview:ProductOverviewScreen,
    ProductDetail:ProductDetailScreen,
    Cart:CartScreen,
},{
    navigationOptions:{
        drawerIcon: drawerConfing => <Ionicons 
        name="md-cart"
        size={23}
        color={drawerConfing.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})


const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,

},{
    navigationOptions:{
        drawerIcon: drawerConfing => <Ionicons 
        name="md-list"
        size={23}
        color={drawerConfing.tintColor}
        />
    },
    defaultNavigationOptions:defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct:EditProductScreen,
},{
    navigationOptions:{
        drawerIcon: drawerConfing => <Ionicons 
        name="md-create"
        size={23}
        color={drawerConfing.tintColor}
        />
    },
    defaultNavigationOptions:defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products : ProductNavigator,
    Orders: OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:'orange'
    }
})

export default createAppContainer(ShopNavigator);