const mongoose = require('mongoose');
require('dotenv').config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connection established with DB');
  } catch (err) {
    console.log('Something went wrong with DB Connection')
  }
}

module.exports = connection;
