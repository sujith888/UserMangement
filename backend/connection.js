const mongoose = require('mongoose');

// establish connection
mongoose.connect('mongodb://0.0.0.0:27017/userMangement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports= {
  // create user model
   User :mongoose.model('User', userSchema),
}
