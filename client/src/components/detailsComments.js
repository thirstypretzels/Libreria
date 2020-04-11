import React, { useState, useEffect } from "react";
import cover from "../images/hemingwayCover.jpg";
import "../styles/detailsComments.css";
import Comments from "./CommentSection/Comments";
import StarRating from "./CommentSection/StarRating";
import axios from "axios";

function DetailsComments(props) {
  const bookId = props.match.params.bookId;
  const [Books, setBook] = useState([]);

  const [CommentLists, setCommentLists] = useState([]);

  const bookVariable = {
    bookId: bookId,
  };

  useEffect(() => {
    axios.post("/api/comment/getComments", bookVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.Books);
        setCommentLists(response.data.comments);
      }
    });
  });

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.push(newComment));
  };

  return (
    <div className='parent'>
      {/* Image */}
      <img className='left-image' src={cover} alt='bookcover' />
      {/* First Details Page*/}
      <div className='details'>
        <h1 className='title'>{props.title}</h1>
        <a className='authorPage' href='../components/authorPage.js'>
          {props.author}
        </a>
        <div className='container'>
          <h3 className='info'>{props.publisher}</h3>
        </div>
        <div className='container'>
          <h3 className='info'>{props.description}</h3>
        </div>
        <div className='container'>
          <h3 className='info'>{props.genre}</h3>
        </div>
      </div>
      {/* <div className='separator'></div> */}
      <div className='details'>
        <h1>
          <StarRating></StarRating>
        </h1>

        <Comments
          CommentLists={CommentLists}
          postId={Books._id}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}

export default DetailsComments;
