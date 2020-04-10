import React,  { useState, useEffect } from "react";
import cover from "../images/hemingwayCover.jpg";
import "../styles/detailsComments.css";
import Comments from "./CommentSection/Comments";
import StarRating from "./CommentSection/StarRating";
import axios from "axios";

function DetailsComments(props) {

 const bookId = props.match.params.bookId
 const [Books, setBook] = useState([])
 
 const [CommentLists, setCommentLists] = useState([])

  const bookVariable = {
    bookId: bookId
  }

  useEffect(() => {
    axios.post('/api/comment/getComments', bookVariable)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.Books)
          setCommentLists(response.data.comments)
          
        }
      })
  })

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.push(newComment))
   }
   
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
          
      <Comments CommentLists={CommentLists} 
      postId={Books._id} refreshFunction={updateComment} />

       </div>
      </div>
    );
  }

  export default DetailsComments

