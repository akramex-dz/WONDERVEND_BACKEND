const panierRouter = require("express").Router()
const { verifyTokenAndauthorisation, verifyTokenAndAdmin, verifyToken } = require("./verrifyToken");
const db = require("../models/");

const panier = db.panier;

//AJOUTER UN panier  
panierRouter.post("/", verifyToken, async (req, res) => {
    const newpanier = new panier(req.body)
    try {
        const savedpanier = await newpanier.save()
        res.status(201).json(savedpanier)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE 
panierRouter.put('/:id', verifyTokenAndauthorisation, async (req, res) => {
    try {
        const updatedpanier = await panier.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(201).json(updatedpanier)
    } catch (error) {
        res.status(500).json(error)
    }
})

//SUPPRIMER UN panier 
panierRouter.delete("/:id", verifyTokenAndauthorisation, async (res, req) => {
    try {
        await panier.findByIdAndDelete(req.params.id)
        res.status(201).json("panier Deleted Successfully !")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET UN panier by id = userId
panierRouter.get('/find/:id', verifyTokenAndauthorisation, async (req, res) => {
    try {
        const pnier = await panier.findOne({ userId: req.params.id })
        res.status(200).json(pnier)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET TOUT LES panierS 
panierRouter.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const paniers = await panier.find()
        res.status(200).json(paniers)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = panierRouter;