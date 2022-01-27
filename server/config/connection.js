// connection code
<<<<<<< HEAD
=======
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/running-on-empty', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  
});

module.exports = mongoose.connection;
>>>>>>> 32c066d8ebcafd14b0af396fd02c66e013bcd68e
