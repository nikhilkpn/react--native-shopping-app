import AsyncStorage from '@react-native-community/async-storage';

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = (userId, token,expiryTime)=>{
    return dispatch=>{
        dispatch(setLogoutTimer(expiryTime))
        dispatch({type:AUTHENTICATE, userId,token})
    }
}

export const signup = (email,password)=>{
    return async dispath =>{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[web api key]',{
            method:'POST',
            headers:"application/json",
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true
            }
            )
        })
        const data = await response.json()
        if (!response.ok){
            const errorRes = await response.json()
            const err = errorRes.error.message;
            let message = 'Something went wrong'
            if(err==='EMAIL_EXISTS'){
                message = 'Email already exists'
            }
            throw Error(message)
        }
        dispath(authenticate(data.idToken,data.localId,parseInt(data.expiresIn) *1000))
        const expiration = new Date(new Date().getTime() + parseInt(data.expiresIn) *1000)
        saveLocalStorage(data.idToken,data.localId, expiration)
        
    }
}
export const login = (email,password)=>{
    return async dispath =>{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[web api key]',{
            method:'POST',
            headers:"application/json",
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true
            }
            )
        })
        const data = await response.json()
        if (!response.ok){
            const errorRes = await response.json()
            const err = errorRes.error.message;
            let message = 'Something went wrong'
            if(err==='EMAIL_NOT_FOUND'){
                message = 'Email not found'
            }else if(err==='INVALID_PASSWORD'){
                message= 'Password Incorrect'
            }
            throw Error(message)
        }
        dispath(authenticate(data.idToken,data.localId,parseInt(data.expiresIn) *1000))
        const expiration =new Date(new Date().getTime() + parseInt(data.expiresIn) *1000)
        saveLocalStorage(data.idToken,data.localId, expiration)

    }
}

export const logout = ()=>{
    clearLogoutTimer();
    AsyncStorage.removeItem('userData')
    return {type:LOGOUT}
}
let timer;
const clearLogoutTimer = ()=>{
    if (timer){
        clearTimeout(timer)
    }
}
const setLogoutTimer = expirationTime =>{
    return dispatch =>{
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime);
    }
}


const saveLocalStorage = async (token,userId,expiration) => {
    await AsyncStorage.setItem('userData',JSON.stringify({
        token,
        userId,
        expiry: expiration.toISOString()
    }))
}