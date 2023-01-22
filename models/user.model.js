const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema(
    {
        email : {type: String, required: true, unique: true},
        pwd: {type: String, required: true},
        nom: {type: String, required: true},
        prenom: {type: String, required: true},
        numtel: {type: Number, required: true},
        isAdmin: {type: Boolean, default: false}
       // Adresse: {
       //   pays: {type: String, required: true},
       //   ville: {type: String, required: true},
       //   AdresseHabitation: {type: String, required: true},
       //   zip: {type: Number, required: true}
       // }
    }
)

module.exports = mongoose.model("User",userSchema)