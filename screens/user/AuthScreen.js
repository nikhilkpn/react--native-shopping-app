import React, {useReducer,useCallback,useEffect, useState} from 'react'
import {KeyboardAvoidingView,Button,Alert, StyleSheet,ActivityIndicator, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import {LinearGradient} from 'expo-linear-gradient'
import * as authActions from '../../store/actions/auth'
import {useDispatch,useSelector} from 'react-redux'

const INPUT_FORM = 'INPUT_FORM'


const formReducer = (state,action)=>{
    if (action.type === INPUT_FORM) {
        const updatedValues = {
          ...state.inputValues,
          [action.input]: action.value
        };
        const updatedValidities = {
          ...state.inputValidities,
          [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
          updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        
        return {
          formIsValid: updatedFormIsValid,
          inputValidities: updatedValidities,
          inputValues: updatedValues
        };
      }
      return state;
}

const AuthScreen = (props) => {
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(error){
            Alert.alert('An error occured',error,[
                {text:'Ok'}
            ])
        }
    },[error])

    const authHandler = async () =>{
        let action;
        if(isSignUp){
            action = authActions.signup(formState.inputValues.email,formState.inputValues.password)
        }else{
            action = authActions.login(formState.inputValues.email,formState.inputValues.password)
        }
        setError(null);
        setIsLoading(true)
        try {
            await dispatch(action)
            props.navigation.navigate('Shop')
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }
    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues: {
            email: '',
            password:''
        },
        inputValidities: {
            email: false,
            password:false
          },
          formIsValid: false
        });
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            
            dispatchFormState({
            type: INPUT_FORM,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
            });
        },
        [dispatchFormState]
        );
        
    return (
        <KeyboardAvoidingView
            behavior='height'
            keyboardVerticalOffset={5}
            style={styles.screen}
        >
            <LinearGradient colors={['green','blue']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                    id='email'
                    label='E-mail'
                    keyboardType='email-address'
                    email
                    required
                    errorText='Please enter valid email'
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    autoCapitalize='none'
                    />
                    <Input
                    id='password'
                    label='Password'
                    keyboardType='default'
                    secureTextEntry
                    required
                    minLength={3}
                    errorText='Please enter valid password'
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    autoCapitalize='none'
                    />
                    <View style={styles.buttonContainer}>
                        {isLoading ?
                         <ActivityIndicator size='large' color='blue'/>:
                            <Button 
                                title={isSignUp?'Sign up':'Login'}
                                color='green'
                                onPress={authHandler}
                                />
                            }
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title={`Switch to ${isSignUp?'Login':'Sign Up'}`}
                            onPress={()=>{setIsSignUp(prev=>!prev)}}
                        />
                    </View>
                </ScrollView>
            </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}
AuthScreen.navigationOptions ={
    headerTitle:'Authentication'
}

export default AuthScreen

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    gradient:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    authContainer:{
        width:'90%',
        maxWidth:400,
        maxHeight:400,
        padding:20
    },
    buttonContainer:{
        marginTop:10
    }
})
