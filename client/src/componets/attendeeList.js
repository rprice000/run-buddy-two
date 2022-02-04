import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

const AttendeeList = ({ attendees }) => {
  if (!attendees || !attendees.length) {
    return <p>{attendees.length} attending!</p>;
  }


  return (
    <div>
      
      {attendees.map(attendee => (
        <Button key={attendee._id}>
          <Link to={`/profile/${attendee.username}`}>{attendee.username}</Link>
        </Button>
      ))}
    </div>
  );
};

    export default AttendeeList;