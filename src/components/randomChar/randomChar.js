import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
const MainWrap = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 5px
    h4 {
        margin-bottom: 20px;
        text-align: center;
}
`;
const Term = styled.span`
font-weight: bold;
`


export default class RandomChar extends Component {

    constructor() {
        super()
        this.updateChar();
    }
    gotService = new gotService();
    state = {
        char: {}
    }

    onCharLoaded = (char) => {
         this.setState({char});
    }
    updateChar() {
    const id = Math.floor(Math.random()*140 + 25);
    this.gotService.getCharacter(id)
     .then(this.onCharLoaded);
}
render() {
    const { char: {name, gender, born, died, culture} } = this.state;
    return (
        <MainWrap>
            <h4>Random Character: {name}</h4>
            <ListGroup className="list-group-flush">
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                <Term>Born </Term>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </MainWrap>
    );
}
}
