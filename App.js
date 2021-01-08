import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux';
import productReducer from './store/reducers/product'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order'
import ShopNavigator from './navigation/ShopNavigator';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  products:productReducer,
  cart:cartReducer,
  orders:orderReducer
})

const store = createStore(rootReducer,composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
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
