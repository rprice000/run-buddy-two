// mutations.js code

import { gql } from '@apollo/client';


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent(
    $eventText: String!
    $eventTitle: String!
    $startAddress: String!
    $endAddress: String!
    $runDate: String!
    ) {
    addEvent(eventText: $eventText
       eventTitle: $eventTitle
       startAddress: $startAddress
       endAddress: $endAddress
       runDate: $runDate
       
       
    ) {
      _id
      eventText
      createdAt
      eventTitle
      startAddress
      endAddress
      runDate
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;


export const ADD_COMMENT = gql`
  mutation addComment($eventId: ID!, $commentBody: String!) {
    addComment(eventId: $eventId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

// export const UPDATE_COMMENT = gql`
//   mutation updateComment($commentId: ID!, $commentBody: String!) {
//     updateComment(commentId: $commentId, commentBody: $commentBody) {
//       _id
//       commentBody
//     }
//   }
// `;


export const ADD_ATTENDEE = gql`
  mutation addAttendee($eventId: ID!, $attending: Boolean) {
    addAttendee(eventId: $eventId, attending: $attending) {
      _id
      username
      attendeeCount
      attendees {
        _id
        username
      }
    }
  }
`;


export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;


export const REMOVE_EVENT = gql`
mutation removeEvent($eventId: ID!) {
  removeEvent(eventId: $eventId ) {
    _id
    username
    eventText
    eventTitle
    startAddress
    endAddress
    runDate
    comments {
      _id
        commentBody
        createdAt
        username
    }
  }
}
`;