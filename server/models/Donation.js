// need to add model for order in resolvers
const mongoose = require('mongoose');

const { Schema } = mongoose;

const donationSchema = new Schema({
  donationDate: {
    type: Date,
    default: Date.now
  },
  donation:
    {
      type: Number,
    }
  
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
