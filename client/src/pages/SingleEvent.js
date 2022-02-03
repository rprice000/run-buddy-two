import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import CommentList from '../componets/commentList';
import { useQuery, useMutation } from '@apollo/client';
import CommentForm from '../componets/commentForm';
import { QUERY_EVENT } from '../utils/queries';
import AttendeeList from '../componets/attendeeList';
import { ADD_ATTENDEE } from '../utils/mutations';



const SingleEvent = (props) => {
 
  const [disable, setDisable] = useState(false);
  const [addAttendee] = useMutation(ADD_ATTENDEE);

    const { id: eventId } = useParams();
  
    const { loading, data } = useQuery(QUERY_EVENT, {
      variables: { id: eventId },
    });
  
    const event = data?.event || {};
  
    if (loading) {
      return <div>Loading...</div>;
    }
    const handleClick = async () => {
      try {
        setDisable(true)
        await addAttendee({
          variables: { eventId: eventId, attending:true }
        });
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <div>
        {!disable? (
         <button  onClick={handleClick}>
    Attending Event
  </button>
        ): (
          <p>You are attending this event!</p>
        )}
        <div>
          <p>
            <span>{event.username}</span>
            <br></br>{' '}
            Event Created On: {event.createdAt}
          </p>
          <div>
            <p>Run Event Title: {event.eventTitle}</p>
            <p>Start Address: {event.startAddress}</p>
            <p>End Address: {event.endAddress}</p>
            <p>Run Date: {event.runDate}</p>
            <p>Run Event Description: {event.eventText}</p>
            <p>Comment Count: {event.commentCount}</p>
            {/* attendees here */}
          </div>
          <div>
          <AttendeeList attendees={event.attendees} eventTitle={event.eventTitle}/>
          </div>
        </div>
      
  
        {event.commentCount > 0 && (
          <CommentList comments={event.comments} />
        )}
        {Auth.loggedIn() && <CommentForm eventId={event._id} />}
      </div>
    );
  };
  
  export default SingleEvent;
  