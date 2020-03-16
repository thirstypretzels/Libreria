import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import Browse from './browse';
import Profile from './profile';
import Wish from './wishlist';
import Cart from './shoppingcart';
import Comments from './comments';


const Main = () => (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/Browse" component={Browse} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Wish" component={Wish} />
        <Route path="/Cart" component={Cart} />
        <Route path="/Comments" component={Comments} />
    </Switch>
)

export default Main;