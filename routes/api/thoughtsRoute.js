const router = require("express").Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  deleteThoughts,
  addFriends,
  removeFriend,
} = require("../../controllers/ThoughtsController");

// /api/Thoughts
router.route("/").get(getThoughts).post(createThoughts);

router.route("/:ThoughtsId").get(getSingleThoughts).delete(deleteThoughts);

// router.route("/:ThoughtsId/friends").post(addFriends);

// router.route("/:ThoughtsId/friends/:friendId").delete(removeFriend);

module.exports = router;
