// queries.js code

import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    #   attendeeCount
    #   friends {
    #     _id
    #     username
    #   }
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
        eventText
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentBody
          username
        }
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
      eventText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
      
      #   attendees {
      #     _id
      #     usernamattendeeCounte
      # }
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
      # attendeeCount
      #   attendees {
      #     _id
      #      username
      # }
    }
  }
`;