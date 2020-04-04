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
  </tr>
)

export default class BooksList extends Component {
  constructor(props) {
    super(props);

    //this.deleteBook = this.deleteBook.bind(this)

    this.state = {books: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/books/')
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  /*deleteBook(id) {
    axios.delete('http://localhost:5000/books/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        books: this.state.books.filter(el => el._id !== id)
    })
  }*/

  bookList() {
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} /*deleteBook={this.deleteBook}*/ key={currentbook._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Books</h3>
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