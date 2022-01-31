// typeDefs.js code
const { gql } = require('apollo-server-express');


const typeDefs = gql`

 type User {
     _id: ID
    username: String
    email: String
    attendeeCount: Int
    events: [Event]
    attendee: [User]
  }
 
type Event {
    _id: ID
    eventText: String
    eventTitle: String
    startAddress: String
    endAddress: String
    runDate: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
    donations: [Donation]
  }

  type Donation {
    _id: ID
    donationDate: String
    donation: Float
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(_id: ID!): Event
    checkout(donation: Float! event_id: ID!): Checkout
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(eventText: String!, eventTitle: String!, startAddress: String!,
    endAddress: String!, runDate: String!): Event
    addComment(eventId: ID!, commentBody: String!): Event
    addAttendee(attendeeId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Checkout {
  session: ID
}

type Donation {
     _id: ID
     purchaseDate: String
    #  event: [Event]
   }
`;


module.exports = typeDefs;


// type Query {
//     users: [User]
//     user(username: String!): User
//     events(username: String): [Event]
//     event(_id: ID!): Event
//     donation(_id: ID!): Donation
//   }
//   type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(username: String!, email: String!, password: String!): Auth
//     addEvent(eventText: String!, eventTitle: String!, startAddress: String!, endAddress: String!, runDate: String!): Event
//     updateEvent(eventText: String!, eventTitle: String!, startAddress: String!, endAddress: String!, runDate: String!): Event
//     deleteEvent(eventId: ID!): Event
//     addComment(eventId: ID!, commentBody: String!): Event
//     addAttendee(attendeeId: ID!): User
//   }
//   type Checkout {
//     session: ID
//   }
//   type Donation {
//     _id: ID
//     purchaseDate: String
//     event: [Event]
//   }
