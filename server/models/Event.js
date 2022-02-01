const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema(
  {
    eventText: {
      type: String,
      required: 'You need to leave a description!',
      minlength: 1,
      maxlength: 280
    },
    eventTitle: {
        type: String,
        required: 'You need to leave a title!',
        minlength: 1,
        maxlength: 50
    },
    startAddress: {
        type: String,
        required: 'You need to leave a start address!',
        minlength: 1,
        maxlength: 100
    },
    endAddress: {
        type: String,
        required: 'You need to leave a end address!',
        minlength: 1,
        maxlength: 100
    },
    runDate: {
        type: String,
        required: 'You need to leave the date of the event!',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
<<<<<<< HEAD
     username: {
       type: String,
       required: true
     },
     comments: [commentSchema]
   },
=======
    username: {
      type: String,
      required: true
    },
    donations: [{
      type: Schema.Types.ObjectId,
      ref: "Donation"
    }],
    attendees: [{
      type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema]
  },
>>>>>>> origin/reagan
  {
    toJSON: {
      getters: true
    }
  }
);

<<<<<<< HEAD
// eventSchema.virtual('commentCount').get(function() {
//   return this.comment.length;
// });
=======
eventSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

eventSchema.virtual('attendeeCount').get(function() {
  return this.attendees.length;
});
>>>>>>> origin/reagan

const Event = model('Event', eventSchema);

module.exports = Event;
