import React ,{Component} from 'react'
import classes from './UpdateMetadata.module.css'
import Button from '../../../../components/UI/Button/Button'
import Input from '../../../../components/UI/Input/Input'
import {updatedObject} from '../../../../shared/utility'
import {connect} from 'react-redux'
import * as actions from '../../../../store/action/index'

class UpdateMetaData extends Component {
    state = {
        controls: {
            values:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter value'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        },            
        isLoading: false,
        categoryId: null,
        metadataId: null
    }

    componentDidMount(){
        this.props.catFetch(this.props.token,'admin')
        this.props.metadataFetch(this.props.token)
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

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.props.updateData(this.props.token, this.state.categoryId,
        this.state.metadataId, this.state.controls.values.value)
    }

    render(){
        let myComp
        if(this.props.categoryData.length!==0){

             myComp =  Object.keys(this.props.categoryData).map(igkey=>{
                   return [...Array(this.props.categoryData[igkey])].map(key=>{  
                       
                      return(
                          <option key={igkey} value={key.id}>{key.name}</option>
                      );
          
                   });
          
              
              });
        }

        let myCompOther
        if(this.props.metaData.length!==0){

             myCompOther =  Object.keys(this.props.metaData).map(igkey=>{
                   return [...Array(this.props.metaData[igkey])].map(key=>{  
                       
                      return(
                          <option key={igkey} value={key.id}>{key.name}</option>
                      );
          
                   });
          
              
              });
        }

        let elementArray = [];
        for( let key in this.state.controls){
            elementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form =
        <div>
            <select onChange={(e)=>this.setState({categoryId: e.target.value})}>
                    {myComp}
            </select>
            <select onChange={(e)=>this.setState({metadataId: e.target.value})}>
                    {myCompOther}
            </select>
            {elementArray.map(element => (
                <Input
                    key= {element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}    
                    changed={(event) => this.inputChangedHandler(event,element.id)}/>
            ))}
        </div>

            
        return(
            <div className={classes.Metadata}>
                <p><strong>Please Enter The Required Field .....</strong></p>
                <form>
                    {form}
                </form>
                <div>
                    <Button btnType="Success" clicked={this.onSubmitHandler}>Submit</Button>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        isLoading: state.metadata.isLoading,
        error: state.metadata.error,
        categoryData: state.category.category,
        metaData: state.metadata.metadata

    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateData: (token, id, fieldId, value) => dispatch(actions.updateMetadataValue(token, id, fieldId, value)),
        catFetch: (token, label) => dispatch(actions.categoryFetch(token, label)),
        metadataFetch: (token) => dispatch(actions.metadataFetch(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMetaData)