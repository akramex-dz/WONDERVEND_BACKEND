const mongoose = require ("mongoose")

const produitSchema = new mongoose.Schema(
    {
        nom: {type: String, required: true, unique: true},
        Description: {type: String, required: true},
        categorie: {type: String, required: true},
        prix : {type:Number, required: true},
        nvPrix: {type: Number},
        photos: [{type: String, required: true}],
        keywords: [{type: String}],
        quant: {type: Number, required: true}
    },{
        timestamps: true
    }
    
)

module.exports = mongoose.model("Produit",produitSchema)