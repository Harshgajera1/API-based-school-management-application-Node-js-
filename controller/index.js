const studentModel = require('../model/student');
const facultyModel = require('../model/faculty');

module.exports.home = (req,res)=>{
    return res.json({"API's" : [{
        'Admin' : 'localhost:8000/admin',
        "Student" : 'localhost:8000/student',
        "Faculty" : 'localhost:8000/faculty'
    }]});
}

module.exports.showAllDetails = async (req,res)=>{ 
    try {
        const studentData = await studentModel.find({});
        const facultyData = await facultyModel.find({});
        if(studentData ||  facultyData){
            return res.json({'Detalis' :[{'Student Details' : studentData},{'Faculty Data' : facultyData}]});
        }
        else{
            return res.json({'Message' : 'Record Not Found'});
        }
    } catch (error) {
        return res.json({'Message' : 'Something Wrong'});
    }
}