import React, { Component } from "react";

class Wish extends Component {
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
      </div>
    );
  }
}

export default Wish;
