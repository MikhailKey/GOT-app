import React, {Component} from 'react';
//import './itemList.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
export default class ItemList extends Component {

    render() {
        return (
            <ListGroup>
                <ListGroupItem>
                    Jon Snow
                </ListGroupItem>
                <ListGroupItem>
                    Brandon Stark
                </ListGroupItem>
                <ListGroupItem>
                    Geremy
                </ListGroupItem>
            </ListGroup>
        );
    }
}