import { add } from "react-native-reanimated"
import CartItem from "../../models/cart-item"
import { ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart"
import { ADD_ORDER } from "../actions/order"
import { DELETE_PRODUCT } from "../actions/product"

const initialState = {
    items:{},
    totalAmount:0
}

export default (state=initialState,action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.payload
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title
            let updatedOrNewCart;
            if (state.items[addedProduct.id]){
                updatedOrNewCart = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            }else{
                updatedOrNewCart = new CartItem(1,prodPrice,prodTitle,prodPrice)
            }
            return {
                ...state,
                items:{...state.items,[addedProduct.id]:updatedOrNewCart},
                totalAmount:state.totalAmount+prodPrice
            }
        case REMOVE_FROM_CART:
            let updatedCartItems;
            const seletedItem = state.items[action.payload]
            const currnetQuantity = seletedItem.quantity
            if (currnetQuantity>1){
                const updatedCartItem = new CartItem(
                    seletedItem.quantity -1,
                    seletedItem.productPrice,
                    seletedItem.productTitle,
                    seletedItem.sum -seletedItem.productPrice
                )
                updatedCartItems = {...state.items,[action.payload]:updatedCartItem}
            }else{
                updatedCartItems = {...state.items}
                delete updatedCartItems[action.payload]
            }
            return { 
                ...state,
                items:updatedCartItems,
                totalAmount:state.totalAmount- seletedItem.productPrice

            }
        case ADD_ORDER:
            return initialState
        case DELETE_PRODUCT:
            if (!state.items[action.payload]){
                return state
            }
            const updatedItems = {...state.items}
            const itemTotal = updatedItems[action.payload].sum
            delete updatedItems[action.payload]

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount- itemTotal
            }
        default:
            return state
    }
}