 const express = require('express')
 const router = express.Router();
 const {check, validationResult} = require('express-validator')
 const config = require('config')
 const User = require('../../models/User')
 const gravatar = require('gravatar')
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')

//  @route    GET api/users 
//  @desc     Register user
//  @access   Public
router.post('/',[
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password',
    'Please enter a password with 6 or more characters').isLength({ min: 6})
],
async (req, res) => {
    const {name, email, password} = req.body
    console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array() });
    }

    // See if the user exists
    const users = await User.findOne({ email })
    console.log(users)
    if(users){
       return res.status(400).json({errors: [{msg: 'User already exists '}]})
    }

    const avatar =  gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    user = new User({
        name,
        email,
        avatar,
        password
    })
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
        user:{
            id: user.id,
            email: user.email,
            name:user.name    
    }
}
    jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn: '1d'},
            (err, token)=>{
                if(err) throw err
                res.json({ token })
            })

    // Get users gravatar

    
    // Encrypt the password


    // Return json web token

    // res.send('User route')
})

module.exports = router;