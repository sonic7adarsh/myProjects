import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'
import classes from './VariationDetail.module.css'

class VariationDetails extends Component{
    state = {
        counter: 0,
        quantity: 0
    } 

    addQuantityHandler = () => {
        this.setState({counter: 0})
        let count = this.state.counter
        this.props.data.map(prod => {
            return this.setState({
                quantity: prod.quantityAvailable
            })
        })
        if(this.state.counter < this.state.quantity){
            count = count + 1
            this.setState({
            counter: count,
            })
        }
    }

    removeQuantityHandler = () => {
        let count = this.state.counter
    
        if(count > 0 ){
            count = count - 1
        }
        
        this.setState({
            counter: count
        })
    }

    submitHandler = (id) => {
        this.props.history.push('/similar/product')
        this.props.similarProducts(id,this.props.token)
    }

    addHandler = (id) => {
        alert('Product Added to Cart')
        this.props.addToCart(id, this.state.counter,this.props.token)
    }


    render(){
        let products = this.props.data.map(product => (
            <div className={classes.Variation} key={product.id}>
                <div className={classes.Image}>
                    <img src=  {require(`../../../assets/images/${product.productVariationImage}`)} alt="product data"/>
                </div>
                <div className={classes.Main}>
                    <h1><strong>{product.product.name}</strong></h1>
                    <p>Price: <strong>USD: {Number.parseFloat(product.price).toFixed(2)}</strong></p>
                </div>
        
                <div className={classes.Detailss}>
                    <h1><strong>Details</strong></h1>
                    <div className={classes.Clicker}>
                        <button onClick={this.submitHandler.bind(this,product.product.id)}>Click to See Similar Products</button>
                        <button >Order now</button><br></br>
                        <button onClick={this.addHandler.bind(this,product.id)}>Add to Cart</button>
                        <button onClick={this.addQuantityHandler} >+</button>
                        <span>{this.state.counter}</span>
                        <button onClick={this.removeQuantityHandler} >-</button>
                    </div>
                    {/* <div className={classes.Order}>
                       
                    </div> */}
                    <div className={classes.Desc}>
                        <p><strong>Description: </strong>{product.product.description}</p>
                        <p><strong>Brand: </strong>{product.product.brand}</p>
                        <p><strong>{Object.keys(product.metaData)}:-</strong>  {Object.values(product.metaData)}</p>
                        <p><strong>Quantity Available: </strong>{product.quantityAvailable}</p>
                    </div>
                    
                </div>
                
                
            </div>
                ))
                if(this.props.token === null){
                    products = (
                        <div className={classes.Msg}>
                            <p><strong>Please login first.......</strong></p>
                        </div>
                    )
                }
        return(
            <div>
                {products}
               
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        data: state.variation.productVariation
    }
}

const mapDispatchToProps = dispatch => {
    return{
        similarProducts: (id,token) => dispatch(actions.similar(id,token)),
        addToCart: (id, quantity, token) => dispatch(actions.addCart(id, quantity, token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(VariationDetails)