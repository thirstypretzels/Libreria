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
