const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Mongoose is connected!!!');
  } catch (error) {
    console.log('Connect failure!!!');
  }
}

module.exports = { connect };
