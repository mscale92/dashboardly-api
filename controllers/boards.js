const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const boardsController = express.Router();

  // Retrieve a list of boards
  boardsController.get('/', (req, res) => {
    dataLoader.getAllBoards({
      page: req.query.page,
      limit: req.query.count
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
  });


  // Retrieve a single board
  boardsController.get('/:id', (req, res) => {
    dataLoader.getSingleBoard(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
  });


  // Create a new board
  boardsController.post('/', onlyLoggedIn, (req, res) => {
    dataLoader.createBoard({
      ownerId: req.user.users_id,
      title: req.body.title,
      description: req.body.description
    })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json(err));
  });


  // Modify an owned board
  boardsController.patch('/:id', onlyLoggedIn, (req, res) => {
    // First check if the board to be PATCHed belongs to the user making the request
    dataLoader.boardBelongsToUser(req.params.id, req.user.users_id)
    .then(() => {
      return dataLoader.updateBoard(req.params.id, {
        title: req.body.title,
        description: req.body.description
      });
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
  });


  // Delete an owned board
  boardsController.delete('/:id', onlyLoggedIn, (req, res) => {
    // First check if the board to be DELETEd belongs to the user making the request
    dataLoader.boardBelongsToUser(req.params.id, req.user.users_id)
    .then(() => {
      return dataLoader.deleteBoard(req.params.id);
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(400).json(err));
  });


  // Retrieve all the bookmarks for a single board
  boardsController.get('/:id/bookmarks', (req, res) => {
    // TODO: this is up to you to implement :)
    res.status(500).json({ error: 'not implemented' });
  });

  // Create a new bookmark under a board
  boardsController.post('/:id/bookmarks', onlyLoggedIn, (req, res) => {
    // TODO: this is up to you to implement :)
    res.status(500).json({ error: 'not implemented' });
  });

  return boardsController;
};
