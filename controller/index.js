const express = require("express");
const { Router } = require("express");
const router = Router();
const UserModell = require('./../model/index');

router.get('/', async function (req, res) {
    try {
        const users = await UserModell.find();
        res.json(users);
    }
    catch(err) {
        res.json({message: err});
    }
})




router.post('/', (req, res) => {
    const user = new UserModell({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    user.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    })
})

//get specific posts
router.get('/:userId',async (req, res) => {
    try {
        console.log(req.params.userId);
        const user = await UserModell.findById(req.params.userId);
        res.json(user);
    }
    catch(err) {
        res.json({message: err});
    }
});

//delete a post
router.delete('/:userId',async (req, res) => {
    try {
        const removeUser = await UserModell.remove({_id: req.params.userId});
        res.json(removeUser);
    }
    catch(err) {
        res.json({message: err});
    }
});

//update a post
router.patch('/:userId',async (req, res) => {
    try {
        const updateUser = await UserModell.updateOne(
            {_id: req.params.userId}, 
            {$set: {
                name: req.body.name
            }});
        res.json(updateUser);
    }
    catch(err) {
        res.json({message: err});
    }
});

module.exports = router;