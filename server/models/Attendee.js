const { Schema } = require('mongoose');

const attendeeSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
  attending:{
      type: Boolean,
      default: false
  }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


module.exports = attendeeSchema;
