const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
      type: String,
      required: [true,'The UserName is mandatory.']
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
      type: String,
      required: [true,'The Last Name is mandatory.']
  },
  country: String,
  departament: String,
  estate: String,
  city: String,
  address: String,
  phone: {
    type: String,
    required: [true,'The Phone is mandatory.']
  },
  birthdate: Date,
  email: {
    type: String,
    required: true

  },
  password: String
});

module.exports = mongoose.model('User', userSchema);