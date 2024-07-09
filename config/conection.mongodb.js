const conectionMongoose = require('mongoose')

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hqlou72.mongodb.net/${process.env.DB_NAME}`


conectionMongoose.connect(URI).then(()=>{
    console.log("Base de datos conectada")
}).catch
(
    (error)=>console.log("Error al conectar la base de datos MongoDB: " + error)
)

module.exports = { conectionMongoose }