const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const { conectionMongoose } = require('./config/conection.mongodb')

const { authRouter } = require("./auth/auth.route");
const { productRouter } = require("./products/products.router");
const { cartsRouter } = require("./carts/carts.router");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors(
    {
        origin: "https://front-final-gray.vercel.app" || "https://localhost:5173",
        credentials: true

    }
));



app.use(express.json());

app.get('/test', (req, res) => {
    res.json({status: 200, message: "Hello World"});
})

app.use('/api/auth', authRouter); 

app.use('/api/products', productRouter);

app.use('/api/carts', cartsRouter); 

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));