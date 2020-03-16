import React, { Component } from "react";
import { Comment, CommentGroup, Button, Form, Header } from "semantic-ui-react";

class Comments extends Component {
  render() {
    return (
      <div class='image'>
        <img
          src='https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-7-CRC.png'
          alt='bookcover'
          className='book-img'
        />

        <h2>
          <span>Book Details GO HERE</span>
        </h2>
        <h1>StarRating</h1>
        <Header as='h3' dividing>
          Comments
        </Header>

        <CommentGroup>
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
    );
  }
}

export default Comments;
