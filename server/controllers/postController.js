const db = require('../models')
const Post = db.Post
const User = db.User
const Like = db.Like
const Validator = require("fastest-validator")

//Add Post
const addPost = async (req, res) => {
    try {
        const data = {
            userId: req.body.userId,
            body: req.body.body,
            date: req.body.date
            
        }
        //User Validations
        const validatorData = new Validator();

        const schema = {
            userId: {type: "number", integer: true, positive: true},
            body: { type: "string" },
            date: {
                type: "date",
                default: (schema, field, parent, context) => new Date()
            }
            
        };

        const check = validatorData.compile(schema);
        if (check(data) !== true) {
            //return res.status(400).json({ errors: check(data) })
            return res.status(400).json({ message:"Validation Errors",errors:check(data) })

        }
        
        //Create New Post
        const response = await Post.create(data)
        if (res.status(201) && response) {
            res.status(201).json({
                message: "Post added successfully",
                post:data
            })
        } else {
            return res.status(404).json({
                message: "Error Occured!!! Post Could not be added"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Post could not be added - Something went wrong",
            error: error.message
            })
    }
}

//Retreive All Posts
const allPosts = async(req, res) => {
    try {
        const posts = await Post.findAll({
           include: [{
                model: User,
                attributes: ['id','firstName','lastName']
            }],
            
        })
        if(res.status(200) && posts){
            res.status(200).json({data: posts}, null, 2)
            
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

//Retreive All Posts
const allLikesPosts = async(req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id'],
            include : [{
                model: Like,
                attributes: ['id', 'userId', 'postId']
            }]
            
        })
        if(res.status(200) && posts){
            res.status(200).json({data: posts}, null, 2)
            
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

//Update Post
const updatePost = async(req, res) =>{
    const id = req.params.id
    try {
        const data = {
            body: req.body.body
        }     
        
        const post = await Post.update(req.body, 
            {where :{id:id}
            
        })
        if (res.status(200) && post[0] > 0) {
            res.status(200).json({
                message: "Post Updated successfully",
                post:data
            })
        } else {
            return res.status(400).json({message: `Error Occured!!! Post Could not be Updated`})
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Post could not be Updated - Something went wrong",
            error: error.message
            })
    }

}

//Delete Post
const deletePost = async(req, res) =>{
    const id = req.params.id
    try {
        
        const response = await Post.destroy({ where: { id: id } })
        if(res.status(200) && response){
            res.status(200).json({message: `Post deleted successfully`})
        }else{
            res.status(400).json({message: `No Post found`})
        }
    } catch (error) {
        res.status(500).json({
            message: "Sorry something went wrong, Post couldnot be deleted",
            error: error.message
        })
    }
}

module.exports = { 
    addPost,
    allPosts,
    updatePost,
    deletePost,
    allLikesPosts
 }