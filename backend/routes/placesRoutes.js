const express = require("express");
const router = express.Router();
require("dotenv").config();
const  placesController = require('../controllers/placesController')
const { upload } = require("../s3");
const { isAuthorize } = require("../middleware/auth");
const { createPlacesValidation } = require("../helpers/validation");

router.post('/create-places',upload.single('image'),createPlacesValidation,isAuthorize, placesController.createPlaces)
router.get('/get-places-id/:id', placesController.getPlacesById);
router.get('/get-all-places/', placesController.getAllPlaces);
router.post('/update-places',createPlacesValidation,isAuthorize,placesController.updatePlaces)
router.get('/delete-places/:id',isAuthorize,placesController.deletePlaces);

module.exports = router;