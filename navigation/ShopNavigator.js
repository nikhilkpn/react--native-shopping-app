import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator} from 'react-navigation-tabs';
// import {createDrawerNavigator} from 'react-navigation-drawer';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ProductNavigator = createStackNavigator({
    ProductOverview:ProductOverviewScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primary,
        },
        headerTintColor:'white'
    }
})


export default createAppContainer(ProductNavigator);