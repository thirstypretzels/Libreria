import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import Details from "../components/detailsComments";

const Book = (props) => {
  console.log(props);
  return (
    <tr>
      <td>
        <img src={props.book.image} width='100' height='175' />
      </td>
      <td>{props.book.title}</td>
      <td>{props.book.author}</td>
      <td>${props.book.price}</td>
      <td>{props.book.rating} Stars</td>
      <td>
        <button
          onClick={() =>
            props.addToCart(props.book._id, "5e8e1ada937b9612e0966c35")
          }
        >
          Add to Cart
        </button>
        <button
          onClick={() => props.history.push(`/Comments/${props.book._id}`)}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

//addToCart(props.book._id,5e8e1ada937b9612e0966c35)
export default class BooksList extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);

    this.state = { books: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/books/")
      .then((response) => {
        this.setState({ books: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.props);
  }

  addToCart(id, cartId) {
    axios
      .post("http://localhost:5000/carts/update/" + cartId + "/" + id)
      .then((res) => console.log(res.data));
  }

  deleteBook(id) {
    axios.delete("http://localhost:5000/books/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      books: this.state.books.filter((el) => el._id !== id),
    });
  }

  bookList() {
    return this.state.books.map((currentbook) => {
      return (
        <Book
          history={this.props.history}
          book={currentbook}
          addToCart={this.addToCart}
          deleteBook={this.deleteBook}
          key={currentbook._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Books</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{this.bookList()}</tbody>
        </table>
      </div>
    );
  }
}
