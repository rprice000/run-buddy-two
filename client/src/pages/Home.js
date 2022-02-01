// Home.js code
import React from "react";
import EventList from '../componets/eventList';
import EventForm from '../componets/eventForm';
import Auth from '../utils/auth';
import { QUERY_EVENTS, QUERY_ME_BASIC } from '../utils/queries';
import { useQuery } from '@apollo/client';
import AttendeeList from"../componets/attendeeList"
const Home = () => {

  const { loading, data } = useQuery(QUERY_EVENTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const events = data?.events || [];

  const loggedIn = Auth.loggedIn();





    return (
      <main>
       Hello World
       <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <EventForm />
          
          </div>
        )}

        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EventList
              events={events}
              title="Add some Events..."
                />
          
          )}
        </div>
      
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <AttendeeList
              username={userData.me.username}
              attendeeCount={userData.me.friendCount}
              attendee={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
      
    );
  };
  
  export default Home;