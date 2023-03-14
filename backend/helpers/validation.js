const {check} = require("express-validator");

exports.signUpValidation = [
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password','Password is required').isLength({min:6}),
    // check('image').custom((value,{req})=>{
    //     if(req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload image type png or jpeg')
]

exports.loginValidation = [
    check('email','Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password','Password is required').isLength({min:6}),
]

exports.forgetValidation = [
    check('email','Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
]

exports.resetPassValidation = [
    check('token','Token is required').not().isEmpty(),
    check('password','Password is required').isLength({min:6}),
    check('confirm_password','Re enter password')
]

exports.updateProfileValidation = [
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
]

exports.createPlacesValidation = [
    check('placesName','Place Name is required').not().isEmpty(),
    check('desc','Description is required').not().isEmpty(),
    check('details','Details Name is required').not().isEmpty(),
]