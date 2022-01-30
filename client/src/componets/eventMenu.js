import { useStoreContext } from "../utils/globalState";
const [state, dispatch] = useStoreContext();
import React, { useEffect } from 'react';
import { UPDATE_EVENTS, UPDATE_CURRENT_EVENT } from '../utils/actions.js';
const { events } = state;

const { data: eventData } = useQuery(QUERY_EVENTS);
const [state, dispatch] = useStoreContext();

const { events } = state;

const { data: eventData } = useQuery(QUERY_EVENT);
const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_EVENT,
      currentCategory: id
    });
  };
useEffect(() => {
  // if categoryData exists or has changed from the response of useQuery, then run dispatch()
  if (eventData) {
    // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
    dispatch({
      type: UPDATE_EVENTS,
      categories: categoryEvent.events
    });
  }
}, [eventData, dispatch]);
return (
    <div>
      <h2>Events</h2>
      {event.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );

