import React from 'react';
import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { UPDATE_COMMENT } from '../utils/mutations'
import { Container } from 'semantic-ui-react'

const CommentList = ({ comments }) => {
  // const [updateComment] = useMutation(UPDATE_COMMENT);

  // const handleChange = async (event) => {
  //   event.preventDefault();

  // //   try {
  // //     await updateComment({
  // //       variables: { commentBody }
  // //     });
  // //   }
  // //   catch (e) {
  // //     console.error(e)
  // //   }
  // // };


  return (
    <Container>
      {/* <div>
        <span class="commentText">Comments</span>
      </div> */}
      <div>
        {comments &&
          comments.map(comment => (
            <p key={comment._id}>
              <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
               <div class="commentText"> {comment.username} on {comment.createdAt}</div>
              </Link>
              <br></br>
              <div class="commentText">{comment.commentBody}</div>
            </p>
          ))}
      </div>
    </Container>
  );
};

export default CommentList;
