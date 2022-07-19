const express = require('express')


const blogController = require('../controller/blogController')
const commentController = require('../controller/commentController')

const router = express.Router()

//for unauthorised access
router.post('/:id/createcomment',commentController.create_comment)
router.get("/:id",blogController.get_one_blog)
router.get('/',blogController.get_blogs)

module.exports = router