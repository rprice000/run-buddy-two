import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import CommentList from '../componets/commentList';
import { useQuery, useMutation } from '@apollo/client';
import CommentForm from '../componets/commentForm';
import { QUERY_EVENT } from '../utils/queries';
import AttendeeList from '../componets/attendeeList';
import { ADD_ATTENDEE } from '../utils/mutations';
import { Container, Grid, Card, Button } from 'semantic-ui-react'



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
      setDisable(true);
      await addAttendee({
        variables: { eventId: eventId, attending: true },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="singleEventView">
      <Container>
      <Grid columns={3}>
      <Grid.Row>
      <Grid.Column width={5}>
      {!disable ? (
        <div id="attendingEventButton">
          <Button onClick={handleClick}>Attending Event</Button>
        </div>
      ) : (
        <p>You are attending this event!</p>
      )}
      <div ID="attendingEventList">
        <AttendeeList
          attendees={event.attendees}
          eventTitle={event.eventTitle}
        />
      </div>
      </Grid.Column>
      <Grid.Column width={6}>
      
        <Card id="displayedEvent">
          <h2 class="singleEventDescriptions">
            <span>{event.username}</span>
            <br></br>
          </h2>
          <h4 class="singleEventDescriptions">Run Date: {event.runDate}</h4>

          <h2 class="singleEventDescriptions">{event.eventTitle}</h2>
          <p class="singleEventDescriptions">
            Start Address: {event.startAddress}
          </p>
          <p class="singleEventDescriptions">End Address: {event.endAddress}</p>
          {/* <p>Run Date: {event.runDate}</p> */}
          <p class="singleEventDescriptions">
            Run Event Description: {event.eventText}
          </p>
          {/* <p class="singleEventDescriptions">
                  Comment Count: {event.commentCount}
                </p> */}
          <p class="singleEventDescriptions">Comments:({event.commentCount})</p>
          {/* attendees here */}
        </Card>

        {/* <Container>
          <AttendeeList
            attendees={event.attendees}
            eventTitle={event.eventTitle}
          />
        </Container> */}
      

      {event.commentCount > 0 && <CommentList comments={event.comments} />}

      {Auth.loggedIn() && <CommentForm eventId={event._id} />}
      </Grid.Column>
      <Grid.Column width={5}></Grid.Column>
      </Grid.Row>
      </Grid>
      </Container>
    </div>
  );
};
  
  export default SingleEvent;
  