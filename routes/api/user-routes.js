const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteFriend,
    deleteUser
  } = require('../../controllers/user-controller');
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);


router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;