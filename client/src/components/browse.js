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
          onClick={() =>
            props.addToWishList(props.book._id, "5e9255aeb8b7c05d48b070af")
          }
        >
          Add to Wish List
        </button>

        <button
          onClick={() => props.history.push(`/Comments?id=${props.book._id}`)}
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
    this.addToWishList = this.addToWishList.bind(this);

    this.BrowseGenreHorror = this.BrowseGenreHorror.bind(this);
    this.BrowseGenreClassic = this.BrowseGenreClassic.bind(this);
    this.BrowseGenreSCIFi = this.BrowseGenreSCIFi.bind(this);
    this.BrowsebyTopSellers = this.BrowsebyTopSellers.bind(this);

    this.ToggleSortbySubmission = this.ToggleSortbySubmission.bind(this);
    this.ToggleSortbyTitle = this.ToggleSortbyTitle.bind(this);
    this.ToggleSortbyAuthor = this.ToggleSortbyAuthor.bind(this);
    this.ToggleSortbyPrice = this.ToggleSortbyPrice.bind(this);
    this.ToggleSortbyRating = this.ToggleSortbyRating.bind(this);
    this.ToggleSortbyDate = this.ToggleSortbyDate.bind(this);

    this.state = { books: []};
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/books/")
      .then((response) => {
        this.setState({ books: response.data});
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

  addToWishList(id, wishId) {
    axios
      .post("http://localhost:5000/wishList/update/" + wishId + "/" + id)
      .then((res) => console.log(res.data));
  }

  BrowseGenreHorror() {
    axios
    .get("http://localhost:5000/books/")
    .then((response) => {
      this.setState({ books: response.data.filter((el) => el.genre.includes("Horror")) });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  BrowseGenreSCIFi(genre) {
    axios
    .get("http://localhost:5000/books/")
    .then((response) => {
      this.setState({ books: response.data.filter((el) => el.genre.includes("Science Fiction")) });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  BrowseGenreClassic(genre) {
    axios
    .get("http://localhost:5000/books/")
    .then((response) => {
      this.setState({ books: response.data.filter((el)=> el.genre.includes("Classic")) });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  BrowsebyTopSellers(genre) {
    axios
    .get("http://localhost:5000/books/")
    .then((response) => {
      this.setState({ books: response.data.filter((el) => el.topseller == true) });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  ToggleSortbyTitle(event){
    const {books} = this.state
    let newbooks = books
    this.setState({books: newbooks.sort((a,b) => a.title > b.title)});
  }

  ToggleSortbyAuthor(event){
    const {books} = this.state
    let newbooks = books
    this.setState({books: newbooks.sort((a,b) => a.author > b.author)});
  }

  ToggleSortbyPrice(event){
    const {books} = this.state
    let newbooks = books
    this.setState({books: newbooks.sort((a,b) => a.price > b.price)});
  }

  ToggleSortbyRating(event){
    const {books} = this.state
    let newbooks = books
    this.setState({books: newbooks.sort((a,b) => a.rating < b.rating)});
  }

  ToggleSortbyDate(event){
    const {books} = this.state
    let newbooks = books
    this.setState({books: newbooks.sort((a,b) => a.date > b.date)});
  }

  ToggleSortbySubmission(event){
    axios
    .get("http://localhost:5000/books/")
    .then((response) => {
      this.setState({books: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  bookList() {
    return this.state.books.map((currentbook) => {
      return (
        <Book
          key={currentbook._id}
          history={this.props.history}
          book={currentbook}
          addToCart={this.addToCart}
          addToWishList={this.addToWishList}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Books</h3>
        <button onClick={this.ToggleSortbySubmission}>All Books in Original Order</button>
        <h3>Browsing</h3>
        <button onClick={this.BrowseGenreHorror}>Genre: Horror</button>
        <button onClick={this.BrowseGenreClassic}>Genre: Classic</button>
        <button onClick={this.BrowseGenreSCIFi}>Genre: Science Fiction</button>
        <button onClick={this.BrowsebyTopSellers}>Top Sellers</button>

        <h3>Sorting</h3>
        <button onClick={this.ToggleSortbyTitle}>Sort by Title</button>
        <button onClick={this.ToggleSortbyAuthor}>Sort by Author</button>
        <button onClick={this.ToggleSortbyPrice}>Sort by Price</button>
        <button onClick={this.ToggleSortbyRating}>Sort by Rating</button>
        <button onClick={this.ToggleSortbyDate}>Sort by Date</button>

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