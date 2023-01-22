const produitRouter = require("express").Router()
const { verifyTokenAndauthorisation, verifyTokenAndAdmin, verifyToken } = require("./verrifyToken");
const db = require("../models/");

const produit = db.produit;



//ADD A NEW produit  
produitRouter.post("/",verifyTokenAndAdmin,async (req, res)=>{
    const newProduit = new produit(req.body)
    try {
        const savedProduit = await newProduit.save()
        res.status(201).json(savedProduit)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE 
produitRouter.put('/:id',verifyTokenAndAdmin, async (req, res)=>{
    try {
        const updatedproduit = await produit.findByIdAndUpdate(req.params.id,{
            $set : req.body
        }, {new : true} )
        res.status(201).json(updatedproduit)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE A produit 
produitRouter.delete("/:id",verifyTokenAndAdmin, async (res, req)=>{
    try {
        await produit.findByIdAndDelete(req.params.id)
        res.status(201).json("produit Deleted Successfully !")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ONE produit
produitRouter.get('/find/:id', async (req, res)=>{
    try {
        const prdct = await produit.findById(req.params.id)
        res.status(200).json(prdct)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GETL PRODUCTS
produitRouter.get('/', async (req, res)=>{
    const qNEW = req.query.newest
    const qCATERGORY = req.query.category
    const qPRICEMax = parseInt(req.query.priceMax, 10)
    const qPRICEMin = parseInt(req.query.priceMin, 10)
    const qOrderByPrice = req.query.orderByPrice
    let priceFilter = false
    if (qPRICEMax ) {
        priceFilter = true
    } 
    console.log(priceFilter);
    try {
        let produits
        if (priceFilter && qNEW && qCATERGORY && qOrderByPrice) {
            produits = await produit.find({$and:[{prix:{$gt:qPRICEMin}},{prix:{$lt:qPRICEMax}},{categorie: qCATERGORY}]}).sort({createdAt: -1, prix : -1})
        } else if (qNEW && qCATERGORY ) {
            produits = await produit.find({categorie: qCATERGORY}).sort({createdAt: -1})
        } else if (qNEW && priceFilter) {
            produits = await produit.find({$and:[{prix:{$gt:qPRICEMin}},{prix:{$lt:qPRICEMax}}]}).sort({createdAt: -1})
        } else if (qCATERGORY && priceFilter) {
            produits = await produit.find({$and:[{prix:{$gt:qPRICEMin}},{prix:{$lt:qPRICEMax}},{categorie: qCATERGORY}]})
        } else if ( qNEW ) {
            produits = await produit.find().sort({createdAt : -1}) //limit ? 
        } else  if ( qCATERGORY )  {
            produits = await produit.find({ categorie : qCATERGORY })
        } else if ( priceFilter) {
            produits = await produit.find({$and:[{prix:{$gt:qPRICEMin}},{prix:{$lt:qPRICEMax}}]})
        } else if ( qOrderByPrice) {
            produits = await produit.find().sort({prix : 1})
        } else {
            produits = await produit.find()
        }
        res.status(200).json(produits)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


module.exports = produitRouter;

