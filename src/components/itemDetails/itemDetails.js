import React, {Component} from 'react';
import './itemDetails.css';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const ItemDetailsDiv = styled.div`
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
const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
                        <Term>{label} </Term>
                        <span>{item[field]}</span>
        </ListGroupItem>
    )
}

export {
    Field
}

export default class itemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        error: false,
        loading: false,
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    componentDidMount() {
        this.updateitem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateitem();
        }   
    }
    updateitem() {
        const {itemId, getItem} = this.props;
        if (!itemId) {
            return;
        }

        getItem(itemId)
        .then((item) => {
            this.setState({item})
        })
        
    }


    render() {
        const {error, item, loading} = this.state
        const {text} = this.props;
        if (error) {
            return <ErrorMessage/>
        }
        if (loading) {
            return <Spinner/>
        }
        if (!item) {
            return <span className="select-error">{text}</span>
        }
        const {name} = item;
        return (
            <ItemDetailsDiv>
                <h4>{name}</h4>
                <ListGroup className="list-group-flush">
               {
                   React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, {item})
                   })
               }
                </ListGroup>
            </ItemDetailsDiv>
        );
    }
}