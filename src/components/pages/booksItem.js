import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';


export default class BooksItem extends Component {
    gotService = new gotService();
    state = {
        selectedItem: 3,
    }

    render() {
        return (
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
    }
}