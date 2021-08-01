import React ,{Component} from 'react'
import classes from './AddCategory.module.css'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {updatedObject} from '../../../shared/utility'
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'

class AddCategory extends Component {
    state = {
        controls: {
            // parentId:{
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'Please enter parent category ID'
            //     },
            //     value: '',
            //     validation:{
            //         required: true,
            //         isEmail: false
            //     },
            //     valid: false,
            //     touched: false
            // },
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter name'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            }
        },            
        isLoading: false,
        refresh: false,
        value: null
    }

    componentDidMount(){
        this.props.catFetch(this.props.token, 'admin')
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
        this.setState({refresh: true})
        this.props.fetchData(this.props.token, this.state.value, 
        this.state.controls.name.value)
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


        let elementArray = [];
        for( let key in this.state.controls){
            elementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = 
        <div>
            <select onChange={(e)=>this.setState({value: e.target.value})}>
                        {myComp}
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
        let content = null 
        if(this.props.isLoading){
            content = <Spinner/>
        }

        let error = null 
        if(this.props.error && this.state.refresh){
            error = <div className={classes.Error}><p>{this.props.error}</p></div>
        }
            
        return(
            <div className={classes.Category}>
                {content}
                {error}
                <p><strong>Please Enter The Category Data to Add .....</strong></p>
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
        isLoading: state.category.isLoading,
        error: state.category.error,
        categoryData: state.category.category
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchData: (token, id, name) => dispatch(actions.category(token, id, name)),
        catFetch: (token,label) => dispatch(actions.categoryFetch(token, label))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)