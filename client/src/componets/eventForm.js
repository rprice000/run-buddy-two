import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';
import { Form, Button, Grid, Container } from 'semantic-ui-react'
// import Auth from '../utils/auth';
//  import { useNavigate } from 'react-router-dom'
// import { useHistory } from "react-router-dom";
import DelayLink from 'react-delay-link';




const EventForm = () => {
  const eventText = useRef();
  const eventTitle = useRef();
  const startAddress = useRef();
  const endAddress = useRef();
  const runDate = useRef();

  // const [eventText, setText] = useState('');
  // const [eventTitle, setText ] = useState('');
  // const [startAddress, setText ] = useState('');
  // const [endAddress, setText ] = useState('');
  // const [runDate, setText ] = useState('');

  // const user = Auth.getProfile();
  // console.log(user);
  
  

  const [characterCount, setCharacterCount] = useState(0);
  // const [addEvent, { error }] = useMutation(ADD_EVENT, {
    const [ addEvent ] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      console.log('addEvent', addEvent)
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const response = cache.readQuery({ query: QUERY_EVENTS });
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: response ? [addEvent, ...response.events] : [addEvent] },
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

      setCharacterCount(event.target.value.length);
    }
  };

  // const goHome = () => {
  //   let history = useNavigate();
  //      history.push('/home')
  // }

  const handleFormSubmit = async event => {
  
    console.log(event)
   
    try {

      // add thought to database
      await addEvent({
        variables: {
          eventText: eventText.current.value,
          eventTitle: eventTitle.current.value,
          startAddress: startAddress.current.value,
          endAddress: endAddress.current.value,
          runDate: runDate.current.value,
          commentCount: 0,
          comments: [],
          createdAt: new Date(),
        },
      });

      // clear form value
      // setText("");
      // goHome();

      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }

 
  };
 

  
  return (
    <div id="eventFormView">
      <h1 id="eventFormTitle"> New Event Form</h1>
      <Container>
    <Grid columns="three">
      <Grid.Row>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={10}>
          <Form>
            <Form.Field  >
              <label><div class="formInputDescriptions">Run Title</div></label>
              <input ref={eventTitle}
                placeholder="Run Title"

                // value={eventTitle}
                onChange={handleChange} />
            </Form.Field>

            <Form.Field >
              <label class="formInputDescriptions"><div class="formInputDescriptions">Date of Run</div></label>
              <input ref={runDate}
                placeholder="Date of Run" />
            </Form.Field>

            <Form.Field>
              <label class="formInputDescriptions"><div class="formInputDescriptions">Start Address</div></label>
              <input ref={startAddress} placeholder="Start Address" />
            </Form.Field>

            <Form.Field>
              <label class="formInputDescriptions"><div class="formInputDescriptions">End Address</div></label>
              <input ref={endAddress} placeholder="End Address" />
            </Form.Field>

            <textarea
              placeholder="Please describe your running event..."
              ref={eventText}
              onChange={handleChange}
            />
            <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
            <div class="formInputDescriptions">Character Count: {characterCount}/280</div>
              {/* {error && <span className="ml-2">Something went wrong...</span>} */}
            </p>
            <DelayLink delay={2000} to="/">
            <Button type="submit" onClick={handleFormSubmit}>
              {/* <Link to="/"> */}
              Submit
              {/* </Link> */}
            </Button>
            </DelayLink>
          </Form>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>
    </div>
  );
};

export default EventForm;