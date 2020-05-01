import React from 'react';
import './App.css';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import Main from './components/main';
import {Route,  Link } from 'react-router-dom';
import Callback from './callback';
import Home from './home';


function App() {
  return (
    <div className="App" >
    <Route exact path='/' component={Home} exact />
    <Route exact path='/callback' component={Callback} exact />
</div>


  );
}

export default App;
/* <div className="demo-big-content">
    <Layout>
        <Header className="header-color" title="Bookstore" scroll>
            <Navigation>
                <Link to="/Browse">Browse</Link>
                <Link to="/Profile">Profile</Link>
                 <Link to="/Wish">Wish List</Link>
                <Link to="/Cart">Shopping Cart</Link>
                <Link to="/Comments">Comments PlaceHolder</Link>
            </Navigation>
        </Header>
        <Drawer title="Bookstore">
            <Navigation>
                <Link to="/Browse">Browse</Link>
                <Link to="/Profile">Profile</Link>
                <Link to="/Wish">Wish List</Link>
                <Link to="/Cart">Shopping Cart</Link>
                <Link to="/DetailsComments">Comments PlaceHolder</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main/>
        </Content>
    </Layout>*/ 