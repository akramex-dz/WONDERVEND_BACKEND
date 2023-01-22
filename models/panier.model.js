const mongoose = require ("mongoose")

const panierSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: [{
            productId:{type: String},
            quantite:{type: Number, default:1}
        }],
        prixTotal: {type: Number}
    }
)

module.exports = mongoose.model("Panier",panierSchema)