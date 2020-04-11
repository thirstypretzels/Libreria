import React, { Component } from "react";
import axios from "axios";

const WishLists = (props) => (
  <tr>
    <td>{props.title}</td>
    <td>{props.author}</td>
    <td>${props.price}</td>
    <td>
      <button
        onClick={() =>
          props.addToCart(props.book._id, "5e8e1ada937b9612e0966c35")
        }
      >
        Add to Cart
      </button>
    </td>
    <td>
      <button onClick={() => props.deleteBook(props.book._id)}>
        Remove from Cart
      </button>
    </td>
  </tr>
);

function axiosGet(Id) {
  return axios.get("http://localhost:5000/books/" + Id).then((response) => {
    return response.data;
  });
}

export default class Wish_List extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.state = { wishItems: Object, books: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/carts/")
      .then((response) => {
        let array = [];
        for (let i = 0; i < response.data[0].product.length; i++) {
          array.push(response.data[0].product[i]);
        }

        let booksInTheList = [];
        let quantityArray = [];
        for (let i = 0; i < array.length; i++) {
          quantityArray.push(array[i][1]);
          axiosGet(array[i][0]).then((data) => {
            booksInTheList.push(Object(data));
            if (booksInTheList.length == array.length) {
              this.setState({
                wishItems: response.data[0],
                books: booksInTheList,
              });
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart(id, cartId) {
    axios
      .post("http://localhost:5000/carts/update/" + cartId + "/" + id)
      .then((res) => console.log(res.data));
  }

  deleteBook(id) {
    axios
      .post(
        "http://localhost:5000/carts/updateDelete/" +
          this.state.wishItems._id +
          "/" +
          id
      )
      .then((response) => {
        console.log(response.data);
      });
    this.setState({
      books: this.state.books.filter((el) => el._id !== id),
    });
  }

  bookList() {
    console.log(this.state.subtotal);
    return this.state.books.map((currentbook) => {
      return <WishLists book={currentbook} key={currentbook._id} />;
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Wish List</h1>

        <p>
          <form>
            <input placeholder="Create New List. (Max is 3)" />
            <button>Create New List</button>
          </form>
        </p>
        <div>
          <select>
            <option>Main List</option>
            <option>Personal List</option>
          </select>
          <button>Submit</button>
        </div>

        <p>
          <input placeholder="Change List Name" />
          <button>Rename</button>
          <button>Delete</button>
        </p>
        <div>
          <h3>Wish Lists</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{this.bookList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
