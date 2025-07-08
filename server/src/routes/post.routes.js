// server/routes/posts.js
import express from 'express';
import {getAllPosts,createPost} from '../controllers/post.controllers.js';
const router=express.Router();

router.get('/',getAllPosts);
router.post('/', createPost);

router.get('/:id',async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({msg: 'Failed to fetch post'});
    }
});

export default router;