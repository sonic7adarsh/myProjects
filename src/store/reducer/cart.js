import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    loading: false,
    getLoad: false,
    error: null,
    data: []
}

const cartAddStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const cartAddSuccess = (state,action) => {
    return updatedObject(state, {
        loading: false,
    })
}

const cartAddFail = (state,action) => {
    return updatedObject(state, {loading: false})
}


const cartGetStart = (state,action) => {
    return updatedObject(state, {data:[], error: null, getLoad: true})
}

const cartGetSuccess = (state,action) => {
    return updatedObject(state, {
        getLoad: false,
        data: action.data
    })
}

const cartGetFail = (state,action) => {
    return updatedObject(state, {getLoad: false})
}


const orderStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const orderSuccess = (state,action) => {
    return updatedObject(state, {
        loading: false,
    })
}

const orderFail = (state,action) => {
    return updatedObject(state, {loading: false})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.CART_ADD_START:
            return cartAddStart(state,action)
        case actions.CART_ADD_SUCCESS:
            return cartAddSuccess(state,action)
        case actions.CART_ADD_FAIL:
            return cartAddFail(state,action)
        case actions.CART_GET_START:
            return cartGetStart(state,action)
        case actions.CART_GET_SUCCESS:
            return cartGetSuccess(state,action)
        case actions.CART_GET_FAIL:
            return cartGetFail(state,action)
        case actions.ORDER_START:
            return orderStart(state,action)
        case actions.ORDER_SUCCESS:
            return orderSuccess(state,action)
        case actions.ORDER_FAIL:
            return orderFail(state,action)
        default:
            return state
    }
}

export default reducer