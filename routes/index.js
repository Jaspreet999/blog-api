const express = require('express')

const userController = require('../controller/userController')
const blogController = require('../controller/blogController')
const commentController = require('../controller/commentController')

const router = express.Router()

//user contoller
//router.post('/login', userController.login_user)
router.get('/logout',userController.logout_user)
router.post('/signup', userController.signup_user)

//blog controller
router.post("/createblog",blogController.create_blog)
router.put('/blog/:id/update',blogController.update_blog)

//for unauthorised access
router.post('/blogs/:id/createcomment',commentController.create_comment)
router.get("/blogs/:id",blogController.get_one_blog)
router.get('/blogs',blogController.get_blogs)

module.exports = router