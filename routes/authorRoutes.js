const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.post('/authors', authorController.createAuthor);
router.get('/authors', authorController.getAuthors);
router.get('/authors/:id', authorController.getAuthorByID);
router.put('/authors/:id', authorController.updateAuthor);
router.delete('/authors/:id', authorController.deleteAuthor);

module.exports = router;
