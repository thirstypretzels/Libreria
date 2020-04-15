import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Form, Header } from "semantic-ui-react";
import SingleComment from './SingleComment';

function Comments(props) {

    const [Comment, setComment] = useState("")
    
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            isPurchased: true,
            postId: props.postId
        }

        axios.post(`http://localhost:5000/comment/saveComment`, variables)
        .then(response=> {
            if(response.data.success) {
                setComment("");
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }
    return (
        <div>
        

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
                  onChange={handleChange}
                  value={Comment}
                  type='text'
                  maxlength='130'
                  style={{width: '600px', borderRadius:'5px'}}
                />
                <Button
                  content='Create Customer Review'
                  labelPostion='left'
                  icon='edit'
                  primary
                  onClick={onSubmit}
                />
                <Button
                  content='Post Anonymously'
                  labelPostion='right'
                  icon='edit'
                  primary
                  onClick={onSubmit}
                />
              </Form>
          
              </div>
    )
}

export default Comments