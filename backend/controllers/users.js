const User = require('../models/Users')

const getAllUsers = async (req, res) => {
    try {
        const userList = await User.find({})
        res.status(200).send({ userList })
    } catch (error) {
        res.status(500).send(error)
    }
}

const getSingleUser = async (req, res) => {
    try {
        const { id: userID } = req.params
        const singleUser = await User.findOne({ id: userID })
        if (!singleUser) {
            res.status(404).send(`Nenhum usuário com o id: ${userID} encontrado`)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUsersByTag = async (req, res) => {
    try {
        const usersByTag = await User.find({ description: new RegExp(req.query.searchTag, 'i') })
        res.status(200).send({ singleUser })
        if (usersByTag.length == 0) {
            res.status(404).send('Nenhum usuário encontrado')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).send(`Usuário ${req.body.name} cadastrado(a) com sucesso`)
    }
    catch (error) {
        if (error.name === "ValidationError" && error.errors.phone.valueType == 'string') {
            return res.status(400).send('Telefone Inválido');
        } else if (error.name === "ValidationError" ) {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send(Object.values(errors));
        } else if (error.code === 11000) {
           return res.status(400).send(`E-mail ${error.keyValue.email} já cadastrado`);
        } else {
           return res.status(400).send('Ocorreu um erro, tente novamente dentro de alguns minutos');
        }
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json(`Usuário ${user.name} alterado com sucesso`)
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('E-mail já cadastrado')
        } else
            res.status(500).send('Ocorreu um erro, tente novamente dentro de alguns minutos')
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            res.status(404).json(`Usuário não encontrado`)
        } else {
            const user = await User.findOneAndDelete({ _id: userID })
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