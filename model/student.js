const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    gender  :{
        type : String,
        required : true
    },
    course  :{
        type  :String,
        required  :true
    },
    fees : {
        type : Number,
        required : true
    },
    date  :{
        type  :Date,
        required  :true
    },
    faculty_id : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'faculty'
    }
});

const studentModel = mongoose.model('student',studentSchema);

module.exports = studentModel;