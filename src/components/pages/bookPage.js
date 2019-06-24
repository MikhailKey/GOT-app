import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';


class BookPage extends Component {
    gotService = new gotService();
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
       
        
        return (
            <ItemList 
            onItemSelected={(itemId) => {
                this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBook}
            renderItem={(item) => item.name}/>
        )
    }
}
export default withRouter(BookPage);




/*import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../RowBlock';


export default class BookPage extends Component {
    gotService = new gotService();
    state = {
        selectedItem: null,
        error: false,

    }
    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    } 
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllBook}
            renderItem={(item) => item.name}/>
        )
        const itemDetails = (
            <ItemDetails  
            text={'Please select a book'}
            itemId={this.state.selectedItem}
            getItem={this.gotService.getBook}
            >
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publiser' label='Publiser'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
        return (
           <RowBlock left = {itemList} right = {itemDetails}/>
        )
    }
} */