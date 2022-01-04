const User = require('../models/Users')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

require('dotenv').config()


const getAllUsers = async (req, res) => {
    try {
        const userList = await User.find({})
        res.status(200).send({ userList })
    } catch (error) {
        res.status(500).send(error)
    }
}

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status.send('Usuário ou senha não informados!')
            console.log('1');
        }
        const user = await User.findOne({email: req.body.email})
        if (!user) res.status(400).send('Usuário não encontrado!')
        console.log('2');

        const isMatch = bcrypt.compare(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('E-mail ou senha inválidos!')
        console.log('3');

        const now = Math.floor(Date.now() / 1000)

        const payLoad = {
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (3600 * 72)
        }

        res.json({
            ...payLoad,
            token: jwt.encode(payLoad, process.env.AUTH_SECRET)
        })
    } catch (error) {
        res.status(500).send(error)
        console.log(process.env.AUTH_SECRET, payLoad);
    }
}

const validateToken = async (req, res) => {
    const userData = req.body || null
    try {
        if(userData) {
            const token = jwt.decode(userData.token, authSecret)
            if(new Date(token.exp * 1000) > new Date()) {
                return res.send(true)
            }
        }
    } catch (error) {
        // problema com o token
    }

    res.send(false)
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
        if (error.name === "ValidationError" ) {
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
    signIn,
    validateToken,
    getUsersByTag,
    createUser,
    updateUser,
    deleteUser
}