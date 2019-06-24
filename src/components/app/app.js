import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, HousePage, BookPage} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';


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
       <Router>
            <div className ="app"> 
            <Container>
                <Header />
            </Container>
            <Container>
                <RandomChar/>
                <Route path='/' exact component={() => <h1>Welcome to the best GOT Wiki</h1>}/>
                <Route path='/characters' component={CharacterPage}/>
                <Route path='/houses' component={HousePage}/>
                <Route path='/books' exact component={BookPage}/>
               
            </Container>
        </div>
       </Router>
    );
};
}
