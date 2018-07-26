const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    email : {
        type : String ,
        unique : true,
        trim :true,
        minLength : 9,
        required : true
    },

    password : {
        type : String ,
        minLength : 6,
        required : true
    }

});


module.exports = mongoose.model('users',user);