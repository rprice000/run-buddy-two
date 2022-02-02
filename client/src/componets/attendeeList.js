import React from 'react';
import { Link } from 'react-router-dom';


const AttendeeList = ({ attendees }) => {
  if (!attendees || !attendees.length) {
    return <p>{attendees.length} attending!</p>;
  }

//   function removeDups(attendees) {
//     let unique = {};
//     attendees.forEach(function(i) {
//       if(!unique[i]) {
//         unique[i] = true;
//       }
//     });
//     return Object.keys(unique);
//   }
  
//   removeDups(attendees);

  return (
    <div>
      
      {attendees.map(attendee => (
        <button key={attendee._id}>
          <Link to={`/profile/${attendee.username}`}>{attendee.username}</Link>
        </button>
      ))}
    </div>
  );
};

    export default AttendeeList;