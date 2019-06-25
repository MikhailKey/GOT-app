import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import RandomItemDetails, {Field} from '../randomItemDetails/randomItemDetails';
import ErrorMessage from '../errorMessage';


const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;



export default class RandomChar extends Component {

    constructor () {
        super();

        this.GotService = new GotService();

        this.state = {
            error: false
        }

        this.componentDidCatch = () => {
            this.setState({error: true})
        }
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <ErrorMessage/ >
        }

        return (
            <RandomBlock>
                <RandomItemDetails getData={this.GotService.getBook}>
                       
                    <Field field='numberOfPages' label='Number of Pages' />
                    <Field field='publiser' label='Publiser' />
                    <Field field='released' label='Released' />

                </RandomItemDetails>
            </RandomBlock>
        );
    }
}