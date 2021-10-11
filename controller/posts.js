const express = require("express");
const { Router } = require("express");
const router = Router();
const postModel = require('./../model/posts');

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



router.post('/', (req, res) => {
    const post = new postModel({
        title: req.body.title,
        description: req.body.description
    });
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    })
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