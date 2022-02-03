import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
// import EventForm from '../components/EventForm';
import EventList from '../componets/eventList';
import Auth from '../utils/auth';
import { useQuery} from '@apollo/client';
// import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
// import { QUERY_USER, QUERY_ME, QUERY_ME_BASIC } from '../utils/queries';
// import { QUERY_USER, QUERY_ME, QUERY_ME_BASIC, QUERY_EVENT } from '../utils/queries';
// import { DELETE_EVENT } from '../utils/mutations';

const Profile = (props) => {
    const { username: userParam } = useParams();
    console.log(userParam);

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
      });
  // const { loading, data } = useQuery(QUERY_ME_BASIC);
    const user = data?.user || data?.me || {};
    console.log(data)
    console.log(user)
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
      <div>
        <h2>
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        {/* {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )} */}
      </div>

      <div>
        <div>
          <EventList
            events={user.events}
            title={`${user.username}'s events...`}
          />
        </div>

        {/* <div>
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div> */}
      </div>
      {/* <div className="mb-3">{!userParam && <ThoughtForm />}</div> */}
    </div>
    );
  };
  
  export default Profile;
  