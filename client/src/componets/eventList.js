import React from 'react';
// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery, useMutation } from '@apollo/client';
// import { DELETE_EVENT } from '../utils/mutations';
// import { QUERY_ME } from '../utils/queries';


const EventList = ({ events, title }) => {
  if (!events.length) {
    return <h3>No Events Yet</h3>;
  }

  
//  const [userData, setUserData] = useState({});
//   const { data }  = useQuery(QUERY_ME);

//  const [deleteEvent] = useMutation(DELETE_EVENT)

//  const userData = data?.me || {};

// //  const userDataLength = Object.keys(userData).length;


//  const handleDeleteEvent = async (eventId) => {
//    const token = Auth.loggedIn() ? Auth.getToken() : null;

//    if (!token) {
//      return false;
//    }

//    try {
//      await deleteEvent({
//        variables: { eventId }
//      });

//     //  deleteEventId(eventId);
//    } catch (err) {
//      console.error(err);
//    }
//  };
//  setUserData(userData);



  return (
    <div>
      <h3>{title}</h3>
      {events &&
        events.map(event => (
          <div key={event._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${event.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {event.username}
              </Link>{' '}
              event on {event.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/event/${event._id}`}>
                <p>{event.eventText}</p>
                {/* <Button onClick={() => handleDeleteEvent(event.eventId)}>Delete this Event!</Button> */}
                <p className="mb-0">
                  Comments: {event.commentCount} || Click to{' '}
                  {event.commentCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventList;