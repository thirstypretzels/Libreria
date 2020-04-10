import React from 'react';
import './App.css';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="demo-big-content">
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
    </Layout>
</div>


  );
}

export default App;
