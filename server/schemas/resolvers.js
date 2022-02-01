// resolvers.js code
const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('events')
          .populate('attendees');
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    events: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Event.find(params).sort({ createdAt: -1 });
    },
    event: async (parent, { _id }) => {
      return Event.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('attendee')
        .populate('event');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('attendee')
        .populate('event');
    },

    checkout: async (parent, args, context) => {
      const order = new Order({ donations: args.donations });
      const { donations } = await order.populate('donations').execPopulate();
    }
  },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return { token, user };
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },
      addEvent: async (parent, args, context) => {
        if (context.user) {
          const event = await Event.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { events: event._id } },
            { new: true }
          );
      
          return event;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addComment: async (parent, { eventId, commentBody }, context) => {
        if (context.user) {
          const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId },
            { $push: { comments: { commentBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
      
          return updatedEvent;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addAttendee: async (parent, { attendeeId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { attendee: attendeeId } },
            { new: true }
          ).populate('attendee');
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      }
      
    }
  };




// updateEvent: async (parent, args, context) => {
//   if (context.user) {
//     return await User.findByIdAndUpdate(context.user._id, args, { new: true });
//   }

// },



// deleteEvent: async (parent, args, context) => {
//   if (context.user) {
//     const event = await User.findByIdAndUpdate(
//       { _id: context.user._id },
//       { $pull: { events:  args.event._id  }},
//       { new: true }
//     );
//     return event;
//   }
//   throw new AuthenticationError('You need to be logged in!');
// },

// addComment: async (parent, { eventId, commentBody }, context) => {
//   if (context.user) {
//     const updatedEvent = await Event.findOneAndUpdate(
//       { _id: eventId },
//       { $push: { comments: { commentBody, username: context.user.username } } },
//       { new: true, runValidators: true }
//     );

//     return updatedEvent;
//   }

//   throw new AuthenticationError('You need to be logged in!');
// },

// addAttendee: async (parent, { attendeeId }, context) => {
//   if (context.user) {
//     const updatedEvent = await User.findOneAndUpdate(
//       { _id: context.user._id },
//       { $addToSet: { attendees: attendeeId } },
//       { new: true }
//     ).populate('attendees');

//     return updatedEvent;
//   }

//   throw new AuthenticationError('You need to be logged in!');
// }

//   deleteEvent: async (parent, args, context) => {
//     if(context.user) {
//     const event = await User.findOneAndDelete({ ...args, username: context.user.username });

//       { _id: context.user._id },
//       { $pull: { events: args.event._id } },
//       { new: true }
//     );

//     return event;
//     }

//     throw new AuthenticationError('You need to be logged in!');
// },



//   saveBook: async (parent, args, context) => {
//     if (context.user) {


//      const updatedUser =  await User.findByIdAndUpdate(
//         { _id: context.user._id },
//         { $addToSet: { savedBooks: args.input } },
//         { new: true }
//       );

//     return updatedUser;
//     }

//     throw new AuthenticationError('You need to be logged in!');
// },

// updateProduct: async (parent, { _id, quantity }) => {
//   const decrement = Math.abs(quantity) * -1;

//   return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
//   },






// },
// };

module.exports = resolvers;
