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


const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));

// app.use(cors());

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/products', productRouter);

app.use('/api/carts', cartsRouter);  


app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
})