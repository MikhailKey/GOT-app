import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';



export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            hideStatus: true
        }
        this.hideRandom = this.hideRandom.bind(this);
    }


    hideRandom() {
        this.setState(
            {
                hideStatus: !this.state.hideStatus
            }
        )

    }
    render() {
        const {hideStatus} = this.state;

        let hide = ' ';
        
        let buttonText = 'Show random characher'

        if (hideStatus) {
            hide += '';
            buttonText = 'Hide random characher'
        }
        else {
            hide += 'd-none';
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
                <Row className={hide}>
                    <Col lg={{size: 5, offset: 0}}>
                        <RandomChar/>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList />
                    </Col>
                    <Col md='6'>
                        <CharDetails />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
}
