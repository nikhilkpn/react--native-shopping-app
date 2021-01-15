import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerItems, DrawerNavigatorItems} from 'react-navigation-drawer';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {Ionicons} from '@expo/vector-icons'
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen'
import { SafeAreaView, View , Button} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth'

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
    },
    contentComponent:props=>{
        const dispatch = useDispatch()
        return <View style={{flex:1}}>
            <SafeAreaView forceInset={{top:'always', horizontal:'never'}} >
                <DrawerNavigatorItems {...props}/>
                <Button title='logout' onPress={()=>{
                    dispatch(authActions.logout())
                    // props.navigation.navigate('Auth')
                }}/>
            </SafeAreaView>
        </View>
    }
})
const AuthNavigator = createStackNavigator({
    Auth:AuthScreen,
},
{
    defaultNavigationOptions:defaultNavOptions
})
const MainNavigator = createSwitchNavigator({
    StartUp:StartupScreen,
    Auth:AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);