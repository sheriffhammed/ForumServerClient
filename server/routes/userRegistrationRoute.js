const express = require('express')
const router = express.Router()

//const {addCategory} = require('../controllers/categoriesController')
const userRegistrationController = require('../controllers/userRegistrationController')
router.route('/')
    .post(userRegistrationController.handleUserRegisteration)
    .get(userRegistrationController.allUsers)

router.route('/:id')
    .put(userRegistrationController.updateUser)
    .get(userRegistrationController.retreiveUser)

router.route('/update/userbyemail')
    .put(userRegistrationController.updateUserByEmail)

router.route('/get/userbyemail')
    .get(userRegistrationController.getUserByEmail)
    
module.exports = router