import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

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

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 2500);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    onCharLoaded = (char) => {
         this.setState({
             char,
             loading: false
            });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }


    updateChar = () => {
    const id = Math.floor(Math.random()*140 + 25);
    this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError); 
    }
    render() {

        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char = {char}/> : null;

    return (
        <MainWrap>
            {errorMessage}
            {spinner}
            {content}
        </MainWrap>
       );
    }
}
const View = ({char}) => {
        const {name, gender, born, died, culture} = char;
    return (
        <>
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
        </>
    )
}

