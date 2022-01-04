const Product = require('../models/Product')
const asyncWrapper = require('../config/async')

const getAllProducts = asyncWrapper(async (req, res) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
    const skip = (page - 1) * limit
    const products = await Product.find({}).skip(skip).limit(limit)
    res.status(200).json({ products })
})

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).send(`Produto ${req.body.description} criado com sucesso`)
    } catch (error) {
            if (error.name === 'ValidationError') {
            let errors = {};
            
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send(Object.values(error));
        } else if (error.code === 11000) {
            return res.status(400).send(`Produto ${error.keyValue.description} já cadastrado`);
        } else {
            return res.status(400).send('Ocorreu um erro, tente novamente dentro de alguns minutos');
        }
    }
}

const getSingleProduct = asyncWrapper(async (req, res) => {
    const singleProduct = await Product.findOne({ _id: req.params.id })
    res.status(200).send({ singleProduct })
    console.log(req.params.id);
    if (!singleProduct) {
        res.status(404).send('Nenhum produto encontrado')
    }
})

const getProductByTag = asyncWrapper(async (req, res) => {
    const productsByTag = await Product.find({ description: new RegExp(req.query.tag, 'i') })
    res.status(200).send({ productsByTag })
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
        return res.status(404).json('Nenhum produto encontrado')
    }
    res.status(200).json(`Produto ${product.description} atualizado com sucesso`)
})

const deleteProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params
    const product = await Product.findOneAndDelete({ _id: productID })
    if (!product) {
        return res.status(404).json(`Nenhum produto com encontrado`)
    }
    res.status(200).send(`Produto deletado com sucesso`)
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