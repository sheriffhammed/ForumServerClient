const db = require('../models')
const userModel = db.User
const bcrypt = require('bcrypt')
const Validator = require("fastest-validator")

const handleUserRegisteration = async (req, res) => {
    console.log("Request params ", req.body)
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    try {
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passwordHash,
            phone: req.body.phone
        }
        //User Validations
        const validatorData = new Validator();

        const schema = {
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "email" },
            password: { type: "string" },
            phone: {type: "number", integer: true, positive: true},
        };

        const check = validatorData.compile(schema);
        if (check(data) !== true) {
            //return res.status(400).json({ errors: check(data) })
            return res.status(400).json({ message:"Validation Errors",errors:check(data) })

        }
        //Check if User Exist before creating
        const checkUser = await userModel.findOne({where : { email : req.body.email}})
        if(checkUser) return res.status(409).json({message : `User with this Email ${req.body.email} already Exist!`})

        //Create New User
        const response = await userModel.create(data)
        if (res.status(201) && response) {
            res.status(201).json({
                message: "User Created successfully",
                post:data
            })
        } else {
            return res.status(404).json({
                message: "Error Occured!!! User Could not be Created"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "User could not be Created - Something went wrong",
            error: error.message
            })
    }
}

//Retreive All Users
const allUsers = async(req, res) => {
    try {
        const users = await userModel.findAll()
        if(res.status(200) && users){
            res.status(200).json({data: users}, null, 2)
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

//Retreive a User
const retreiveUser = async(req, res) => {
    const id = req.params.id
    try {
        const user = await userModel.findByPk(id)
        if(res.status(200) && user){
            res.status(200).json({data: user}, null, 2)
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

//Retreive User by Emai
const getUserByEmail = async(req, res) => {
    const email = req.query.email
    try {
        const user = await userModel.findOne(
            {where : {email : email},
            attributes : ['firstName','lastName', 'email']
        })
        if(res.status(200) && user){
            res.status(200).json({data: user}, null, 2)
            
        }else{
            return res.status(400).json({message: "No Record Found, Please try againpppp"})
        }
       
    } catch (error) {
        return res.status(500).json({
            message: "No record Found, Something went wrong please try again",
            error: error.message
        })
    }   
}

//Update User
const updateUser = async(req, res) =>{
    const id = req.params.id
    const password = req.body.password
    let data;
    //const passwordHash = await bcrypt.hash(req.body.password, 10)
    try {
        if (password){
            const passwordHash = await bcrypt.hash(req.body.password, 10)
            data = {
                password: passwordHash,
            }
        }
        else{
            data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                //password: passwordHash,
                phone: req.body.phone
            }
        }   
        const user = await userModel.update(data, 
            {where :{id:id}
            
        })
        
        if (res.status(200) && user[0] > 0) {
            res.status(200).json({
                message: "User Updated successfully",
                //post:data
            })
        } else {
            return res.status(400).json({message: `Error Occured!!! User Could not be Updated because no record found with ID ${id}`})
        }
        
    } catch (error) {
        res.status(500).json({
            message: "User could not be Updated - Something went wrong",
            error: error.message
            })
    }

}

//Update User by Email
const updateUserByEmail = async(req, res) =>{
    const email = req.query.email
    
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    try {        
        const data = {
            password: passwordHash,
        }
       
        const user = await userModel.update(data, 
            {where :{email:email}
            
        })
        
        if (res.status(200) && user[0] > 0) {
            res.status(200).json({
                message: "Password Updated successfully",
                //post:data
            })
        } else {
            return res.status(400).json({message: `Error Occured!!! User Could not be Updated because no record found with Email ${email}`})
        }
        
    } catch (error) {
        res.status(500).json({
            message: "User could not be Updated - Something went wrong",
            error: error.message
            })
    }

}

//Change Password
// const changePassword = async(req, res) =>{
//     const id = req.params.id
//      //Retreive User with the crrdentials from Database
//      const retreiveUser = await userModel.findOne({where : {id : id}})
    
//      if(!retreiveUser) return res.status(401).json({message : "Unauthorised User"})
//      const passwordMatch = await bcrypt.compare(password, retreiveUser.password)
//     if(passwordMatch){ 
//    // const newPasswordHash = await bcrypt.hash(req.body.password, 10)
//     const passwordHash = await bcrypt.hash(req.body.password, 10)
//     console.log('Password Hash', passwordHash)
//         try {
//             const data = {
//                 password: passwordHash,
//                 sample : "sample"
//             }
                    
//             const user = await userModel.update(req.body, 
//                 {where :{id:id}
                
//             })
//             //if(!response) return res.status(400).json({message: `Error Occured!!! Category Could not be Updated because no record found with ID ${id}`})
//             //console.log("Response Result ", response)
//             if (res.status(200) && user[0] > 0) {
//                 res.status(200).json({
//                     message: "User Updated successfully llkl;kl;kl;",
//                     post:data
//                 })
//             } else {
//                 return res.status(400).json({message: `Error Occured!!! User Could not be Updated because no record found with ID ${id}`})
//             }
            
//         } catch (error) {
//             res.status(500).json({
//                 message: "User could not be Updated - Something went wrong",
//                 error: error.message
//                 })
//         }
//     }
// }

module.exports = { 
    handleUserRegisteration,
    allUsers,
    updateUser,
    retreiveUser,
    updateUserByEmail,
    getUserByEmail
 }