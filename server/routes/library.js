const express = require('express');
const libraryRouter= express.Router();
const {getBook,issueBook,returnBook,getOverDuesAndFine} = require('../controllers/library');

libraryRouter.get('/books',getBook);
libraryRouter.post('/checkout',issueBook);
libraryRouter.post('/return',returnBook);
libraryRouter.get('/getdues',getOverDuesAndFine);


module.exports=libraryRouter