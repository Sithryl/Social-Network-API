const { Thoughts, User } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((Thoughtss) => res.json(Thoughtss))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thoughts
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.ThoughtsId })
      .select('-__v')
      .then((Thoughts) =>
        !Thoughts
          ? res.status(404).json({ message: 'No Thoughts with that ID' })
          : res.json(Thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thoughts
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.ThoughtsId })
      .then((Thoughts) =>
        !Thoughts
          ? res.status(404).json({ message: 'No Thoughts with that ID' })
          : User.deleteMany({ _id: { $in: Thoughts.Users } })
      )
      .then(() => res.json({ message: 'Thoughts and Users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thoughts
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.ThoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thoughts) =>
        !Thoughts
          ? res.status(404).json({ message: 'No Thoughts with this id!' })
          : res.json(Thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
