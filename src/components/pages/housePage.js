import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../RowBlock';
import RandomChar from '../randomChar';

export default class HousePage extends Component {
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
            getData={this.gotService.getAllHouse}
            renderItem={(item) => item.name}/>
        )
        const itemDetails = (
            
            <ItemDetails 
            text={'Please select a house'}
            itemId={this.state.selectedItem}
            getItem={this.gotService.getHouse}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='coatOfArms' label='Coat of arms'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )
        return (
            <>
            {/*<RandomChar 
                getRandomItem = {this.gotService.getHouse}
            />*/}
           <RowBlock left = {itemList} right = {itemDetails}/>
           </>
        )
    }
}