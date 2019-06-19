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
        
        let hideButton = <Button 
        onClick={this.hideRandom}
        color="info">Show random characher</Button>

        if (hideStatus) {
            hide += '';

            hideButton = <Button 
            onClick={this.hideRandom}
            color="info">Hide random characher</Button>
            
        }
        else {
            hide += 'd-none';
        }

    return (
        <> 
            <Container>
                <Header />
                {hideButton}
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
