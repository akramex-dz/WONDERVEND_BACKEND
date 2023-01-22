const panier = require('./panier.model');
const produit = require('./produit.model');
const user = require('./user.model');
const commande = require('./commande.model');

const db = {}

db.panier = panier
db.produit = produit
db.user = user
db.commande = commande

module.exports = db;