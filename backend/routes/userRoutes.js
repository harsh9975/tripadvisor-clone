const express = require("express");
const router = express.Router();
require("dotenv").config();
const {signUpValidation, loginValidation, forgetValidation, resetPassValidation, updateProfileValidation} = require('../helpers/validation');
const  userController = require('../controllers/userController')
const { upload } = require("../s3");
const { isAuthorize } = require("../middleware/auth");

//authentication routes.
router.post('/register',upload.single('image'),signUpValidation, userController.register)
router.post('/login',loginValidation,userController.login);
router.post('/reset-password',resetPassValidation,userController.resetPassword);
router.get('/profile',isAuthorize,userController.getProfile)
router.post('/forgot-password',forgetValidation,userController.forgotPassword);
router.post('/update-profile',upload.single('image'),updateProfileValidation,isAuthorize,userController.updateProfile)
router.get('/get-all-users',isAuthorize,userController.getAllUsers)

module.exports = router;