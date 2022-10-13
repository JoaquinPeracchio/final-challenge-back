const Product = require('../models/Product')

const productsController = {
    create: async (req, res) => {
        try {
            await new Product(req.body).save()
            res.status(201).json({
                message: "A new product has been created",
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Couln't create a new product",
                success: false
            })
        }
    },

    all: async (req, res) => {
        let query = {}
        
        // if (req.query.product) {
        //     query.product = req.query.product
        //     let regExp = new RegExp(`^${query.product}`, "i")
        //     query.product = regExp
        // }



        if (req.query.product) {
            
            query.name =  { $regex: '^' + req.query.product.trim(), $options: 'i' };
        }

        console.log(query)

        try {
            let producto = await Product.find(query)
                .populate('user',{name:1,popularity:1})
                
            res.status(200).json(producto)
        } catch (error) {
            console.log(error)
            res.status(500).json()
        }
    },
    

    readFromUser: async (req, res) => {
        const { id } = req.params
        try {
            let product = await Product.find({ user: id })
            .populate('user', { name: 1 })
            if (product) {
                res.status(200).json({ message: 'product found', response: product, success: true })
            } else {
                res.status(404).json({ message: 'product not found', success: false })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error', success: false })
        }
    },


    read: async (req, res) => {
        const { id } = req.params
        try {
            let product = await Product.findOne({_id:id})
            if (product) {
                res.status(200).json({
                    message: "You get a product",
                    response: product,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Couldn't get a product",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Error",
                success: false
            })
        }
    },

    update: async (req, res) => {
        const {id} = req.params
        try {
            let product = await Product.findOne({_id:id})
            if (product) {
                await Product.findOneAndUpdate({_id:id}, req.body, {new:true})
                req.status(200).json({
                    message: "Product updated",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Product couldn't be updated",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Error",
                success: false
            })
        }
    },

    destroy: async (req, res) => {
        const {id} = req.params
        try {
            let product = await Product.findOne({_id:id})
            if (product) {
                await Product.findOneAndDelete({_id:id})
                req.status(200).json({
                    message: "Product deleted",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Product couldn't be deleted",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Error",
                success: false
            })
        }
    }
}

module.exports = productsController