import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_COMMENT } from '../utils/mutations'

const CommentList = ({ comments }) => {
  const [commentBody, setBody] = useState();
  const [updateComment] = useMutation(UPDATE_COMMENT);

  const handleChange = async (event) => {
    event.preventDefault();

    try {
      await updateComment({
        variables: { commentBody }
      });
    }
    catch (e) {
      console.error(e)
    }
  };


  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Comments</span>
      </div>
      <div className="card-body">
        {comments &&
          comments.map(comment => (
            <p className="pill mb-3" key={comment._id}>
              {comment.commentBody} {'// '}
              <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
                {comment.username} on {comment.createdAt}
              </Link>
              <button onClick={handleChange}>Edit Comment</button>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
