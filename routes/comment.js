const express = require('express')
const verifyToken = require('../config/verifyToken')

const commentController = require('../controller/commentController')

const router = express.Router()

router.post('/:id/createusercomment',verifyToken,commentController.create_user_comment)

//unauthorised access
router.post('/:id/createcomment',commentController.create_comment)

module.exports = router