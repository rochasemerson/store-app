const User = require('../models/Users')

const getAllUsers = async (req, res) => {
    try {
        const userList = await User.find({})
        res.status(200).send({ userList })
    } catch (error) {
        res.status(500).send(error)
    }
}

const getSingleUser = async (req,res) => {
    try {
        const { id: userID } = req.params
        const singleUser = await User.findOne({id:userID})
        if(!singleUser) {
            res.status(404).send(`Nenhum usuário com o id: ${userID} encontrado`)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUsersByTag = async (req, res) => {
    try {
        const usersByTag = await User.find({ description: new RegExp(req.query.searchTag, 'i')})
        res.status(200).send({singleUser})
        if (usersByTag.length == 0) {
            res.status(404).send('Nenhum usuário encontrado')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const createUser = async (req, res) => {
    try {
        const userList = await User.find({})
        let exist = false
        userList.map(user => {
            user.email == req.body.email ? exist = true : exist = false
        })
        if (exist) {
            res.status(400).json('Email já cadastrado')
        } else {
            const user = await User.create(req.body)
            res.status(200).send(`Usuário ${req.body.name} cadastrado(a) com sucesso`)
        }
    } catch (error) {     
        let errorList = error.message
        errorList = errorList.match(/\<(.*?)\>/mg)
        res.status(500).send(errorList)
    }
}

const updateUser = async (req, res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            res.status(404).json('Usuário não encontrado')
        } else {
            const user = await User.findOneAndUpdate({_id: userID}, req.body, {
                new: true,
                runValidators: true
            })
            res.status(200).json(`Usuário ${user.name} alterado com sucesso`)
            console.log(req.body);
        }
    } catch (error) {
        res.status(500).send('Ocorreu um erro tente novamente')
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            res.status(404).json(`Usuário não encontrado`)
        } else {
            const user = await User.findOneAndDelete({_id:userID})
            res.status(200).send(`Usuário deletado com sucesso`)
        }
    } catch (error) {
        res.status(500).send('Ocorreu um erro tente novamente')
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    getUsersByTag,
    createUser,
    updateUser,
    deleteUser
}