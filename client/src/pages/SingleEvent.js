import React from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import CommentList from '../componets/commentList';
import CommentForm from '../componets/commentForm';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../utils/queries';


const SingleEvent = (props) => {
    const { id: eventId } = useParams();
  
    const { loading, data } = useQuery(QUERY_EVENT, {
      variables: { id: eventId },
    });
  
    const event = data?.event || {};
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
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
        </div>
  
        {event.commentCount > 0 && (
          <CommentList comments={event.comments} />
        )}
        {Auth.loggedIn() && <CommentForm eventId={event._id} />}
      </div>
    );
  };
  
  export default SingleEvent;
  