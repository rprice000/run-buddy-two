import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react'

const AttendeeList = ({ attendees }) => {
  if (!attendees || !attendees.length) {
    return <p>{attendees.length} attending!</p>;
  }

  return (
    <Grid>
      <Grid.Column></Grid.Column>
      <Grid.Column>
        {attendees.map((attendee) => (
          <div id="attendList">
            <Button key={attendee._id}>
            <Link to={`/profile/${attendee.username}`}>
              {attendee.username}
            </Link>
          </Button>
          </div>
        ))}
      </Grid.Column>
      <Grid.Column></Grid.Column>
    </Grid>
  );
};

    export default AttendeeList;