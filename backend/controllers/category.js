const Category = require('../models/Category')


const getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find({})
        res.status(200).send({ categoryList })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const createCategory = async (req, res) => {
    const categoryList = await Category.find({})
    let exist = false
        categoryList.map(category => {
            category.code == req.body.code || category.description == req.body.description ? exist = true : exist = false
        })
    if (exist) {
        res.json({msg: 'Descrição ou Código já cadastrado'})
    } else {
        const category = await Category.create(req.body)
        res.json({msg:`Categoria ${req.body.description} criada com sucesso`})
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id: categoryID } = req.params
        const category = await Category.findOneAndUpdate({ _id: categoryID }, req.body, {
            new: true,
            runValidators: true
        })
        if (!category) {
            return res.status(404).json({ msg: `Nenhuma categoria encontrada` })
        }
        res.status(200).send(`Categoria alterada com sucesso`)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id: categoryID } = req.params
        const category = await Category.findOneAndDelete({ _id: categoryID })
        if (!category) {
            return res.status(404).json({ msg: `Nenhuma categoria encontrada` })
        }
        res.status(200).send(`Categoria ${req.body.description} excluida com sucesso`)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}