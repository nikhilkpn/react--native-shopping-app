import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const fetchOrders = ()=>{
    return async (dispatch,getState) =>{
        const userId = getState().auth.userId
        try {
            const response = await fetch(`https://rn-shopping-1ea6d-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`)
            if (!response.ok){
                throw new Error('Something went wrong')
            }
            const resData = await response.json()
            const loadedOrders = []
            for (const key in resData){
                loadedOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ))
            }
            dispatch({type:SET_ORDER, orders:loadedOrders})
            
        } catch (error) {
            throw Error(error )
        }
    }
   
}

export const addOrder = (cartItems , totalAmount)=>{
    return async (dispatch,getState) =>{
        const token = getState().auth.token
        const userId = getState().auth.userId
        const date = new Date()
        const response = await fetch(`https://rn-shopping-1ea6d-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                cartItems,
                totalAmount,
                date:date.toISOString()
            })
        })
        if (!response.ok){
            throw new Error('Error in fetching data')
        }
        const resData = await response.json()
        dispatch({type: ADD_ORDER, payload:{
            id:resData.name,
            date:resData.date,
            items:cartItems,
            amount:totalAmount
        }})

    }
    

}