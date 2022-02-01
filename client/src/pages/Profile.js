import React from 'react';
import { Redirect, useParams } from 'react-router-dom';//
//import { Link } from "react-router-dom";
//import { Grid, Menu } from 'semantic-ui-react'
import EventForm from '../componets/eventForm';
import EventList from '../componets/eventList';
import Auth from '../utils/auth';
import {useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_EVENT } from '../utils/queries';

const Profile = (props) => {
    const { username: userParam } = useParams();

    const { loading,data } = useQuery(userParam ? QUERY_USER : QUERY_EVENT, {
        variables: { username: userParam },
      });

    const user = data?.me || data?.user || {};
    // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    console.log(user);
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  
  return (
    <div>
      <div className="">
        <h2 className="">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        
      </div>

      <div className="">
        <div className="">
          <EventList
            events={user.events}
            title={`${user.username}'s events`}
          />
        </div>

        {/* <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div> */}
      </div>
      <div className="">{!userParam && <EventForm />}</div>
    </div>
  );
};

  
  export default Profile;
  