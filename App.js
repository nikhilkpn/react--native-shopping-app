import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import productReducer from './store/reducers/product'
import cartReducer from './store/reducers/cart'
import authReducer from './store/reducers/auth'
import orderReducer from './store/reducers/order'
import ShopNavigator from './navigation/ShopNavigator';
import {composeWithDevTools} from 'redux-devtools-extension';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  products:productReducer,
  cart:cartReducer,
  orders:orderReducer,
  auth:authReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
