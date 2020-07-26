const { User } = require('../models');
const userController ={

  getAllUser(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  addFriend({ params }, res) {
    console.log("Adding a friend")
    console.log(params);
    User.findOneAndUpdate(
      {_id: params.userId},
      { $push: { friends: params.friendId }}
    )
    .then(dbFriend => {
      if (!dbFriend) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbFriend);
    })
    .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId }  },
        { new: true }
      )
        .then(dbFriendData => res.json(dbFriendData))
        .catch(err => res.json(err));
    }
}

module.exports = userController;