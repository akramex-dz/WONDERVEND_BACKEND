const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.tokennizer, (err, user)=>{
            if (err) res.status(403).json("token is not valid!")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("not authenticated !")
    }
}

const verifyTokenAndauthorisation = (req, res, next)=> {
    verifyToken(req, res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else{
            res.status(403).json("not authorised")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next)=> {
    verifyToken(req, res, ()=>{
        if (req.user.isAdmin) {
            next()
        }else{
            res.status(403).json("not authorised")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAdmin, verifyTokenAndauthorisation}