// Home.js code
import React from "react";
import EventList from '../componets/eventList';
// import EventForm from '../componets/eventForm';
import { QUERY_EVENTS } from '../utils/queries';
//   NEED THIS IMPORT FOR ATTENDEES
// import { QUERY_EVENTS, QUERY_ME_BASIC } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Grid } from "semantic-ui-react";


const Home = () => {

  const { loading, data } = useQuery(QUERY_EVENTS);
  // MAY NEED THIS FOR DISPLAYING ATTENDEES
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  const events = data?.events || [];


    return (
      <main>
        <Grid columns="two">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <h3>Welcome to the app for drinkers with a running problem... </h3>
              <img src= "images/hash-image.png" alt="hash symbols" width="400" height="200"/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <h4> What is Running-On-Empty? </h4>
              <p>
                    Running-On-Empty can best be described as a scavenger hunt performed by a band of misfits looking to kill 
                    an afternoon and have a few drinks. A run starts at a single location 
                    (bar, garage, or local park) and a trail will be made with a batch of marks laid by the one (or two) individual(s). 
                    The marks on the ground will determine what happens at each point along the run. Runs are typically a distance from 2 to 4 miles (weather depending).
                    All running events are determined by the event creator.  To create an event users will need to create an account throught this app.
                    Feel free to spice things up such as making a theme for the run.
                    Below is a list of our current running events.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div>
          {/* {loggedIn && (
          <div>
            <EventForm />
          </div>
        )} */}
          <Grid columns="three">
            <Grid.Row>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <EventList events={events} title="List of Running Events" />
                  )}
                </div>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>

          {/* {loggedIn && userData ? (
          // <div className="col-12 col-lg-3 mb-3">
          //   <AttendeeList
          //     username={userData.me.username}
          //     attendeeCount={userData.me.attendeeCount}
          //     attendees={userData.me.attendees}
          //   />
          // </div>
        ) : null} */}
        </div>
      </main>
    );
  };
  
  export default Home;