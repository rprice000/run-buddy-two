import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';
import { Form, TextArea, Button, Grid } from 'semantic-ui-react'

const EventForm = () => {

    const [eventText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addEvent, { error }] = useMutation(ADD_EVENT, {
      update(cache, { data: { addEvent } }) {
        try {
          // could potentially not exist yet, so wrap in a try...catch
          const { events } = cache.readQuery({ query: QUERY_EVENTS });
          cache.writeQuery({
            query: QUERY_EVENTS,
            data: { events: [addEvent, ...events] },
          });
        } catch (e) {
          console.error(e);
        }

        // update me object's cache, appending new thought to the end of the array
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, events: [...me.events, addEvent] } },
        });
      },
    });


    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

      const handleFormSubmit = async event => {
        event.preventDefault();

        try {
          // add thought to database
          await addEvent({
            variables: { eventText },
          });

          // clear form value
          setText("");
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
          <Form>
            <Form.Field onSubmit={handleFormSubmit}>
              <label>Run Title</label>
              <input placeholder="Run Title" />
            </Form.Field>

            <Form.Field onSubmit={handleFormSubmit}>
              <label>Date of Run</label>
              <input placeholder="Date of Run" />
            </Form.Field>

            <Form.Field onSubmit={handleFormSubmit}>
              <label>Start Address</label>
              <input placeholder="Start Address" />
            </Form.Field>

            <Form.Field onSubmit={handleFormSubmit}>
              <label>End Address</label>
              <input placeholder="End Address" />
            </Form.Field>
            
            <TextArea
              placeholder="Please describe your running event..."
              value={eventText}
              className="form-input col-12 col-md-9"
              onChange={handleChange}
            />
            <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
              Character Count: {characterCount}/280
              {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <Button className="btn col-12 col-md-3" type="submit">
              Submit
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default EventForm;