import React, {Component} from 'react';
import './itemList.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    componentDidMount() {
        const {getData} = this.props
        
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
        }
    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
                return (
                    <ListGroupItem 
                    key={id}
                    onClick = {() => this.props.onItemSelected(id)}>
                    {label}
                    </ListGroupItem>
                    )
                })
            }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {itemList} = this.state;
        
        if (!itemList) {
            return <Spinner/>
        }
        const items = this.renderItems(itemList);
        return (
            <ListGroup className="item-list">
                {items}
            </ListGroup>
        );
    }
}