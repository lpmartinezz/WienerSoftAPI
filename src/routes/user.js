const express = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();
const salt = 10;

// get all user
router.get("/users", async (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

});

// get a user
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

});

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

// update user
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { userName, firstName, lastName, country, departament, estate, city, address, phone, birthdate, email } = req.body;
  userSchema
    .updateOne({_id: id}, { $set: { userName, firstName, lastName, country, departament, estate, city, address, phone, birthdate, email} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

});

// delete user
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

});

module.exports = router;