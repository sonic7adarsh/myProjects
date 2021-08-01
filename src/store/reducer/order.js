import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    loading: false,
    error: null,
    data: []
}

const orderFetchStart = (state,action) => {
    return updatedObject(state, {error: null,loading: true})
}

const orderFetchSuccess = (state,action) => {
    return updatedObject(state, {
        loading: false,
        data: action.data
    })
}

const orderFetchFail = (state,action) => {
    return updatedObject(state, {loading: false})
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ORDER_FETCH_START:
            return orderFetchStart(state,action)
        case actions.ORDER_FETCH_SUCCESS:
            return orderFetchSuccess(state,action)
        case actions.ORDER_FETCH_FAIL:
            return orderFetchFail(state,action)
        default:
            return state
    }
}
    
export default reducer