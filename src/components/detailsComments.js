import React, { Component } from "react";
import { Comment, CommentGroup, Button, Form, Header } from "semantic-ui-react";
import cover from "../images/hemingwayCover.jpg";
import "../styles/detailsComments.css";
import StarRating from "./StarRating";

class Comments extends Component {
  render() {
    return (
      <div className='parent'>
        {/* Image */}
        <img className='left-image' src={cover} alt='bookcover' />
        {/* First Details Page*/}
        <div className='details'>
          <h1 className='title'>The Old Man and the Sea</h1>
          <a className='authorPage' href='../components/authorPage.js'>
            by Ernest Hemingway
          </a>
          <div className='container'>
            <h3 className='info'>
              Published 1996 by Scribner (first published 1951)
            </h3>
          </div>
          <div className='container'>
            <h3 className='info'>
              This short novel, already a modern classic, is the superbly told,
              tragic story of a Cuban fisherman in the Gulf Stream and the giant
              Marlin he kills and loses — specifically referred to in the
              citation accompanying the author's Nobel Prize for literature in
              1954.
            </h3>
          </div>
          {/* Genres List */}
          <div className='container'>
            <h5>Genres</h5>
            <ul className='genreList'>
              <li>Classic</li>
              <li>Fiction</li>
              <li>Hero's Journey</li>
              <li>Tragedy</li>
            </ul>
          </div>
        </div>
        {/* <div className='separator'></div> */}
        <div className='details'>
          <h1>
            <StarRating></StarRating>
          </h1>
          <Header as='h3' dividing>
            Comments
          </Header>

          <div className='container'>
            <CommentGroup className='info'>
              <Comment>
                <Comment.Avatar src='https://www.asiatripdeals.com/wp-content/uploads/2019/03/Anonymous-Avatar.png' />
                <Comment.Content>
                  <Comment.Author>Anonymous</Comment.Author>
                  <Comment.Metadata>an hour ago</Comment.Metadata>
                  <Comment.Text>This book is amazing!</Comment.Text>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar src='https://www.asiatripdeals.com/wp-content/uploads/2019/03/Anonymous-Avatar.png' />
                <Comment.Content>
                  <Comment.Author>Anonymous</Comment.Author>
                  <Comment.Metadata>2 days ago</Comment.Metadata>
                  <Comment.Text>This book is spectacular!</Comment.Text>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Content>
              </Comment>

              <Form reply>
                <Form.TextArea />
                <Button
                  content='Add Comment'
                  labelPostion='left'
                  icon='edit'
                  primary
                />
              </Form>
            </CommentGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
