const db = require('../models')
const Post = db.Post
const User = db.User
const Like = db.Like
const Validator = require("fastest-validator")

//Add Like
const addLike = async (req, res) => {
    try {
        const data = {
            userId: req.body.userId,
            postId: req.body.postId
                       
        }
        //User Validations
        // const validatorData = new Validator();

        // const schema = {
        //     userId: {type: "number", integer: true, positive: true},
        //     postId: {type: "number", integer: true, positive: true}
                       
        // };

        // const check = validatorData.compile(schema);
        // if (check(data) !== true) {
        //     //return res.status(400).json({ errors: check(data) })
        //     return res.status(400).json({ message:"Validation Errors",errors:check(data) })

        // }
        
        //Create New Post
        const like = await Like.create(data)
        if (res.status(201) && like) {
            res.status(201).json({
                message: "Like added successfully",
                post:data
            })
        } else {
            return res.status(404).json({
                message: "Error Occured!!! Post Could not be added"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Like could not be added - Something went wrong",
            error: error.message
            })
    }
}

//Retreive All Likes
const allLikes = async(req, res) => {
    let filter = {};
    if (req.query.postId) {
        filter = { postId: req.query.postId.split(',') };
    }
    try {
        const likes = await Like.findAll({
            where : filter ,
             attributes: ['id','userId','postId']
            // include: [{
            //     model: User,
            //     attributes: ['id','firstName','lastName']
            // }],
            // include: [{
            //     model: Post,
            //     attributes: ['id','body']
            // }]
        })
        if(res.status(200) && likes){
            res.status(200).json({data: likes}, null, 2)
            
        }else{
            return res.status(400).json({message: "No Record Found, Please try again"})
        }
       
    } catch (error) {
        return res.status(500).json({
            message: "No record Found, Something went wrong please try again",
            error: error.message
        })
    }   
}

//Delete Like
const deleteLike = async(req, res) =>{
    // const userIdParam = req.params.userId
    // const user = await User.findOne({ where: {userId : userIdParam} })
    // const { userId } = user
    const id = req.params.id
    try {
        
        //const like = await Like.destroy({ where: { userId : userId } })
        const like = await Like.destroy({ where: { id : id } })
        if(res.status(200) && like){
            res.status(200).json({message: `Like deleted successfully`})
        }else{
            res.status(400).json({message: `No Like found`})
        }
    } catch (error) {
        res.status(500).json({
            message: "Sorry something went wrong, Post couldnot be deleted",
            error: error.message
        })
    }
}

//Retreive Likes by PostId
const selectLikesByPostId = async(req, res) => {
    //const postId = req.params.postId
    let filter = {};
    if (req.query.postId) {
        filter = { postId: req.query.postId.split(',') };
    }
    try {
        const likes = await Like.findAll({
            where : filter })
        if(res.status(200) && likes){
            res.status(200).json({data: likes}, null, 2)
            //res.status(200).json({data: users}, null, 2)
            //console.log(JSON.stringify(users, null, 2));
        }else{
            return res.status(400).json({message: "No Record Found, Please try again"})
        }
       
    } catch (error) {
        return res.status(500).json({
            message: "No record Found, Something went wrong please try again",
            error: error.message
        })
    }   
}

module.exports = { 
    addLike,
    allLikes,
    deleteLike,
    selectLikesByPostId
 }