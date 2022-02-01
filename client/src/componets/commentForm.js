import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import { Button, Form, Grid } from "semantic-ui-react";

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
    <Grid columns="three">
      <Grid.Row>
      <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={10}>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <Form onSubmit={handleFormSubmit}>
        
        <textarea
          placeholder="Leave a comment to this event!!"
          value={commentBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <Button type="submit">Submit</Button>
      </Form>

      {error && <div>Something went wrong...</div>}
      </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CommentForm;