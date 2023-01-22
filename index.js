const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()
const PORT = 8000


const userRouter = require("./routes/user")
const commandeRouter = require("./routes/commande")
const panierRouter = require("./routes/panier")
const produitRouter = require("./routes/produit")
const authRouter = require("./routes/auth")




mongoose.set('strictQuery',false)
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("Connected to mongodb successfully"))
    .catch((err)=> console.log(err)
)

app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/produit", produitRouter)
app.use("/api/panier", panierRouter)
app.use("/api/commande", commandeRouter)
app.use("/api/auth", authRouter)

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Listenning to the port ${PORT}...`);
}) 