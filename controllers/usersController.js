const User = require('../models/User.js');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const { exists } = require('../models/User.js');

const usersController = {

    signUp: async (req, res) => {
        let { name, lastName, photo, mail, password, adress, phone, sells,sellspopularity, comment, from, role } = req.body;
        try {
            let user = await User.findOne({ mail });
            if (!user) {
                let logged = false;
                let verification = false;
                let uniqueString = crypto.randomBytes(15).toString('hex');
                if (from === 'form') {
                    password = bcryptjs.hashSync(password, 10);
                    user = await new User({ name, lastName, photo, mail, password: [password], adress, phone, popularity, role, from: [from], logged, verification, uniqueString }).save();
                    // sendMail(mail, code);
                    res.status(201).json({
                        message: "user signed up from form",
                        success: true
                    });
                } else { //GOOGLE
                    password = bcryptjs.hashSync(password, 10);
                    verified = true;
                    user = await new User({ name, lastName, photo, mail, password: [password], adress, phone, popularity, role, from: [from], logged, verification, uniqueString }).save();
                    res.status(201).json({
                        message: "user signed up from " + from,
                        success: true
                    });
                }
            } else if (user.mail === mail) {
                res.status(400).json({ message: 'User already exists', success: false });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error, success: false });
        }
    },

    signIn: async (req, res) => {
        let { mail, password } = req.body;
        try {
            let user = await User.findOne({ mail });
            if (!user) {
                res.status(404).json({ message: `Please check your credentials`, success: false });
            } else {
                let checkPass = user.password.filter(passwordElem => bcryptjs.compareSync(password, passwordElem))
                if (mail === user.mail && checkPass.length > 0) {
                    user.logged = true;
                    await user.save();
                    res.status(200).json({ message: `Welcome ${user.name} ${user.lastName}`, success: true })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error, success: false });
        }
    },

    signOut: async (req, res) => {
        let { mail } = req.body
        try {
            const user = await User.findOne({ mail: mail })
            if (user) {
                user.logged = false
                await user.save()
                res.status(200).json({
                    succes: true,
                    message: 'Session finished',
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error, success: false })
        }
    },

    read: async (req, res) => {
        try {
            let users = await User.find();
            if (users) {
                res.status(200).json({ message: 'Users found', response: users, success: true });
            } else {
                res.status(404).json({ message: 'Users not found', success: false });
            }
        } catch (error) {
            console.log(error)
        }
    },


    buys: async(req,res) =>{
        let {id}=req.params
        let body =req.body

        if(body instanceof array)
            for(i=0 ; i> body.length ; i++){

                try{
                let user = await User.findOne(id)
                if(user){
                    user.buy.push({
                        seller:body.idVendedor[i],
                        nameBuyer :body.nameBuyer[i], 
                        product:body.prductId[i],
                        prductName:body.productName[i],
                        type:body.product.type[i],
                        price:body.price[i],
                    })
        
                   
                }
                }catch(e){
                    res.status(400).json({
                        message:"happend a error :" + e

                    })
                }
            }
        


    },
    sells: async(req,res) =>{
        let {id}=req.params
        let body =req.body

        if(body instanceof array)
            for(i=0 ; i> body.length ; i++){

                try{
                let user = await User.findOne(id)
                if(user){
                    user.sell.push({
                        buyer:body.idSeller[i],
                        nameBuyer :body.nameSeller[i], 
                        product:body.prductId[i],
                        prductName:body.productName[i],
                        type : body.product.type[i],
                        price:body.price[i],
                    })

                    user.stock -=body.quantity[i]
                    res.status(200).json({
                        message:'succes'
                    })
        
                }
                }catch(e){
                    res.status(400).json({
                        message:"happend a error :" + e

                    })
                }
            }
        


    },

}

module.exports = usersController