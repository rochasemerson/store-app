const Category = require('../models/Category')


const getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find({})
        res.status(200).send({ categoryList })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getSingleCategory = async (req, res) => {
    try {
        const catId = req.params.id
        const singleCategory = await Category.findOne({ _id: CanvasRenderingContext2D })
        if (!singleCategory) {
            res.status(404).json('Categoria não encontrada')
        } else {
            res.status(200).json(singleCategory)
        }
    } catch (error) {
        res.status(500).send("Ocorreu um erro tente novamente")
    }
}

const createCategory = async (req, res) => {
    try {
        const categoryList = await Category.find({})
        let exist = false
        categoryList.map(category => {
            category.code == req.body.code || category.description == req.body.description ? exist = true : exist = false
        })
        if (exist) {
            res.json('Descrição ou Código já cadastrado')
        } else {
            const category = await Category.create(req.body)
            res.json(`Categoria ${req.body.description} criada com sucesso`)
        }
    } catch (error) {
        let errorList = error.message
        errorList = errorList.match(/\<(.*?)\>/mg)
        res.status(500).send(errorList)
    }
}

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const category = await Category.findOneAndUpdate({ _id: categoryId }, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).send(`Categoria alterada com sucesso`)
    } catch (error) {
        res.status(500).json('Ocorreu um erro tente novamente')
        console.log(req.params);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const category = await Category.findOneAndDelete({ _id: categoryId })
        if (!category) {
            return res.status(404).json(`Nenhuma categoria encontrada`)
        }
        res.status(200).send(`Categoria excluida com sucesso`)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    getCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
}