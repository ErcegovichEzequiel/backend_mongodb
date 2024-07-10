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

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
};

app.use(corsMiddleware);

// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(express.json());

app.get('/test', (req, res) => {
    res.json({status: 200, message: "Hello World"});
})

app.use('/api/auth', authRouter); // localhost:4000/api/auth (Es la ruta que va a contener los usuarios)

app.use('/api/products', productRouter); // localhost:4000/api/products (Es la ruta que va a contener los productos)

app.use('/api/carts', cartsRouter); // localhost:4000/api/carts (Es la ruta que va a contener los carritos)

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));