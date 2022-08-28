// config inicial
const express = require('express');
const { default: mongoose } = require('mongoose');
const PORT = 3000;
const HOST = '0.0.0.0';
const app = express();
require('dotenv').config();
const Person = require('./models/Person');

// forma de ler JSON - Middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// rotas da API
app.post('/Person', async (req, res) => {

    //req.body


    //destructuring assignment
    //{name: "willianson", salary: 9999, approved: false}
    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try {
        //criando dados
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
    } catch (error) {
        req.status(500).json({ error: error })
    }
})

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