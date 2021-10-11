const express = require("express");
const { Router } = require("express");
const router = Router();
const postModel = require('./../model/posts');
const UserModel = require('./../model/index');

//get all posts
router.get('/',async (req, res) => {
    try {
        const posts = await postModel.find();
        res.json(posts);
    }
    catch(err) {
        res.json({message: err});
    }
});



router.post('/:userID', async (req, res) => {
    const post = new postModel({
        title: req.body.title,
        description: req.body.description
    });
    const user = await UserModel.findById(req.params.userID);
    post.owner = user;
    await post.save();
    user.posts.push(post);
    await user.save();
    res.status(201).json(post);
    
})



//get specific posts
router.get('/:postId',async (req, res) => {
    try {
        console.log(req.params.postId);
        const post = await postModel.findById(req.params.postId);
        res.json(post);
    }
    catch(err) {
        res.json({message: err});
    }
});

//delete a post
router.delete('/:postId',async (req, res) => {
    try {
        const removePost = await postModel.remove({_id: req.params.postId});
        res.json(removePost);
    }
    catch(err) {
        res.json({message: err});
    }
});

//update a post
router.patch('/:postId',async (req, res) => {
    try {
        const updatePost = await postModel.updateOne(
            {_id: req.params.postId}, 
            {$set: {
                title: req.body.title
            }});
        res.json(updatePost);
    }
    catch(err) {
        res.json({message: err});
    }
});

module.exports = router;