import PRODUCTS from '../../data/dummy_data'

const initialState = {
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod=> prod.ownerId==='u1')
}

export default (state=initialState,action) => {
    switch(action.type){
        default:
            return state
    }
}