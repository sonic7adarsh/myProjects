import React,{Component} from 'react'
import classes from './ProductVariation.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {updatedObject} from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'

class AddProductVariation extends Component{
    state = {
        controls: {
            productVariationId:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter Variation Id if want to update else not'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            quantity:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter the quantity available'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            price:{
                elementType: 'Input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter price'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            image:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter the name of the image'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            field:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter field'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            values:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter value'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
        refresh: false,
        value: null
    }

    componentDidMount(){
        console.log('token>>>>>'+this.props.token)
        this.props.prodFetch(this.props.token)
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls,{
            [controlName]: updatedObject(this.state.controls[controlName],{
                value: event.target.value,
            })
        }) 
       this.setState({
           controls: updatedControls
       })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({
            isSignup: true,
            refresh: true
        })
        this.props.onAdd(this.state.value, this.state.controls.quantity.value, 
        this.state.controls.price.value, this.state.controls.image.value,this.state.controls.field.value, this.state.controls.values.value, 
        this.props.token)
    }

    updateHandler = (event) => {
        event.preventDefault()
        this.setState({
            isSignup: true
        })
        this.props.onUpdate(this.state.controls.productVariationId.value,this.state.value, this.state.controls.quantity.value, 
        this.state.controls.price.value,this.state.controls.image.value, this.state.controls.field.value, this.state.controls.values.value, 
        this.props.token)
    }

    
    render(){
        let myComp
        if(this.props.productData.length!==0){

             myComp =  Object.keys(this.props.productData).map(igkey=>{
                   return [...Array(this.props.productData[igkey])].map(key=>{  
                       
                      return(
                          <option key={igkey} value={key.id}>{key.name}</option>
                      );
                   });
              });
           }

        let detailElementArray = [];
        for( let key in this.state.controls){
            detailElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let detail = 
        <div>
        <select onChange={(e)=>this.setState({value: e.target.value})}>
                        {myComp}
        </select>
        {detailElementArray.map(detailElement => (
            <Input
                key= {detailElement.id}
                elementType={detailElement.config.elementType}
                elementConfig={detailElement.config.elementConfig}
                value={detailElement.config.value}
                changed={(event) => this.inputChangedHandler(event,detailElement.id)}/>
        ))}
        </div>
        let spin =null
        if(this.props.loading){
            spin = <div className={classes.Update}>
                        <Spinner/>
                    </div>
        }
        let msg = null
        if(this.state.refresh){
            msg = <div className={classes.Green}><p>{this.props.msg}</p></div>
        }
        let error = null  
        if(this.state.refresh){
            error = <div className={classes.RED}><p>{this.props.error}</p></div>
        }    
        return(
            <div className={classes.ProductVar}>
                {msg}
                {error}
                <p>Please Enter the Details</p>
                <form onSubmit={this.submitHandler}>
                    {spin}
                    {detail}
                    <Button btnType ="Success" clicked={this.submitHandler}>Submit</Button>
                    <Button btnType ="Danger" clicked={this.updateHandler}>Update Variation</Button>
                </form>
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return{ 
        token: state.auth.token,
        loading: state.product.loading,
        msg: state.product.msg,
        error: state.product.error,
        productData: state.product.sellerProduct
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAdd: (productId , quantity, price, image, field, value, token) => dispatch(actions.productVariationPost(productId,quantity, price, image, field, value, token)),
        onUpdate: (variationId,productId , quantity, price, image, field, value, token) => dispatch(actions.productVariationUpdate(variationId,productId,quantity, price, image, field, value, token)),
        prodFetch: (token) => dispatch(actions.sellerProductFetch(token))
    }
}


export default connect(mapStatetoProps,mapDispatchToProps)(AddProductVariation)