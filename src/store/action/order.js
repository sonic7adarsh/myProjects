import * as actionTypes from './actionTypes'
import axios from 'axios'


export const orderFetchStart = () => {
    return{
        type: actionTypes.ORDER_FETCH_START
    }
}

export const orderFetchSuccess = (data) => {
    return{
        type: actionTypes.ORDER_FETCH_SUCCESS,
        data: data
    }
}

export const orderFetchFail = () => {
    return{
        type: actionTypes.ORDER_FETCH_FAIL
    }
}

export const orders =  (token) => {
    return dispatch => {
        dispatch(orderFetchStart())
        axios({
            method: 'Get',
            url: `http://localhost:8080/e-commerce/customer/home/all-orders`,
            headers: {
                'Authorization': 'Bearer' + token,
                'Content-Type': 'application/json'
                },
         })
         .then(response => {
            dispatch(orderFetchSuccess(response.data))
         }).catch( err => {
            dispatch(orderFetchFail())
         })
    }
}



