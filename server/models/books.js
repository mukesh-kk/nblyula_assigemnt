const mongoose = require('mongoose');

const bookSchema=mongoose.Schema({
    "BookID":{
        type:Number
    },
    "BookName":{
        type:String
    },
    "NumberOfCopies":{
        type:Number
    },

},{timestamp:true});

const Book = mongoose.model('books',bookSchema);
module.exports = Book;