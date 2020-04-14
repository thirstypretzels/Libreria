import React, {useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Form, Header } from "semantic-ui-react";
import SingleComment from './SingleComment';

function Comments(props) {
    const user = useSelector = (state => state.user)
    const [Comment, setComment] = useState("")


    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }

        axios.post('/api/comment/saveComment', variables)
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
            <React.Fragment>
              <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
           </React.Fragment>
            )

        ))}

        {/*root comment Form*/}

        <Form reply>
                <Form.TextArea
                  rows={6}
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