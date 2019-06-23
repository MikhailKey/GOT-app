import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            showRandomChar: true,          
            error: false,
        }
        this.hideRandom = this.hideRandom.bind(this);
    }

    componentDidCatch() {
     
        this.setState({
            error: true
        })
    }

    hideRandom() {
        this.setState(
            {
                showRandomChar: !this.state.showRandomChar
            }
        )

    }
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    render() {
        const {showRandomChar} = this.state;
        
        let buttonText = 'Show random characher'
        let hide = <RandomChar/>;
        if (showRandomChar) {
            buttonText = 'Hide random characher'
        }
        else {
            hide = '';
        }

        if (this.state.error) {
            return <ErrorMessage/>
        }
     return (
        <> 
            <Container>
                <Header />
                <Button 
                    onClick={this.hideRandom}
                    color="info">{buttonText}</Button>
            </Container>
            <Container>
                <Row>
                    <Col /*lg={{size: 5, offset: 0}}*/>
                        {hide}
                    </Col>
                </Row>
                <CharacterPage/>
            </Container>
        </>
    );
};
}
