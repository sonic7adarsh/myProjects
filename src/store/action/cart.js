import * as actionTypes from './actionTypes'
import axios from 'axios'


export const cartAddStart = () => {
    return{
        type: actionTypes.CART_ADD_START
    }
}

export const cartAddSuccess = () => {
    return{
        type: actionTypes.CART_ADD_SUCCESS
    }
}

export const cartAddFail = () => {
    return{
        type: actionTypes.CART_ADD_FAIL
    }
}

export const addCart =  (id, quantity, token) => {
    return dispatch => {
        dispatch(cartAddStart())
        axios({
            method: 'Post',
            url: `http://localhost:8080/e-commerce/customer/home/cart`,
            data:{
                productVariationId: id,
                quantity: quantity
            },
            headers: {
                'Authorization': 'Bearer' + token,
                'Content-Type': 'application/json'
                },
         })
         .then(response => {
            dispatch(cartAddSuccess())
         }).catch( err => {
            dispatch(cartAddFail())
         })
    }
}

export const cartGetStart = () => {
    return{
        type: actionTypes.CART_GET_START
    }
}

export const cartGetSuccess = (data) => {
    return{
        type: actionTypes.CART_GET_SUCCESS,
        data: data
    }
}

export const cartGetFail = () => {
    return{
        type: actionTypes.CART_GET_FAIL
    }
}

export const getCart =  (token) => {
    return dispatch => {
        dispatch(cartGetStart())
        axios({
            method: 'Get',
            url: `http://localhost:8080/e-commerce/customer/home/all-cart`,
            headers: {
                'Authorization': 'Bearer' + token,
                'Content-Type': 'application/json'
                },
         })
         .then(response => {
            dispatch(cartGetSuccess(response.data))
         }).catch( err => {
            dispatch(cartGetFail())
         })
    }
}


export const orderStart = () => {
    return{
        type: actionTypes.ORDER_START
    }
}

export const orderSuccess = () => {
    return{
        type: actionTypes.ORDER_SUCCESS
    }
}

export const orderFail = () => {
    return{
        type: actionTypes.ORDER_FAIL
    }
}

export const orderItem =  (id,token) => {
    return dispatch => {
        dispatch(orderStart())
        axios({
            method: 'Post',
            url: `http://localhost:8080/e-commerce/customer/home/add-cart-order/${id}`,
            headers: {
                'Authorization': 'Bearer' + token,
                'Content-Type': 'application/json'
                },
         })
         .then(response => {
            dispatch(orderSuccess())
         }).catch( err => {
            dispatch(orderFail())
         })
    }
}
