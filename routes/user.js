const express = require('express')

const userController = require('../controller/userController')
const router = express.Router()

//user contoller
router.post('/login',userController.login_user)
router.get('/logout',userController.logout_user)
router.post('/signup', userController.signup_user)


module.exports = router