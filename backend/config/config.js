require('dotenv').config()
const Travel = require('../models/Travel'); // Travel model

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.log("error connected to db");
    console.error(err.message);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
