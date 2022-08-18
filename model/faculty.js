const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    name  :{
        type  :String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    salary :{
        type : Number,
        required : true
    }
});

const facultyModel = mongoose.model('faculty',facultySchema);

module.exports = facultyModel;