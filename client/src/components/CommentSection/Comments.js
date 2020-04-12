import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Form, Header } from "semantic-ui-react";
import SingleComment from './SingleComment';

function Comments(props) {

    const [user, setUser] = useState({
        nickName: "Julio Rodriguez",
        _id: "532BjKb12j3PJ6"
    });
    const [Comment, setComment] = useState("")
    
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            author: user.nickName,
            postId: props.postId
        }

        axios.post('/api/comment/', variables)
        .then(response=> {
            if(response.data.success) {
                setComment("")
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }
    return (
        <div>
        <Header as='h3' dividing> 
        Comments
        </Header>

        {console.log(props.CommentLists)}

        {props.CommentLists && props.CommentLists.map((comment, index) => (
            (!comment.responseTo &&
                <div>
                <Comment>
                    <Comment.Avatar 
                    src= {"data:image/jpeg;base64,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"}
                    alt= "image" />
                    <Comment.Content>
                      <Comment.Author>  {user.nickName}  </Comment.Author>
                      <Comment.Text>  {props.Comment}  </Comment.Text>
                     </Comment.Content>
                  </Comment>
            </div>
            )

        ))}

        {/*root comment Form*/}

        <Form reply>
                <Form.TextArea
                  rows={6}
                  onChange={handleChange}
                  value={Comment}
                  type='text'
                />
                <Button
                  content='Create Customer Review'
                  labelPostion='left'
                  icon='edit'
                  primary
                  onClick={onSubmit}
                />
              </Form>
          
              </div>
    )
}

export default Comments