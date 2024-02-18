const mongoose = require('mongoose');

const memberSchema=mongoose.Schema({
    "MemberID":{
        type:Number
    },
    "MemberName":{
        type:String
    },

},{timestamp:true});

const Member = mongoose.model('members',memberSchema);
module.exports = Member;