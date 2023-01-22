const userRouter = require("express").Router()
const { verifyTokenAndauthorisation, verifyTokenAndAdmin } = require("./verrifyToken");
const db = require("../models/index");

const user = db.user;


//UPDATE 
userRouter.put('/:id',verifyTokenAndauthorisation, async (req, res)=>{
        if (req.body.pwd) {
            req.body.pwd = CryptoJS.DES.encrypt(req.body.pwd, process.env.cryptokey).toString()
        }
        try {
            const updatedUser = await user.findByIdAndUpdate(req.params.id,{
                $set : req.body
            }, {new : true} )
            res.status(201).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
})

//DELETE 

userRouter.delete('/:id',verifyTokenAndauthorisation, async (req, res)=>{
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json('USER WAS DELETED!')
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ONE USER 
userRouter.get('/find/:id',verifyTokenAndAdmin, async (req, res)=>{
    try {
        const usr = await user.findById(req.params.id)
        const {pwd,  ...tosend} = usr._doc
        res.status(200).json(tosend)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL USERS 
userRouter.get('/',verifyTokenAndAdmin, async (req, res)=>{
    try {
        const users = await user.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = userRouter;

// https://youtu.be/rMiRZ1iRC0A?t=4939