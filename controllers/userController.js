// ObjectId() method for converting UserId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

// TODO: Create an aggregate function to get the number of Users overall
const headCount = async () =>
  User.aggregate()
    // Your code here
    .then((numberOfUsers) => numberOfUsers);


module.exports = {
  // Get all Users
  getUser(req, res) {
    User.find()
      .then(async (Users) => {
        const UserObj = {
          Users,
          headCount: await headCount(),
        };
        return res.json(UserObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select("-__v")
      .lean()
      .then(async (User) =>
        !User
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json({
              User,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User and remove them from the User
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No such User exists" })
          : Thoughts.findOneAndUpdate(
              { User: req.params.UserId },
              { $pull: { User: req.params.UserId } },
              { new: true }
            )
      )
      .then((User) =>
        !User
          ? res.status(404).json({
              message: "User deleted, but no Users found",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};