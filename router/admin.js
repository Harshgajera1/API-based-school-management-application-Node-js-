const express = require('express');
const passport = require('passport');
const adminController = require('../controller/admincontroller');
const router = express.Router();

router.get('/',adminController.admin);

router.post('/login',adminController.login);

router.post('/register',adminController.register);

router.get('/adminalldata',passport.authenticate('jwt',{failureMessage : false}),adminController.adminAllData);

router.delete('/deleteadmin/:id',passport.authenticate('jwt',{failureMessage : false}),adminController.deleteAdmin);

module.exports = router;