const express = require("express");
const { Router } = require("express");
const router = Router();
const postModel = require('./../model/posts');
const UserModel = require('./../model/user');

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



// create post with userID
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

//like & unlike a post

router.put("/:id/likeUnlike", async (req,res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userid)) {
            await post.updateOne({ $push: { likes: req.body.userid } });
            res.status(200).json("The post is liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userid } });
            res.status(200).json("The post is disliked");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//get timeline posts

router.get("/timeline/all", async (req,res) => {
    try {
        const currentUser = await UserModel.findById(req.body.userid);
        const userposts = await postModel.find({owner:req.body.userid});
        const friendPosts = await Promise.all(
            currentUser.followins.map(friend => {
                return postModel.find({owner:friend});
            })
        )
        res.json(userposts.concat(...friendPosts));
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;