const { model } = require('mongoose');
const Person = require('../models/Person');

const router = require('express').Router();

// Create - criação de dados
router.post('/', async (req, res) => {

    //req.body


    //destructuring assignment
    //{name: "willianson", salary: 9999, approved: false}
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'o campo nome é obrigatório' })
        return
    }
    if (!salary) {
        res.status(422).json({ error: 'o campo salario é obrigatório' })
        return
    }
    if (approved == null) {
        res.status(422).json({ error: 'o campo aprovado é obrigatório' })
        return
    }
    const person = {
        name,
        salary,
        approved
    }

    try {
        //criando dados
        await Person.create(person);
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
        req.status(500).json({ error: error })
    }
})

// Read - leitura de dados

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.get('/:id', async (req, res) => {
    //extrair o dado da requisição pela URL = req.params
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'o usuário não foi encontrado!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router;