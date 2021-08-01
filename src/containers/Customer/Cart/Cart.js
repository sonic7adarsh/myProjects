import React,{Component} from 'react'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import * as  actions from '../../../store/action/index'
import classes from './Cart.module.css'
import {connect} from 'react-redux' 
import axios from 'axios'

class Cart extends Component{
    state = {
        loading: false
    }
    
    componentDidMount(){
        this.props.getData(this.props.token)
    }


    removeHandler = (id) => {
        this.setState({
            loading: true
        })
        axios({
            method: 'Delete',
            url: `http://localhost:8080/e-commerce/customer/home/delete-cart/${id}`,
            headers: {
                'Authorization': 'Bearer' + this.props.token,
                'Content-Type': 'application/json'
                },
         })
         .then(response => {
            this.props.getData(this.props.token)
            this.setState({
                loading: false
            })
            alert('cart item deleted Successfully')
         }).catch( err => {
         })
        
        
    }

    orderHandler = (id) => {
        this.props.history.push('/order-placed')
        this.props.order(id, this.props.token)
    }

    render(){
        let content = null
        if(this.props.isLoading || this.state.loading){
            content = <div className={classes.Spin}>
                        <Spinner/>
                    </div>
            
        }
        if(!this.props.isLoading && this.props.cartData != null && !this.state.loading){
            content = this.props.cartData.map(product => (
                <div className={classes.Cart} key={product.id}>
                    <div className={classes.Left}>
                        <img src=  {require(`../../../assets/images/${product.productVariation.productVariationImage}`)} alt="product data"/>
                    </div>
                    <div className={classes.Right}>
                    <div className={classes.Desc}>
                            <h1><strong>{product.productVariation.product.name}</strong></h1>
                            <p>Price: <strong>USD: {Number.parseFloat(product.productVariation.price).toFixed(2)}</strong></p>
                        </div>
            
                        <div className={classes.Detailss}>
                            <div className={classes.Desc}>
                                <p><strong>Description: </strong>{product.productVariation.product.description}</p>
                                <p><strong>Brand: </strong>{product.productVariation.product.brand}</p>
                                <p><strong>{Object.keys(product.productVariation.metaData)}:-</strong>  {Object.values(product.productVariation.metaData)}</p>
                                <p><strong>Quantity Added to cart:-</strong>  {product.quantity}</p>
                            </div>
                           
                        </div>
                            <div className={classes.Delete}>
                                <Button btnType = "Danger" clicked = {this.removeHandler.bind(this, product.id)}>Remove item from Cart</Button>
                                <Button btnType = "Success" clicked = {this.orderHandler.bind(this, product.id)}>Order item</Button>
                            </div>
                    </div>
                                       
                </div>
            ))
        }
            if(this.props.token === null){
                content = (
                    <div className={classes.Msg}>
                        <p><strong>Please login as customer.......</strong></p>
                    </div>
                )
            }
            if(this.props.label === null || this.props.label === 'seller' || this.props.label === 'admin'){
                content = (
                    <div className={classes.Msg}>
                        <p><strong>Please login as customer.......</strong></p>
                    </div>
                )
            }
        return(
            <div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        label: state.auth.label,
        isLoading: state.cart.loading,
        token: state.auth.token,
        cartData: state.cart.data,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getData: (token) => dispatch(actions.getCart(token)),
        order: (id, token) => dispatch(actions.orderItem(id, token))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Cart);