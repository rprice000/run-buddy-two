import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteEvent';
import { Card, Container, Grid  } from 'semantic-ui-react'



const EventList = ({ events, title }) => {
  
  if (!events.length) {
    return <h3>No Events Yet</h3>;
  }

  return (
    <Container>
      
    <h1 id="eventListTitle">{title}</h1>
    <Grid>
    <Grid.Column width={2}>
    </Grid.Column>
    <Grid.Column width={13}>
    <Card.Group>
      {events &&
        events.map(event => (
          <Card id="cardItem" key={event._id}>
              <Link to={`/profile/${event.username}`} style={{ fontWeight: 700 }}>
                <h3 class="cardText">Created By: {event.username}</h3>
              </Link>
              <br></br>
              <Card.Content>
              <div class="cardText">Event Created On: {event.createdAt}</div>
              <Link to={`/event/${event._id}`}>
                <Card.Description><div class="cardText">{event.eventTitle}</div></Card.Description>
                <p class="cardText">
                  Comments: {event.commentCount} || Click to{' '}
                  {event.commentCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
              <DeleteButton eventId={event._id} />
              </Card.Content>
          </Card>
              // <DeleteButton eventId={event._id} />
          //   </div>
          // </div>
        ))}
    </Card.Group>
    </Grid.Column>
    <Grid.Column width={1}>
    </Grid.Column>
    </Grid>
    </Container>
  );
};

export default EventList;