import React,{useEffect} from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import * as authActions from '../store/actions/auth'
import {useDispatch} from 'react-redux';

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const tryLogin = async ()=>{
            const userData  = await AsyncStorage.getItem('userData')
            if (!userData){
                props.navigation.navigate('Auth')
                return;
            }
            const formatedData = JSON.parse(userData)
            const {token, expiry,userId} = formatedData;
            const expiryDate = new Date(expiry);
            if (!token || !userId || expiryDate< new Date()){
                props.navigation.navigate('Auth')
                return
            }
            const expirationTime = expiryDate.getTime()- new Date().getTime();
            props.navigation.navigate('Shop')
            dispatch(authActions.authenticate(userId,token,expirationTime))
        }    
        tryLogin();
    },[dispatch])
    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color='blue'/>
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
