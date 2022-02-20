const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/User';

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connected :)');
  });

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  full_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_picture: {
    type: String,
    required: true,
  },
  cv_file: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', fileSchema);

module.exports = User;
