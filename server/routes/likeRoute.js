const express = require('express')
const router = express.Router()

const likeController = require('../controllers/likeController')
router.route('/')
    .post(likeController.addLike)
    .get(likeController.allLikes)

router.route('/:id')
    .delete(likeController.deleteLike)
    //.get(likeController.selectLikesByPostId)
    
module.exports = router