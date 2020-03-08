const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const config = require('config')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//  @route    GET api/users 
//  @desc     Register user
//  @access   Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password',
        'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        return new Promise(async (resolve) => {
            const { name, email, password } = req.body
            const errors = validationResult(req)
            console.log(errors)
            if (!errors.isEmpty()) {
                console.log("ASdd")
                return resolve(res.status(400).json({errors: errors.array() }))
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const userObj = new User({
                name, email, avatar, password
            })
            const salt = await bcrypt.genSalt(10);
            userObj.password = await bcrypt.hash(password, salt);
            console.log(userObj.password, userObj)

            userObj.save(async (err, doc) =>{
                if(err || !doc){
                    if(err.code == 11000){
                        console.log("qddqqdqddqdqqd", err)
                        return resolve(res.status(400).json({err, msg:'This Email Id already exists'}))
                    }
                    return resolve(res.status(400).json({err, msg:'Error Saving User details'}))
                }
                const payload = {
                    user: {
                        id: userObj.id,
                        email: userObj.email,
                        name: userObj.name
                    }
                }
                jwt.sign(payload,
                    config.get('jwtSecret'),
                    { expiresIn: '1d' },
                    (err, token) => {
                        console.log("121212121",err)
                        if (err) {console.log("qdewyweh");throw err}
                        return resolve(res.status(200).json({doc, token,msg:'User Registered Successfully'} ))
                    })

            })

              

        })
    })





        // const { name, email, password } = req.body
        // console.log("12312321312", req.body)
        // const errors = validationResult(req)
        // console.log("asasas", errors)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({errors: errors.array()})
        // }

        // // See if the user exists
        // try{
        // const users = await User.findOne({ email })
        // console.log("1111111111111111", users)
        // if (users) {
        //     console.log("innnnnn")
        //     return res.status(400).json({  msg: 'User already exist' })
        // }

        // const avatar = gravatar.url(email, {
        //     s: '200',
        //     r: 'pg',
        //     d: 'mm'
        // })

        // user = new User({
        //     name,
        //     email,
        //     avatar,
        //     password
        // })
        // const salt = await bcrypt.genSalt(10);

        // user.password = await bcrypt.hash(password, salt);

        // await user.save();

        // const payload = {
        //     user: {
        //         id: user.id,
        //         email: user.email,
        //         name: user.name
        //     }
        // }
        // jwt.sign(payload,
        //     config.get('jwtSecret'),
        //     { expiresIn: '1d' },
        //     (err, token) => {
        //         if (err) throw err
        //         res.json({ token })
        //     })
        // }catch(err){
        //     console.error(err.message)
        //     res.status(500).send("Server error")

        // }
        // })

        // Get users gravatar


        // Encrypt the password


        // Return json web token

        // res.send('User route')

module.exports = router;