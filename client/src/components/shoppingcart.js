import React, { Component } from 'react';
import axios from 'axios';

const Cart = props => (
  <tr>
    <td> 
      <img
      src = {props.image}
      width="100" height="175"
      />
    </td>
    <td>{props.title}</td>
    <td>{props.author}</td>
    <td>${props.price}</td>
    <td>{props.rating} Stars</td>
  </tr>
)

const axis = require('axios');
async function populateBookIds(cartArray){
  let booksInTheCart = [];
  console.log("harry");
  for(let i=0;i < cartArray.length;i++){
    let res = await axis.get('http://localhost:5000/books/' + cartArray[i][0]);
    booksInTheCart.push(res.data);
  }
  console.log(booksInTheCart[1].title);
  return booksInTheCart;
}

export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {carts:[], books:[]};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/carts/')
      .then(response => {
        this.setState({carts: response.data[0]});
        console.log(this.state.carts.product[0][0]);
      })
      .catch((error) => {
        console.log(error);
      })
      
      populateBookIds(this.state.carts.product)
      .then(response => {
        //console.log(bookDocuments[0]);
        this.setState({books: response})
      })
      .catch((error) => {
        console.log(error);
      })
      //console.log(this.state.books[0]);
  }

  deleteBook(id) {
    axios.delete('http://localhost:5000/books/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      carts: this.state.books.filter(el => el._id !== id)
    })
  }

  bookList() {
   /* populateBookIds(this.state.carts.product)
      .then(response => {
        this.setState({books: response})
      })
      .catch((error) => {
        console.log(error);})*/
    console.log(this.state.carts.user);  
    console.log(this.state.carts.subtotal);
    return this.state.books.map(currentbook => {
      return <Cart cart={currentbook} addToCart={this.addToCart} deleteBook={this.deleteBook} key={currentbook._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Shopping Cart</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            { this.bookList() }
          </tbody>
        </table>
      </div>
    )
  }
}

/*
import React, { Component } from 'react';

class Profile extends Component {
    render() {
        return(
            <div><h1> Profile </h1></div>
        )
    }
}

export default Profile;*/