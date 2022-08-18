const express = require('express');
const router = express.Router();
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt',{failureMessage : false});

const studentController = require('../controller/studentcontroller');

router.get('/',studentController.student);

router.post('/admission',jwtAuth,studentController.admission);

router.get('/showallstudent',jwtAuth,studentController.showAllStudent);

router.delete('/deletestudent/:id',jwtAuth,studentController.deleteStudent);

router.patch('/updatestudent/:id',jwtAuth,studentController.updateStudent);

router.post('/singlestudent',jwtAuth,studentController.singleStudent);

module.exports = router;