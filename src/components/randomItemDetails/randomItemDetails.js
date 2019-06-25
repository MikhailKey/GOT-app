import React, {Component} from 'react';
import styled from 'styled-components';
import {ListGroupItem, ListGroup, Button}  from 'reactstrap';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage';


const Term = styled.span`
    font-weight: bold;
`;

const RandomBlockTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <Term>{label}</Term>
            <span>{item[field]}</span>
        </ListGroupItem>
    )
}

const Title = ({item, field, label}) => {
    return (
        <RandomBlockTitle>{`Random ${label}: ${item[field]}`}</RandomBlockTitle>
    )
}

export {Field, Title};

export default class RandomItemDetails extends Component {

    constructor () {
        super();

        this.state = {
            item: {},
            loading: true,
            error: false,
            showRandomChar: true, 
        }

        this.onItemLoaded = (item) => {
            this.setState({item, loading: false});
        }

        this.onError = () => {
            this.setState({
                error: true,
                loading: false
            });
        }
        this.hideRandom = () => {
            this.setState(
                {
                    showRandomChar: !this.state.showRandomChar
                }
            )
    
        }
        this.updateItem = () => {
            const id = Math.floor(Math.random() * 140 + 25);
            const {getData} = this.props;
            getData(id)
                .then((item) => this.onItemLoaded(item))
                .catch(this.onError);
        }
        

        this.componentDidMount = () => {
            this.updateItem();
            this.timer = setInterval(this.updateItem, 3000);
        };

        this.componentWillUnmount = () => {
            clearInterval(this.timer);
        }
    }

    render() {
        const {item, loading, error, showRandomChar} = this.state;
        let buttonText = 'Show random characher'
        if (error) {
            return <ErrorMessage/>
        } else if (loading) {
            return <Spinner/>
        }
        let hide = (
            <>
            <Title field='name' label='character' item={item} />
                <ListGroup className="list-group-flush">
                {    
                    React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
                </ListGroup></>
        )
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
                {hide}
            </>
        )
        
    }
}