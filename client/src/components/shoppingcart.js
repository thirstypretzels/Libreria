import React, { Component, Fragment } from 'react';
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
    <button onClick={() => props.deleteBook(props.book._id)} >Remove from Cart</button>
    </td>
    <td>
    <button onClick={() => props.saveForLater(props.book._id)}>Save for Later</button>
    </td>
      <label for="quantity">Quantity:</label>
      <input type="text" id="quantity" name="quantity" placeholder="1" pattern="[0-9]{1}" size="1"></input>
      <input type="submit" value="Submit"></input>
  </tr>
)

const Book1 = props => (
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
    <button onClick={() => props.deleteSavedBook(props.book._id)}>Remove from Saved List</button>
    </td>
    <td>
    <button onClick={() => props.saveToCart(props.book._id)}>Save to Cart</button>
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
    this.deleteSavedBook = this.deleteSavedBook.bind(this);
    this.saveForLater = this.saveForLater.bind(this);
    this.saveToCart = this.saveToCart.bind(this);
    this.state = {cart:Object,subtotal: Number,books:[],save4Later:[]};
  }

componentDidMount() {
    axios.get('http://localhost:5000/carts/')
      .then(response => {
        console.log(response.data[0]);
        let array= [];

        let arraySave=[];
        for(let i=0;i<response.data[0].product.length;i++){
          array.push(response.data[0].product[i]);
          
        }        
        for(let i=0;i<response.data[0].save4L8r.length;i++){
          if(response.data[0].save4L8r[i] !== undefined){
          arraySave.push(response.data[0].save4L8r[i]);
        }
      }
        let booksInTheCart = [];
        let saveArray = [];
        if(array.length > 0){
        for(let i=0;i < array.length;i++){
          axiosGet(array[i][0]).then(data =>{
            booksInTheCart.push(Object(data));
            if(booksInTheCart.length === array.length){
            this.setState({cart: response.data[0],subtotal: response.data[0].subtotal, books: booksInTheCart});
          }
          if(i === array.length-1){
          for(let i=0;i < arraySave.length;i++){
            axiosGet(arraySave[i]).then(save=>{
              saveArray.push(Object(save));
              if(saveArray.length === arraySave.length){
              this.setState({cart: this.state.cart,subtotal: this.state.subtotal, books: this.state.books, save4Later: saveArray});}
          })
        }} 
        })
      }}

      else{
        console.log("harry");
        for(let i=0;i < arraySave.length;i++){
          axiosGet(arraySave[i]).then(save=>{
            saveArray.push(Object(save));
            if(saveArray.length === arraySave.length){
            this.setState({cart: response.data[0],subtotal: response.data[0].subtotal, books: this.state.books, save4Later: saveArray});}
        })
      }
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
    window.location.reload();
  }

  saveForLater(id){
    axios.post('http://localhost:5000/carts/updateSaveForLater/'+ this.state.cart._id + '/' +id)
      .then(response => { console.log(response.data)});
    this.setState({subtotal: this.state.cart.subtotal,books: this.state.books.filter(el => el._id !== id)})
    window.location.reload();
  }

  bookList() {
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} deleteBook={this.deleteBook} saveForLater={this.saveForLater} key={currentbook._id}/>;
    })
  }

  saveForLaterList() {
    return this.state.save4Later.map(currentbook => {
      return <Book1 book={currentbook} deleteSavedBook={this.deleteSavedBook} saveToCart={this.saveToCart} key={currentbook._id}/>;
    })
  }

  saveToCart(id) {
          axios.post('http://localhost:5000/carts/update/' + this.state.cart._id + '/' + id)
          .then(res => console.log(res.data));

          axios.post('http://localhost:5000/carts/updateDeleteSaveForLater/'+ this.state.cart._id + '/' +id)
      .then(response => { console.log(response.data)});
    this.setState({save4Later: this.state.save4Later.filter(el => el !== id)});
    window.location.reload();
  }

  deleteSavedBook(id){
    console.log(this.state.cart._id);
    axios.post('http://localhost:5000/carts/updateDeleteSaveForLater/'+ this.state.cart._id + '/' +id)
      .then(response => { console.log(response.data)});
    this.setState({save4Later: this.state.save4Later.filter(el => el !== id)});
    window.location.reload();
  }
  render() {
    return (
      <html>
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
    <h3> Subtotal: ${this.state.subtotal}.00 </h3>
    <h3></h3>
    <h3>Save For Later</h3>
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
                {this.saveForLaterList()}
              </tbody>
            </table>
      </div>
      </html>
    )
  }
}