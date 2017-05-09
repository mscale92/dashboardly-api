const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const bookmarksController = express.Router();

  // Modify a bookmark
  bookmarksController.patch('/:id', onlyLoggedIn, (req, res) => {

    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.users_id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));

    // TODO: this is up to you to implement :)
    // res.status(500).json({ error: 'not implemented' });
  });


  // Delete a bookmark
  bookmarksController.delete('/:id', onlyLoggedIn, (req, res) => {
    // TODO: this is up to you to implement :)
    res.status(500).json({ error: 'not implemented' });
  });

  return bookmarksController;
};
