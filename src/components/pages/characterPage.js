import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../RowBlock';


export default class CharacterPage extends Component {
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
                getData = {this.gotService.getAllCharacters}
                onItemSelected={this.onItemSelected}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        )
        const itemDetails = (
            <ItemDetails 
            text={'Please select a character'}
            itemId={this.state.selectedItem}
            getItem={this.gotService.getCharacter}
            >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        return (
           <RowBlock left = {itemList} right = {itemDetails}/>
        )
    }
}