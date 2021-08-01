import React,{Component} from 'react'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'
import classes from './Order.module.css'
import Button from '../../../components/UI/Button/Button'
import axios from 'axios'

class Order extends Component{
    state = {
        loading: false
    }

    componentDidMount(){
        this.props.orders(this.props.token)
    }

    removeHandler = (id) => {
        axios({
            method: 'DELETE',
            url: `http://localhost:8080/e-commerce/customer/home/order/${id}`,
            headers: {
                'Authorization': 'Bearer' + this.props.token,
                'Content-Type': 'application/json'
                },
         })
         .then(response => {
            this.props.orders(this.props.token)
            this.setState({
                loading: false
            })
            alert('Order Cancel Successfully...........Hope to see you Soon.')
         }).catch( err => {
         })
    }

    render(){
        let content = null
        if(this.props.isLoading || this.state.loading){
            content = <div className={classes.Spin}>
                        <Spinner/>
                    </div>
        }
        if(!this.props.isLoading  && this.props.data != null && !this.state.loading){
            content = 
            this.props.data.map(or => (
                <div className={classes.Detail} key = {or.id}>
                    <p><strong>First NAME: </strong>{or.user.firstName}</p>
                    <p><strong>Last NAME: </strong>{or.user.lastName}</p>
                    <p><strong>Contact No. </strong>{or.user.contactNo}</p>
                    <p><strong>Amount Paid: </strong>{or.amountPaid}</p>
                    <p><strong>Date of Puchase: </strong>{or.dateCreated}</p>
                    <p><strong>Shipping Details of {or.address.label}</strong></p>
                    <p><strong>City: </strong>{or.address.city}</p>
                    <p><strong>State: </strong>{or.address.state}</p>
                    <p><strong>Address: </strong>{or.address.address}</p>
                    <p><strong>Country: </strong>{or.address.country}</p>
                    <p><strong>ZipCode: </strong>{or.address.zipCode}</p>
                    <div className={classes.Center}>
                        <Button btnType="Danger" clicked={this.removeHandler.bind(this,or.id)}>Cancel order</Button>
                    </div>
                </div>
            ))
        }

        return(
            <div>
                <div className={classes.Upper}><h1><p>****************ORDER  SUMMARY*************</p></h1></div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        isLoading: state.order.loading,
        data: state.order.data
    }
}

const mapDispatchToProps = dispatch => {
    return{
        orders:  (token) => dispatch(actions.orders(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
