import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
// import Auth from '../utils/auth';
import CommentList from '../componets/commentList';
// import CommentForm from '../componets/commentForm';
import { useQuery, useMutation } from '@apollo/client';
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
            <p>{event.eventTitle}</p>
            <p>{event.eventText}</p>
            <p>{event.startAddress}</p>
            <p>{event.endAddress}</p>
            <p>{event.runDate}</p>
            {/* <p>{event.commentCount}</p> */}
            {/* <p>{event.eventText}</p> */}
            {/* attendees here */}
          </div>
          <div>
          <AttendeeList attendees={event.attendees} eventTitle={event.eventTitle}/>
          </div>
        </div>
      
  
        {event.commentCount > 0 && (
          <CommentList comments={event.comments} />
        )}
        {/* {Auth.loggedIn() && <CommentForm eventId={event._id} />} */}
      </div>
    );
  };
  
  export default SingleEvent;
  