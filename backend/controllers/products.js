const Product = require('../models/Product')
const asyncWrapper = require('../config/async')

const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({ products })
})

const createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).send(`Produto ${req.body.description} criado com sucesso`)
})

const getSingleProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params
    const singleProduct = await Product.findOne({ id:productID })
    res.status(200).send({singleProduct})
    if (!singleProduct) {
        res.status(404).send('Nenhum produto encontrado')
    }
})

const getProductByTag = asyncWrapper(async (req, res) => {
    const productsByTag = await Product.find({ description: new RegExp(req.query.searchTag, 'i')})
    res.status(200).send({productsByTag})
    if (productsByTag.length == 0) {
        res.status(404).send('Nenhum produto encontrado')
    }
})

const getProductByCategory = asyncWrapper(async (req, res) => {
    const categoryProductList = await Product.find({ category: req.params.cat })
    if (categoryProductList.length == 0) {
        return res.status(404).json({ msg: `Nenhum produto cadastrado na categoria` })
    }
    res.status(200).json({ categoryProductList })
})

const updateProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params
    const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!product) {
        return res.status(404).json({ msg: `Nenhum produto com o id: ${productID}` })
    }
    res.status(200).json({ data: req.body })
})

const deleteProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params
    const product = await Product.findOneAndDelete({ _id: productID })
    if (!product) {
        return res.status(404).json({ msg: `Nenhum produto com o id: ${productID}` })
    }
    res.status(200).send(`Produto ${req.body.description} deletado com sucesso`)
})

module.exports = {
    getAllProducts,
    getSingleProduct,
    getProductByTag,
    createProduct,
    getProductByCategory,
    updateProduct,
    deleteProduct
}