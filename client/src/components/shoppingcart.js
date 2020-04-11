import React, { Component } from 'react';
import axios from 'axios';

const Book = props => (
  <tr>
    <td> 
      <img
      src = {props.book.image}
      width="100" height="175"
      />
    </td>
    <td>{props.book.title}</td>
    <td>{props.book.author}</td>
    <td>${props.book.price}</td>
    <td>{props.book.rating} Stars</td>
    <td>
    <button onClick={() => props.deleteBook(props.book._id)}>Remove from Cart</button>
    </td>
  </tr>
)

function axiosGet(Id){
  return axios.get('http://localhost:5000/books/' + Id)
  .then(response =>{ return response.data})
}

export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
    this.state = {cart:Object,subtotal: Number,books:[]};
  }

componentDidMount() {
    axios.get('http://localhost:5000/carts/')
      .then(response => {
        let array= [];
        for(let i=0;i<response.data[0].product.length;i++){
          array.push(response.data[0].product[i]);
        }

        let booksInTheCart = [];
        let quantityArray = [];
        for(let i=0;i < array.length;i++){
          quantityArray.push(array[i][1]);
          axiosGet(array[i][0]).then(data =>{
            booksInTheCart.push(Object(data));
            if(booksInTheCart.length == array.length){
          this.setState({cart: response.data[0],subtotal: response.data[0].subtotal, books: booksInTheCart});}
        }) 
      }
    })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBook(id) {
    axios.post('http://localhost:5000/carts/updateDelete/'+ this.state.cart._id + '/' +id)
      .then(response => { console.log(response.data)});
    this.setState({subtotal: this.state.cart.subtotal,books: this.state.books.filter(el => el._id !== id)})
  }

  bookList() {
    console.log(this.state.subtotal);
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} deleteBook={this.deleteBook} key={currentbook._id}/>;
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
            {this.bookList()}
          </tbody>
        </table>
    <h3>Subtotal: ${this.state.subtotal}.00</h3>
      </div>
    )
  }
}