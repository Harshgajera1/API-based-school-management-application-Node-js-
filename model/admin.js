const mongoose = require('mongoose');

const adminschema = mongoose.Schema({
    username : {
        type  : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password  :{
        type : String,
        required  :true
    }
});

const adminmodel = mongoose.model('admin',adminschema);

module.exports = adminmodel;