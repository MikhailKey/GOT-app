import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import {CharacterPage, HousePage, BookPage, BooksItem, HomePage} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import img from './got.jpg';

const AppBlock = styled.div`
    overflow-x: hidden;
    background: url(${img}) no-repeat center center ;
    background-size: cover;
    font-size: 16px;
    height: 1080px;	
}`

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
         <AppBlock>
       <Router>
            <div className ="app"> 
            <Container>
                <Header />
            </Container>
            <Container>
                <RandomChar/>
                <Route path='/' exact component={HomePage}/>
                <Route path='/characters' component={CharacterPage}/>
                <Route path='/houses' component={HousePage}/>
                <Route path='/books' exact component={BookPage}/>
                <Route path='/books/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                    return <BooksItem bookId={id}/>}
                    }/>
            </Container>
        </div>
       </Router>
       </AppBlock>
    );
};
}
