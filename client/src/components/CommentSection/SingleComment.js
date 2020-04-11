import React from 'react'
import { Comment } from 'semantic-ui-react'

function SingleComment(props) {
    return (
        <div>
            <Comment>
                <Comment.Avatar 
                src= {props.Comment.writer.image}
                alt= "image" />
                <Comment.Content>
                  <Comment.Author>
                   {props.comment.writer.nickName}  
                   </Comment.Author>
                  <Comment.Text>  {props.comment.content}  </Comment.Text>
                 </Comment.Content>
              </Comment>
        </div>
    )
}

export default SingleComment
