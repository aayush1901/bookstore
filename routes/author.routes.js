const express = require('express');
const router = express.Router();

const control = require('../controller/author.controller');


router.get('/', control.getAllAuthors);
router.get('/:id',control.getAuthorsById);
router.post('/',control.createAuthor);
router.delete('/:id',control.deleteAuthor);

module.exports = router;