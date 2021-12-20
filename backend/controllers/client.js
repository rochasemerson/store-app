const Client = require('../models/Client')


const getAllClients = async (req, res) => {
    try {
        const clientList = await Client.find({})
        res.status(200).send({ clientList })
    } catch (error) {
        res.status(500).send(error)
    }
}

const getSingleClient = async (req,res) => {
    try {
        const { id: clientID } = req.params
        const singleClient = await Client.findOne({id:clientID})
        if(!singleClient) {
            res.status(404).send(`Nenhum cliente com o id: ${clientID} encontrado`)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getClientsByTag = async (req, res) => {
    try {
        const clientsByTag = await Client.find({ description: new RegExp(req.query.searchTag, 'i')})
        res.status(200).send({singleClient})
        if (clientsByTag.length == 0) {
            res.status(404).send('Nenhum cliente encontrado')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const createClient = async (req, res) => {
    try {
        const clientList = await Client.find({})
        let exist = false
        clientList.map(client => {
            client.email == req.body.email ? exist = true : exist = false
        })
        if (exist) {
            res.status(400).json({ msg: 'Email já cadastrado' })
        } else {
            const client = await Client.create(req.body)
            res.status(200).send(`Cliente ${req.body.name} cadastrado com sucesso`)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateClient = async (req, res) => {
    try {
        const { id: clientID } = req.params
        const client = await Client.findOneAndUpdate({ _id: clientID }, req.body, {
            new: true,
            runValidators: true
        })
        if (!client) {
            res.status(404).send({ msg: `Nenhum cliente com o id: ${clientID}` })
        }
        res.status(200).send(`Cliente ${client} alterado com sucesso`)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteClient = async (req, res) => {
    try {
        const { id: clientID } = req.params
        const client = await Client.findOneAndDelete({ _id: clientID })
        if (!client) {
            res.status(404).send({ msg: `Nenhum cliente com o id: ${clientID}` })
        }
        res.status(200).send(`Cliente ${client} deletado com sucesso`)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getAllClients,
    getSingleClient,
    getClientsByTag,
    createClient,
    updateClient,
    deleteClient
}