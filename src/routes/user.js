const express = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();
const salt = 10;

// create user
router.post("/users", async (req, res) => {

    // creating a new mongoose doc from user data
    const user = userSchema(req.body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set the user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    user
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  
});

module.exports = router;