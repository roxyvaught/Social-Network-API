const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

  router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

  router
  .route('/:id')
  .delete(deleteThought)
  .get(getThoughtById)
  .put(updateThought);

  router
  .route('/:thoughtId/reactions')
  .post(createReaction);

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

  module.exports = router;