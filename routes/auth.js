const authRouter = require("express").Router()
const db = require("../models/")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

User = db.user;
//REGISTER

authRouter.post("/register",async (req, res)=>{
    const newUser = new User({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        pwd: CryptoJS.DES.encrypt(req.body.pwd, process.env.cryptokey).toString(),
        numtel: req.body.numtel
      //  Adresse: req.body.Adresse,
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN
authRouter.post('/login',async (req, res)=> {
    try {
        const user = await User.findOne({email:req.body.email})
        if (!user) {
            res.status(401).json("Wrong Email!")
        } else {
            const DBpassword = CryptoJS.DES.decrypt(user.pwd, process.env.cryptokey)
            const DBpassword2 = DBpassword.toString(CryptoJS.enc.Utf8)

            const LOGINpassword = req.body.pwd
            if (LOGINpassword !== DBpassword2) {
                res.status(401).json("Wrong password !")
            } else { 
                const {pwd, ...tosend} = user._doc
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                }, 
                process.env.tokennizer,
                {expiresIn:"365d"}
                )
                res.status(200).json({...tosend, accessToken})
            }
        }      
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = authRouter;