const express = require('express')
const verifyToken = require('../config/verifyToken')

const blogController = require('../controller/blogController')

const router = express.Router()

router.post("/createblog",verifyToken,blogController.create_blog)
router.put('/:id/update',verifyToken,blogController.update_blog)
router.get('/:id/delete',verifyToken,blogController.delete_blog)
router.get('/:id/updatevisibility',verifyToken,blogController.update_visibility)
router.get("/:id/getdetail",verifyToken,blogController.get_one_blog)
router.get('/user',verifyToken,blogController.get_user_blogs)

//unauthorised access
router.get('/',blogController.get_blogs)
router.get("/:id/one",blogController.get_one_blog_un)

module.exports = router