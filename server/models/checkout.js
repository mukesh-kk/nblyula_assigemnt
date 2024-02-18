const mongoose = require('mongoose');

const checkoutSchema=mongoose.Schema({
    "eventtype":{
        type:String,
        enum:['checkout','return'],
    },
    "book_id":{
        type:Number
    },
    "member_id":{
        type:Number
    },
    "date":{
        type:String
    }

},{timestamp:true});

const Checkout = mongoose.model('checkouts',checkoutSchema);
module.exports = Checkout;