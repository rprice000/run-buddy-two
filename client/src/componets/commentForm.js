import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import { Button, Form } from 'semantic-ui-react'

const CommentForm = ({ eventId }) => {
    const [commentBody, setBody] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = (event) => {
      if (event.target.value.length <= 280) {
        setBody(event.target.value);
        setCharacterCount(event.target.value.length);
      }
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      try {
        await addComment({
          variables: { commentBody, eventId },
        });

        // clear form value
        setBody("");
        setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    };

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Leave a comment to this event!!"
          value={commentBody}
          onChange={handleChange}
        ></textarea>
        <div id="commentSubmitButton">
        <Button type="submit">Submit</Button>
        </div>
        <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        <div class="commentDescriptions">Character Count: {characterCount}/280</div>
        {error && <span>Something went wrong...</span>}
      </p>
       
      </Form>
      {error && <div class="commentDescriptions">Something went wrong...</div>}
   
    </div>
  );
};

export default CommentForm;