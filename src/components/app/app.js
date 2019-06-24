import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            error: false,
        }
        
    }
    componentDidCatch() {
     
        this.setState({
            error: true
        })
    } 
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
     return (
        <> 
            <Container>
                <Header />
            </Container>
            <Container>
                <RandomChar/>
                <CharacterPage/>
                <BookPage/>
                <HousePage/>
            </Container>
        </>
    );
};
}
