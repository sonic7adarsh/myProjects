import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import {updatedObject} from '../../shared/utility'
import classes from './Search.module.css'

class Search extends Component {
    state = {
        controls: {
            searchBar: {
                elementType: 'input',
                elementConfig: {
                    type: 'search',
                    placeholder: 'Hey, search here for the items ....!'
                },
                value: ''
            }
        }
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

    render(){

        let searchElementArray = [];
        for( let key in this.state.controls){
            searchElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let search = searchElementArray.map(searchElement => (
            <Input
                key= {searchElement.id}
                elementType={searchElement.config.elementType}
                elementConfig={searchElement.config.elementConfig}
                value={searchElement.config.value}
                changed={(event) => this.inputChangedHandler(event,searchElement.id)}/>
          
        ))

        return(
            <Aux>
                <div className={classes.Search}>
                    <div className={classes.Input}>
                        {search}
                    </div>
                    <div className={classes.Button}>
                        <Button>Go</Button>
                    </div>
                    
                </div>

            </Aux>
        )
    }
}

export default Search