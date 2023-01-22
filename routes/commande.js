const commandeRouter = require("express").Router()
const db = require("../models/");
const { verifyTokenAndauthorisation, verifyTokenAndAdmin, verifyToken } = require("./verrifyToken");

commande = db.commande;
//AJOUTER UN commande  
commandeRouter.post("/", verifyToken, async (req, res) => {
    const newcommande = new commande(req.body)
    try {
        const savedcommande = await newcommande.save()
        res.status(201).json(savedcommande)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE 
commandeRouter.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedcommande = await commande.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }) 
        res.status(201).json(updatedcommande)
    } catch (error) {
        res.status(500).json(error)
    }
})

//SUPPRIMER UN commande 
commandeRouter.delete("/:id", verifyTokenAndAdmin, async (res, req) => {
    try {
        await commande.findByIdAndDelete(req.params.id)
        res.status(201).json("commande DELETED SUCCESSFULLY !")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET UN commande by id = userId
commandeRouter.get('/find/:id', verifyTokenAndauthorisation, async (req, res) => {
    try {
        const commandes = await commande.find({ userId: req.params.id })
        res.status(200).json(commandes)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET TOUT LES commandeS 
commandeRouter.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const commandes = await commande.find()
        res.status(200).json(commandes)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET LES REVENU MENSUELLE

commandeRouter.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try {
        const income = await commande.aggregate({
            $match: { createdAt : {$gte : previousMonth} },
            $project: {
                mois : "$createdAt",
                Ventes : "$prixTotal"
            },
            $group: {
                _id: "$mois",
                total: {$sum: "$Ventes"}
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = commandeRouter;