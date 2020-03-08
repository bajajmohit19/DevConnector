const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Posts')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

//  @route    POST api/posts
//  @desc     Create a post
//  @access   Private
router.post('/', [auth, [
    check('text', 'Text is Required')
        .not()
        .isEmpty()
]], async (req, res) => {
    console.log(req.user.id)
    return new Promise((resolve) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        User.findById(req.user.id).select('-password').exec((err, data) => {
            if (err || !data) {
                return resolve({ msg: 'No user with the given id' })
            }
            if (data) {
                const newPost = new Post({
                    text: req.body.text,
                    name: data.name,
                    avatar: data.avatar,
                    user: req.user.id
                })
                console.log(newPost)
                newPost.save()
                return resolve(res.status(200).json(newPost))


            }
        })

    })



})

//  @route    GET api/posts
//  @desc     Get all posts
//  @access   Private

router.get('/', auth, async (req, res) => {
    return new Promise((resolve) => {
        Post.find().sort({ date: -1 }).exec((err, data) => {
            if (err || !data) {
                return resolve(res.status(400).json({ msg: 'error finding posts' }))
            }
            if (data) {
                return resolve(res.status(200).json(data))
            }
        })
    })
})

//  @route    GET api/post/:id
//  @desc     Get post by id
//  @access   Private

router.get('/:id', auth, async (req, res) => {
    return new Promise((resolve) => {
        Post.findById(req.params.id).exec((err, data) => {
            if (err || !data) {
                return resolve(res.status(400).json({ msg: 'Post not found' }))
            }

            if (data) {
                return resolve(res.status(200).json(data))
            }
        })
    })
})

//  @route    DELETE api/post/:id
//  @desc     Delete a post
//  @access   Private

router.delete('/:id', auth, async (req, res) => {
    console.log(req.user)
    return new Promise((resolve) => {
        Post.findById(req.params.id).exec((err, data) => {
            if (err || !data) {
                return resolve(res.status(400).json({ msg: 'Post not found' }))
            }
            // Chech User
            console.log(data)
            if (data.user.toString() !== req.user.id) {
                return resolve(res.status(401).json({ msg: 'User Not Authroised' }))
            }
            if (data) {
                data.remove();
                return resolve(res.status(200).json({ msg: ' Post removed' }))
            }
        })
    })
})

//  @route    PUT api/post/like/:id
//  @desc     Like a post
//  @access   Private

router.put('/like/:id', auth, async (req, res) => {
    console.log(req.user, req.params)
    return new Promise((resolve) => {
        Post.findById(req.params.id).exec((err, data) => {
            if (err || !data) {
                return resolve(res.status(400).json({ msg: 'Post not Found' }))
            }
            if (data) {
                if (data.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return resolve(res.status(400).json({ msg: 'Post already Liked' }))
                }
                data.likes.unshift({ user: req.user.id })
                data.save()
                return resolve(res.status(200).json(data.likes))
            }
        })
    })
})

//  @route    PUT api/post/unlike/:id
//  @desc     UnLike a post
//  @access   Private

router.put('/unlike/:id', auth, async (req, res) => {
    console.log(req.user, req.params)
    return new Promise((resolve) => {
        Post.findById(req.params.id).exec((err, data) => {
            if (err || !data) {
                return resolve(res.status(400).json({ msg: 'Post not Found' }))
            }
            if (data) {
                if (data.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    return resolve(res.status(400).json({ msg: 'Post has not been liked yet' }))
                }
                const removeIndex = data.likes
                    .map(like => like.user.toString())
                    .indexOf(req.user.id)
                console.log(removeIndex)
                data.likes.splice(removeIndex, 1)
                data.save()
                return resolve(res.status(200).json(data.likes))
            }
        })
    })
})

//  @route    POST api/posts/comments/:id
//  @desc     Comment on a post
//  @access   Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is Required')
        .not()
        .isEmpty()
]], async (req, res) => {
    console.log(req.user.id)
    return new Promise((resolve) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        User.findById(req.user.id).select('-password').exec((err, data) => {
            if (err || !data) {
                return resolve({ msg: 'No user with the given id' })
            }
            if (data) {
                console.log(data)
                Post.findById(req.params.id).exec((err, data1) => {
                    if (err || !data1) {
                        return resolve(res.status(400).json({ msg: 'Error in finding post' }))
                    }

                    const newComment = {
                        text: req.body.text,
                        name: data.name,
                        avatar: data.avatar,
                        user: req.user.id
                    }
                    data1.comments.unshift(newComment)
                    data1.save()
                    return resolve(res.json(data1.comments))
                })



            }
        })

    })



})

//  @route    DELETE api/posts/comment/:id/:comment_id
//  @desc     Delete a comment
//  @access   Private

router.delete('/comment/:id/:comment_id', auth, async(req, res)=>{
    return new Promise((resolve)=>{
        Post.findById(req.params.id).exec((err, data)=>{
            if(err || !data){
                return resolve(res.status(400).json({msg:'Post not found'}))
            }
            if(data){
                const comment = data.comments.find(comment => comment.id === req.params.comment_id)
                if(!comment){
                    return resolve(res.status(400).json({msg:'Comment does not exist'}))
                }
                if(comment.user.toString() !== req.user.id){
                    return resolve(res.status(400).json({msg:'User not authorised'}))
                }

                const removeIndex = data.comments
                                        .map(comment => comment.user.toString())
                                        .indexOf(req.user.id)
                console.log(removeIndex)
                data.comments.splice(removeIndex, 1)
                data.save()
                return resolve(res.status(200).json(data.comments))
            }
        })
    })
})

module.exports = router;
