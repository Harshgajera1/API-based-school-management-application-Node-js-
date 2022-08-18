const express = require('express');
const facultyController = require('../controller/facultycontroller');
const facultyModel = require('../model/faculty');
const passport = require('passport');

const router =  express.Router();
const jwtAuth = passport.authenticate('jwt',{failureMessage : false})

router.get('/',facultyController.faculty);

router.post('/register',jwtAuth,facultyController.register);

router.get('/Showfaculty',jwtAuth,facultyController.showFaculty);

router.delete('/deletefaculty/:id',jwtAuth,facultyController.deleteFaculty);

router.patch('/updatefaculty/:id',jwtAuth,facultyController.updateFaculty);

router.post('/singlefaculty',jwtAuth,facultyController.singleFaculty);

module.exports = router;