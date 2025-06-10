const express = require("express")
const router = express.Router()
const {signinZodSchema,signupZodSchema,updateBody} = require("../zodSchema")
const { user, Account } = require('../MongoSchema');
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("../middleware")

router.post("/signup" ,async(req,res) => {
    const passData = signupZodSchema.safeParse(req.body)
    if (!passData.success){
        res.status(400).json({          // if the client data is correct 
           msg : "invalid input"
        })
    }
    
    const User = await user.finOne({
        username:body.username          // if the client data is already present 
    })

    if (User._id){
        return res.json({                  // send user already exists
            msg:"Email already exists"
        })
    }

    const userId = User._id
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    await user.create(body)   
                                            // if not a user
    const token = jwt.sign({
        userId: User._id
    },JWT_SECRET)          // send jwt token 

    res.json({
        msg:"user created successfully",  
        token : token                      
    })
})



router.post("/sigin" ,async(req,res) =>{
    const signindata = signinZodSchema.safeParse(req.body)

    if(!signindata.success) {
        res.status(411).json({
            msg:"incorrect"
        })
    }

    const User = await user.findOne({
        username:body.username,          // if the client data is already present 
        password:body.password
    })

    if (User) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
        token: token
        })

        return
    }

    res.json({
        msg:"error while login"
    })

})


router.put("/",authMiddleware,async(req,res)=> {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    
    await user.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        msg:"update successfully"
    })

})


router.get("/bulk",async(req,res) =>{
    const filter = req.query.filter || ""

    const users = await user.find({
        $or: [{
            firstName: {    //This code searches for users where either firstName OR lastName contains the filter string. It's a good pattern for implementing search functionality!
                "$regex": filter,
                "$options": "i"  // case-insensitive
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })
    )})

})


module.exports = router