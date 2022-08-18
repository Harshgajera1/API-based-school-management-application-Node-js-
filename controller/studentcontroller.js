const { model } = require('mongoose');
const studentModel = require('../model/student');


module.exports.student = (req,res)=>{
    return res.json({"Student API's" : [{'Student Admission':'localhost:8000/student/admission'}, {"Student Show Records" : 'localhost:8000/student/showallstudent'}, {'Student Delete' : 'localhost:8000/student/deletestudent/id'},{'Student Update' : 'localhost:8000/student/updatestudent/id'},{'Single Student Details' : 'localhost:8000/student/singlestudent'} ]});
} 

module.exports.admission = async (req,res)=>{
    try {
        const checkData = await studentModel.findOne({email : req.body.email});
        // console.log(req.body);
        if(!checkData){
            if(req.body.gender == 'male' || req.body.gender == 'female' || req.body.gender == "Male" || req.body.gender == "Female"){
                const addData = await studentModel.create(req.body);
                if(addData){
                    return res.json({'Insert Record': addData});
                }
                else{
                    return res.json({'Message' : 'Record Not Inserted'});
                }
            } 
            else{
                return res.json({'Message' : 'Record Not Formatted'});
            }   
        }
        else{
            return res.json({'Message' : 'Record Already Register'});
        }
    } catch (error) {
        // console.log(error);
        return res.json({'Message' : "faculty_id is required || faculty_id is not valid"});
    }
}

module.exports.showAllStudent = async (req,res)=>{
    try {
        const data = await studentModel.find({},{"faculty_id":0,"__v":0});
        if(data){
            return res.json({'Student Details' : data});
        }
        else{
            return res.json({'Message' : 'Student Data Not Found'});
        }
    } catch (error) {
        console.log(error);
        return res.json({'Message' : 'Something Wrong'});
    }
}

module.exports.deleteStudent = async (req,res)=>{
    try {
        // console.log(req.params);
        const matchData = await studentModel.findById(req.params.id);
        if(matchData){
            const data = await studentModel.findByIdAndDelete(matchData.id);
            // console.log(data);
            return res.json({'Message' : 'Record Are Deleted'});
        }else{
            return res.json({'Message': 'Delete ID is Not Valid'})
        }
    } catch (error) {
        return res.json({'Message': 'Something Wrong'});
    }
}

module.exports.updateStudent = async (req,res)=>{
    try {
        // console.log(req.params);
        const checkData = await studentModel.findById(req.params.id);
        if(checkData){
            const data = await studentModel.findByIdAndUpdate(checkData.id,req.body);
            return res.json([{'Message' : 'Record are Updateted'},{'Show Single Record' : 'localhost:8000/student/singlestudent'}]);


            // if(req.body.gender == 'male' || req.body.gender == 'female' || req.body.gender == "Male" || req.body.gender == "Female"){
            //     const data = await studentModel.findByIdAndUpdate(checkData.id,req.body);
            //     return res.json([{'Message' : 'Record are Updateted'},{'Show Single Record' : 'localhost:8000/student/singlestudent'}]);
            // } 
            // else{
            //     return res.json({'Message' : 'Record Not Formatted'});
            // }
            
        }else{
            return res.json({'Message' : 'Record Not Updateted'});
        }
    } catch (error) {
        return res.json({'Message': 'Something Wrong'});
    }
}

module.exports.singleStudent = async (req,res)=>{
    try {
        const checkEmail = await studentModel.findOne({email: req.body.email},{"_id":0,"faculty_id" : 0,"__v":0});
        if(checkEmail){
            return res.json({'Student' : checkEmail});
        }else{
            return res.json({'Message' : 'Email Not Matched'});
        }
    } catch (error) {
        console.log(error);
        return res.json({'Message': 'Something Wrong'});
    }
}