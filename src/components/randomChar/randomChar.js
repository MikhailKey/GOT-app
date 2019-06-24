import React, {Component} from 'react';
import gotService from '../../services/gotService';
import {Col, Row, Button} from 'reactstrap';
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
    constructor(props) {
        super(props);
        this.state = {
            char: {},
            loading: true,
            error: false,
            showRandomChar: true,   
    }
    this.hideRandom = this.hideRandom.bind(this);
    }
    hideRandom() {
        this.setState(
            {
                showRandomChar: !this.state.showRandomChar
            }
        )

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
    const {getRandomItem} = this.props
    const id = Math.floor(Math.random()*140 + 25);
        getRandomItem(id)
            .then(this.onCharLoaded)
            .catch(this.onError); 
    }
    render() {
        
        const {showRandomChar} = this.state;
        
       

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char = {char}/> : null;
        let buttonText = 'Show random characher'
        let hide = <MainWrap>
        {errorMessage}
        {spinner}
        {content}
     </MainWrap>;
        if (showRandomChar) {
            buttonText = 'Hide random characher'
        }
        else {
            hide = '';
        }

    return (
        <>
        <Button 
            onClick={this.hideRandom}
            color="info">{buttonText}</Button>
                <Row>
                    <Col /*lg={{size: 5, offset: 0}}*/>
                        {hide}
                    </Col>
                </Row>
        </>
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

