import React, { useState,useRef } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';
import { Form,Button, Grid } from 'semantic-ui-react'

const EventForm = () => {
  const eventText = useRef();
  const eventTitle = useRef();
  const startAddress = useRef();
  const endAddress = useRef();
  const runDate = useRef();

 
    
  const [characterCount, setCharacterCount] = useState(0);
  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        // const { events } = cache.readQuery({ query: QUERY_EVENTS });
        // cache.writeQuery({
        //   query: QUERY_EVENTS,
        //   data: { events: [addEvent, ...events] },
        cache.updateQuery({ query: QUERY_EVENTS }, (data) => ({
          events: data.events.map((...events) => {
            return ({ addEvent, ...events, completed: true });
          })
        }));
        cache.updateQuery({ query: QUERY_ME }, (data) => ({
          me: data.me.map((...me) => ({ ...me.events, completed: true }))
        }));
         
      
      }

      catch (e) {
        console.error(e);
      }
    }
  })
        // update me object's cache, appending new thought to the end of the array
      //   const {me } = cache.readQuery({ query: QUERY_ME });
      //   cache.writeQuery({
      //     query: QUERY_ME,
      //     data: { me: { ...me, events: [...me.events, addEvent] } },
          
      //   });
      //   console.log(me)
       
  
  

    

    const handleChange = event => {
        if (event.target.value.length <= 280) {
     
          setCharacterCount(event.target.value.length);
        }
      };

      const handleFormSubmit = async event => {
        console.log(event)

        try {
     
          // add thought to database
          await addEvent({
            variables: {     eventText: eventText.current.value,
              eventTitle: eventTitle.current.value,
              startAddress: startAddress.current.value,
              endAddress: endAddress.current.value,
              runDate: runDate.current.value,
              createdAt: new Date()
         },
          });

          // clear form value
        
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
            <Form.Field  >
              <label>Run Title</label>
              <input  ref={eventTitle}
                placeholder="Run Title"
                
              // value={eventTitle}
              onChange={handleChange} />
            </Form.Field>

            <Form.Field >
              <label>Date of Run</label>
              <input ref={runDate}
                placeholder="Date of Run" />
            </Form.Field>

            <Form.Field>
              <label>Start Address</label>
              <input ref= {startAddress} placeholder="Start Address" />
            </Form.Field>

            <Form.Field>
              <label>End Address</label>
              <input ref={endAddress}placeholder="End Address" />
            </Form.Field>
            
            <textarea
              placeholder="Please describe your running event..."
              ref={eventText}
              onChange={handleChange}
            />
            <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
              Character Count: {characterCount}/280
              {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <Button type="submit" onClick={handleFormSubmit}>
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