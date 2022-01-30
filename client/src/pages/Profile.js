import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
// import EventForm from '../components/EventForm';
// import EventList from '../components/EventList';
// import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = (props) => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
      });

    // const user = data?.me || data?.user || {};
    // redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Redirect to="/profile" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   console.log(user);
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }
  
    return (
      <div>
      NOT HELLO WORLD!!!!
      </div>
    );
  };
  
  export default Profile;
  