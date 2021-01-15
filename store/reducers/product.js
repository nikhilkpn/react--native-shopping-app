import PRODUCTS from '../../data/dummy_data'
import Product from '../../models/product'
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/product'


const initialState = {
    availableProducts:[],
    userProducts:[]
}

export default (state=initialState,action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return {
                availableProducts:action.products,
                userProducts: action.userProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(prod=> prod.id !== action.payload),
                userProducts: state.userProducts.filter(prod=> prod.id !== action.payload)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.payload.id,
                action.payload.ownerId,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                action.payload.price
                )
                return {
                    ...state,
                    availableProducts:state.availableProducts.concat(newProduct),
                    userProducts:state.userProducts.concat(newProduct)
                }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod=>prod.id===action.productId);
            const availbleProductIndex = state.availableProducts.findIndex(prod=>prod.id===action.productId);
            const updatedProduct = new Product(
                action.productId,
                state.userProducts[productIndex].ownerId,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                state.userProducts[productIndex].price,
        )
        const updatedUserProducts = [...state.userProducts];
        updatedUserProducts[productIndex] = updatedProduct;
        const updatedAvailableProducts = [...state.availableProducts];
        updatedAvailableProducts[availbleProductIndex] = updatedProduct;
        return {
            ...state,
            availableProducts: updatedAvailableProducts,
            userProducts :updatedUserProducts
        }

        default:
            return state
    }
}