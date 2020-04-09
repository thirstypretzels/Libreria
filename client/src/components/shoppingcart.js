/*import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = props => (
  <tr>
    <td> 
      <img
      src = {props.cart.books}
      width="100" height="175"
      />
    </td>
    <td>{props.book.title}</td>
    <td>{props.book.author}</td>
    <td>${props.book.price}</td>
    <td>{props.book.rating} Stars</td>
    <td>
    <button onClick={() => props.addToCart(props.book._id,"5e8b7dbaa7361446701d9098")}>Add to Cart</button>
    </td>
  </tr>
)
//addToCart(props.book._id,5e8b7dbaa7361446701d9098)
export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {carts: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/carts/')
      .then(response => {
        this.setState({ carts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addToCart(id, cartId){
      axios.post('http://localhost:5000/carts/update/' + cartId + '/' + id)
      .then(res => console.log(res.data));
  }

  deleteBook(id) {
    axios.delete('http://localhost:5000/books/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      carts: this.state.books.filter(el => el._id !== id)
    })
  }

  bookList() {
    return this.state.carts.map(currentbook => {
      return <Cart cart={currentbook} addToCart={this.addToCart} deleteBook={this.deleteBook} key={currentbook._id}/>;
    })
  }

  setem()
  {
    for(var i=0;i<cart.books.length;i++)
    {
        var tr="<tr>";
        var img = "<td> <img src = {"+cart.books[i].image + "} width='100' height='175' /> </td>";
        var td1="<td>"+cart.books[i]["title"]+"</td>";
        var td2="<td>"+cart.books[i]["author"]+"</td>";
        var td3="<td>"+cart.books[i]["price"]+"</td>";
        var td4="<td>"+cart.books[i]["rating"]+"</td></tr>";
        
      var final = (tr+img+td1+td2+td3+td4);  
    }
  }

  render() {
    return (
      <div id="div1"> 
          {this.bookList()}
          { this.setem() }
      </div>
    )
  }
}
*/

import React, { Component } from "react";
import { Comment, CommentGroup, Button, Form, Header } from "semantic-ui-react";
import cover from "../images/hemingwayCover.jpg";

class Comments extends Component {
  render() {
    return (
      <div class='image'>
        <div className='details'>
          <h1 className='title'>Enerst Hemingay</h1>
          <h1>StarRating</h1>
        </div>
      </div>
    );
  }
}

export default Comments;
