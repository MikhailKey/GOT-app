import React, {Component} from 'react';
//import './itemList.css';
import styled from 'styled-components';


const ListGroup = styled.ul`
cursor: pointer;
`
export default class ItemList extends Component {

    render() {
        return (
            <ListGroup className="list-group">
                <li className="list-group-item">
                    Jon Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ListGroup>
        );
    }
}