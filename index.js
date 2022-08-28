// config inicial

const express = require('express');
const PORT = 3000;
const HOST = '0.0.0.0';
const app = express();

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

// entregar uma porta

app.listen(PORT, HOST);