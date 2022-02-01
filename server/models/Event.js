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
     username: {
       type: String,
       required: true
     },
     comments: [commentSchema]
   },
  {
    toJSON: {
      getters: true
    }
  }
);

// eventSchema.virtual('commentCount').get(function() {
//   return this.comment.length;
// });

const Event = model('Event', eventSchema);

module.exports = Event;
