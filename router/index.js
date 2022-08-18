const express = require('express');
const homeController = require('../controller');
const passport = require('passport');

const router = express.Router();

router.get('/',homeController.home);

router.get('/showstudentandfaculty',passport.authenticate('jwt',{failureMessage : false}),homeController.showAllDetails);


router.use('/admin',require('./admin'));
router.use('/student',require('./student'));
router.use('/faculty',require('./faculty'));


module.exports = router;