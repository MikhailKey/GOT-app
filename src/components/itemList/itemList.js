import React, {Component} from 'react';
import './itemList.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
        }
    renderItems(arr) {
        return arr.map((item) => {
                return (
                    <ListGroupItem 
                    key={item.id}
                    onClick = {() => this.props.onCharSelected(item.id)}>
                    {item.name}
                    </ListGroupItem>
                    )
                })
            }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {charList} = this.state;
        
        if (!charList) {
            return <Spinner/>
        }
        const items = this.renderItems(charList);
        return (
            <ListGroup className="item-list">
                {items}
            </ListGroup>
        );
    }
}