import React, { useState, useEffect } from "react";
import "../styles/detailsComments.css";
import Comments from "./CommentSection/Comments";
import StarRating from "./CommentSection/StarRating";
import axios from "axios";

function DetailsComments(props) {
  const bookId = props.match.params.id;
  const [Book, setBook] = useState([]);
  const [Info, setInfo] = useState({
    title: "Title",
    author: "Author",
    image: "Image",
    publisher: "Publisher",
    description: "Description",
    genre: "Genre",
  });

  const [CommentLists, setCommentLists] = useState([]);

  const bookVariable = {
    bookId: bookId,
  };

  console.log(bookId);

  useEffect(() => {
    // axios.post("/api/comment/getComments", bookVariable).then((response) => {
    //   if (response.data.success) {
    //     setBook(response.data.Book);
    //     setCommentLists(response.data.comments);
    //   }
    // });
    axios.get(`http://localhost:5000/books/${bookId}`).then((data) => {
      setInfo(data.data);
    });
  }, []);
  console.log(Info);
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.push(newComment));
  };

  return (
    <div className='parent'>
      {/* Image */}
      {/* <img className='left-image' src={props.book.image} alt='bookcover' /> */}
      {/* First Details Page*/}
      <div className='details'>
        <h1 className='title'>{Info.title}</h1>
        <a className='authorPage' href='../components/authorPage.js'>
          {Info.author}
        </a>
        <div className='container'>
          <h3 className='info'>{Info.publisher}</h3>
        </div>
        <div className='container'>
          <h3 className='info'>{Info.description}</h3>
        </div>
        <div className='container'>
          <h3 className='info'>{Info.genre}</h3>
        </div>
      </div>
      {/* <div className='separator'></div> */}
      {/* <div className='details'>
        <h1>
          <StarRating></StarRating>
        </h1>

        <Comments
          CommentLists={CommentLists}
          postId={Book._id}
          refreshFunction={updateComment}
        />
      </div> */}
    </div>
  );
}

export default DetailsComments;
