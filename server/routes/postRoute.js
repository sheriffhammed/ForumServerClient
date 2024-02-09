const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')
router.route('/')
    .post(postController.addPost)
    .get(postController.allPosts)

router.route('/get/alllikespost')
    .get(postController.allLikesPosts)

//router.get('get/alllikespost', postController.allLikesPosts)

router.route('/:id')
    .put(postController.updatePost)
    .delete(postController.deletePost)
    
module.exports = router