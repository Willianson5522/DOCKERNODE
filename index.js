// config inicial

const express = require('express');
const { default: mongoose } = require('mongoose');
const PORT = 3000;
const HOST = '0.0.0.0';
const app = express();
require('dotenv').config();

// forma de ler JSON - Middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// rota inicial / endpoint

app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
});

// conexao com banco de dados & entrega de porta

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusternodeapi.zwmpdhk.mongodb.net/DBNodeAPI?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao MongoDB!');
        app.listen(PORT, HOST);
    })
    .catch((err) => {
        console.log(err)
    });