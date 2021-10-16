const express = require("express");
const { Router } = require("express");
const router = Router();
const UserModell = require('../model/user');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req,res) => {
    try {
        const sal = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,sal);
        const newUser = new UserModell({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            passWord: hashedPassword
        });

        await newUser.save();
        res.status(200).json(newUser);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

//login
router.post('/login', async (req,res) => {
    try {
        const user = await UserModell.findOne({email: req.body.email});
        !user && res.status(400).json('Wrong Credentials')

        const validate = await bcrypt.compare(req.body.password,user.passWord);
        !validate && res.status(400).json('wrong Credentials');

        const {passWord, ...others} = user;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;