const adminmodel = require('../model/admin');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.admin = (req,res)=>{
     return res.json({"Admin API's" : [{'Admin Login': 'localhost:8000/admin/login'},{'Admin Register': 'localhost:8000/admin/register'},{'Admin Show Records' : 'localhost:8000/admin/adminalldata'}]});
}

module.exports.login = async (req,res)=>{
try {
    // console.log(req.body);
    const checkData = await adminmodel.findOne({email : req.body.email});
    if(checkData){
        // console.log(checkData);
        const passverify = await bcrypt.compare(req.body.password,checkData.password);
        if(passverify){
            const token = jsonWebToken.sign(checkData.toJSON(),'harshjwt',{expiresIn : 60*500});
            return res.json({'message' : 'Congratulation Your Login Successful',token});
        }
        else{
            return res.json({'Message' : 'Email Or Password Are Not Match'});
        }

    }else{
        return res.json({'Message' : 'Email Or Password Are Not Match, For New Registration Click Here localhost:8000/admin/register'});
    }
} catch (error) {
    console.log(error);
    return res.json({'Message' : 'Something Wrong'});
}
}

module.exports.register = async (req,res)=>{
    try {
        // console.log(req.body);
        // const veri = await bcrypt.compare(req.body.password,pass);
        const checkData = await adminmodel.findOne({email : req.body.email});
        if(!checkData){
            if(req.body.password == req.body.confirm_password){
                const passbcrypt = await bcrypt.hash(req.body.password, 10);
                const data = await adminmodel.create({
                    username : req.body.username,
                    email : req.body.email,
                    password : passbcrypt
                });
                return res.json({'Insert data' : data});
            }
            else{
                return res.json({'Message' : 'Password Or Confirm Password Are Not Match'});
            }
        }
        else{
            return res.json({"Message" : 'Email Are Ready Used'});
        }
    } catch (error) {
        console.log(error);
        return res.json({'message' : 'something wrong'});
    }   
}

module.exports.adminAllData = async (req,res)=>{
    try {
        const data = await adminmodel.find({});
        if(data){
            return res.json({'Admin Data' : data});
        }else{
            return res.json({'Message' :'Data Not Found'});
        }
    } catch (error) {
        // console.log(error);
        return res.json({'message' :'something wrong'});
    }
}


module.exports.deleteAdmin = async (req,res)=>{
    try {
        // console.log(req.params);
        const checkData = await adminmodel.findById(req.params.id);
        if(checkData){
            // console.log(checkData);
            const data = await adminmodel.findByIdAndDelete(checkData.id);
            if(data){
                return res.json({'Message' : 'Record Are Deleted'});
            }
            else{
                return res.json({'Message' : 'Record Not Deleted'});
            }
        }else{
            return res.json({'Message' :'Data Not Found'}); 
        }
    } catch (error) {
        return res.json({'message' :'something wrong'});
    }
}