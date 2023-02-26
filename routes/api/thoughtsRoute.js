// const router = require("express").Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriends,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUser).post(createUser);

router.route("/:userId").get(getSingleUser).delete(deleteUser);

router.route("/:userId/friends").post(addFriends);

router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
