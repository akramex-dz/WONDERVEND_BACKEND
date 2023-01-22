const mongoose = require ("mongoose")

const commandeSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        etatPayement:{type: String, required: true},
        produits: [{
            nom: {type: String, required: true, unique: true},
            Description: {type: String, required: true},
            categorie: {type: String, required: true},
            prix : {type:Number, required: true},
            quantite: {type: Number}
        }],
        livraison: {
            adresseLivraison: {
               type: Object, required: true
            },
            etatLivraison: {type: String, required: true, default: "en attente"},
            delai: {type: String, required: true}
        },
        prixTotal: {type: Number, required: true}
    },{ 
    timestamps: true
    }
)

module.exports = mongoose.model("Commande",commandeSchema)