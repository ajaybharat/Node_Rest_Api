const express = require("express");
const { Router } = require("express");
const router = Router();
const UserModell = require('../model/user');

//get all users
router.get('/', async function (req, res) {
    try {
        const users = await UserModell.find();
        res.json(users);
    }
    catch(err) {
        res.json({message: err});
    }
})

//get all user posts
router.get('/:userID/posts',async (req, res) => {
    try {
        const Userposts = await UserModell.findById(req.params.userID);
        res.json(Userposts.posts);
    }
    catch(err) {
        res.json({message: err});
    }
});


// router.post('/', (req, res) => {
//     const user = new UserModell({
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email
//     });
//     user.save()
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => {
//         res.json({message: err});
//     })
// })

//get specific user
router.get('/:userId',async (req, res) => {
    try {
        console.log(req.params.userId);
        const user = await UserModell.findById(req.params.userId);
        const {password, ...others} = user._doc;
        res.json(others);
    }
    catch(err) {
        res.json({message: err});
    }
});

//delete a user
router.delete('/:userId',async (req, res) => {
    try {
        const removeUser = await UserModell.remove({_id: req.params.userId});
        res.json(removeUser);
    }
    catch(err) {
        res.json({message: err});
    }
});

//update a user
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

//follow a user
router.put('/:id/follow', async (req,res) => {
    if(req.body.userid !== req.params.id) {
        try {
            const user = await UserModell.findById(req.params.id);
            const currentUser = await UserModell.findById(req.body.userid);
            if(!user.followers.include(req.body.userid)) {
                user.followers.push(req.body.userid);
                await user.updateOne({ $push: { followers: req.body.userid } });
                await currentUser.updateOne({ $push: { followins: req.params.id } });
                res.status(200).json("user is followed");
            }
            else {
                res.status(403).json("you already followed");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you can't follow yourself");
    }
});

//unfollow a user
router.put('/:id/unfollow', async (req,res) => {
    if(req.body.userid !== req.params.id) {
        try {
            const user = await UserModell.findById(req.params.id);
            const currentUser = await UserModell.findById(req.body.userid);
            if(!user.followers.include(req.body.userid)) {
                user.followers.push(req.body.userid);
                await user.updateOne({ $pull: { followers: req.body.userid } });
                await currentUser.updateOne({ $pull: { followins: req.params.id } });
                res.status(200).json("user is unfollowed");
            }
            else {
                res.status(403).json("you don't follow this user");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you can't unfollow yourself");
    }
});

module.exports = router;