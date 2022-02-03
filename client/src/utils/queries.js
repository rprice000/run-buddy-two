// queries.js code

import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      events {
        _id
        eventText
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    #   friendCount
      events {
        _id
        username
        eventTitle
        eventText
        createdAt
        startAddress
        endAddress
        runDate
        commentCount
        comments {
          _id
        }
        # username {
        #   _id
        #   createdAt
        #   commentBody
        #   username
        # }
      }
    #   friends {
    #     _id
    #     username
    #   }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    #   friendCount
    #   friends {
    #     _id
    #     username
    #   }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query events($username: String) {
    events(username: $username) {
      _id
      eventTitle
        eventText
        createdAt
        startAddress
        endAddress
        runDate
        username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;


export const QUERY_EVENT = gql`
  query event($id: ID!) {
    event(_id: $id) {
      _id
      eventText
      eventTitle
      startAddress
      endAddress
      runDate
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
      attendeeCount
         attendees {
           _id
           username
           attending
       }
    }
  }
`;