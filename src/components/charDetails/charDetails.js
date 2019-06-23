import React, {Component} from 'react';
import './charDetails.css';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const CharDetailsDiv = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 40px;
border-radius: 5px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
}
`
const Term = styled.span`
font-weight: bold;
`

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        error: false,
        loading: false,
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }   
    }
    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
        .then((char) => {
            this.setState({char})
        })
        
    }


    render() {
        const {error, char, loading} = this.state
        if (error) {
            return <ErrorMessage/>
        }
        if (loading) {
            return <Spinner/>
        }
        if (!char) {
            return <span className="select-error">Please select a character</span>
        }
        const {name, gender, born, died, culture} = this.state.char;
        return (
            <CharDetailsDiv>
                <h4>{name}</h4>
                <ListGroup className="list-group-flush">
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Gender</Term>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Born</Term>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Died</Term>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Culture</Term>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
            </CharDetailsDiv>
        );
    }
}