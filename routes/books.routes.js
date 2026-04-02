const express = require('express');
const control = require('../controller/book.controller');
const router = express.Router();


router.get('/',control.getAllBooks);
router.get('/:id',control.getBookById);
router.post('/',control.createBook);
router.delete('/:id',control.deleteBookbyId);

module.exports = router;