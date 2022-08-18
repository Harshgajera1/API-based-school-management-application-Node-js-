const facultyModel = require('../model/faculty');
const bcrypt = require('bcryptjs');

module.exports.faculty = (req,res)=>{
    return res.json({"Faculty API's" : [{"Faculty Register" : 'localhost:8000/faculty/register'},{"Faculty Show Records" : 'localhost:8000/faculty/showfaculty'}, {'Delete Faculty' : 'localhost:8000/faculty/deletefaculty/id'},{'Update Faculty' : 'localhost:8000/faculty/updatefaculty/id'},{'Faculty Single Record' : 'localhost:8000/faculty/singlefaculty'}]});
} 

module.exports.register = async (req,res)=>{
    try {
        // console.log(req.body);
        const checkData = await facultyModel.findOne({email : req.body.email});
        if(!checkData){
            if(req.body.password == req.body.confirm_password){
                const passbcrypt = await bcrypt.hash(req.body.password, 10);
                const data = await facultyModel.create({
                    name : req.body.name,
                    email : req.body.email,
                    password : passbcrypt,
                    subject : req.body.subject,
                    salary  :req.body.salary
                });
                return res.json({'Insert data' : data});
            }
            else{
                return res.json({'Message' : 'Password Or Confirm Password Are Not Match'});
            }
        }
        else{
            return res.json({'Message' : 'Record Are Already Register'});
        }
    } catch (error) {
        // console.log(error);
        return res.json({'Message' : 'Something Wrong'});
    }
}


module.exports.showFaculty = async (req,res)=>{
    try {
        const data = await facultyModel.find({},{"password":0,"__v":0});
        if(data){
            return res.json({"Faculty Details" : data});
        }else{
            return res.json({'Message' : 'Record Not Found'});
        }
    } catch (error) {
        return res.json({'Message' : 'Something Wrong'});
    }
}

module.exports.deleteFaculty = async(req,res)=>{
    try {
        // console.log(req.params);
        const checkData = await facultyModel.findById(req.params.id);
        if(checkData){
            const data = await facultyModel.findByIdAndDelete(checkData.id);
            if(data){
                return res.json({'Message' : 'Record Are Deleted'});
            }
            else{
                return res.json({'Message' : 'Record Not Deleted'});
            }
        }else{
           return res.json({'Message' : 'Delete ID Not Valid'}); 
        }
    } catch (error) {
        return res.json({'Message' : 'Something Wrong'});
    }
}

module.exports.updateFaculty = async (req,res)=>{
    try {
        // console.log(req.params);
        const checkData = await facultyModel.findById(req.params.id);
        if(checkData){
            const passbcrypt = await bcrypt.hash(req.body.password, 10);
            const data = await facultyModel.findByIdAndUpdate(checkData.id,{
                name : req.body.name,
                email : req.body.email,
                password : passbcrypt,
                subject : req.body.subject,
                salary  :req.body.salary
            });
            return res.json({'Message' : 'Record Are Updated'});
        }else{
            return res.json({'Message' : 'Update ID Not Valid'});
        }
    
    } catch (error) {
        return res.json({'Message' : 'Something Wrong'});
    }
}

module.exports.singleFaculty = async (req,res)=>{
   try {
        const checkData = await facultyModel.findOne({email: req.body.email});
        // console.log(checkData);
        if(checkData){
            const passVerify = await bcrypt.compare(req.body.password,checkData.password);
            // console.log(passVerify);
            if(passVerify){
                const data = await facultyModel.findById(checkData.id,{"_id":0,"__v":0,"password":0});
                return res.json({'Faculty Details' : data});
            }
            else{
                return res.json({'Message' : 'Record Not Found'});
            }
        }else{
            return res.json({'Message' : 'Record Not Found'});
        }
   } catch (error) {
    return res.json({'Message' : 'Something Wrong'});
   }
}