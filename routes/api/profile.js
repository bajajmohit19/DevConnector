const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const request = require('request')
const config = require('config')
const { check, validationResult } = require('express-validator')


//  @route    GET api/profile/me
//  @desc     Get current users profile
//  @access   Private
router.get('/me', auth, async (req, res) => {
    console.log(req.user.id)
    console.log("innnnnnnnnn")
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if (!profile) {
        console.log("aaaaaaa",profile)

            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' })
        }
        console.log("aaaaaaa",profile)

        res.send(profile)

    } catch (err) {
        console.error(err.message)
        res
            .status(500)
            .json(err, { msg: 'Server Error' })
    }
})

//  @route    POST api/profile/
//  @desc     Create or update user profile
//  @access   Private

router.post('/', [auth, [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills are required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills, youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body
    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id

    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        console.log(skills)
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    console.log(profileFields.skills)
    profileFields.social = {}

    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram
    if (facebook) profileFields.social.facebook = facebook


    try {
        // Update
        let profile = await Profile.findOne({ user: req.user.id })
        console.log(profile)
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
            return res.send(profile)
        }

        // Create
        profile = new Profile(profileFields)
        await profile.save();
        res.send(profile)

    } catch (error) {
        console.error(error)
        res.status(400).json({ errors: errors.array() })
    }

})

//  @route    GET api/profile
//  @desc     Get all  profiles
//  @access   Public

router.get('/', async (req, res) => {
    let profiles = await Profile.find().populate('user', ['name', 'avatar'])
    console.log(profiles)
    res.status(200).json(profiles)
})

//  @route    GET api/profile/user/:user_id
//  @desc     Get profile by userid
//  @access   Public

router.get('/user/:user_id', async (req, res) => {

    return new Promise((resolve) => {
        let profile = Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        profile.exec(async (err, data) => {
            if (err || !data) {
                return resolve(res.status(400).json({ msg: 'Profile Not Found' }))
            }
            if (data) {

                return resolve(res.status(200).json(data))
            }
        })
    })



})

//  @route    DELETE api/profile
//  @desc     Delete profile user and post
//  @access   Private

router.delete('/', auth, async (req, res) => {

    return new Promise((resolve) => {

        // @todo remove users posts

        // Remove profile
        Profile.deleteOne({ user: req.user.id }).exec(async (err, data) => {
            if (err || !data) {
                return resolve(res.status(400).json({ msg: 'Error In Profile Deletion', err }))
            }
            if (data) {
                User.deleteOne({ _id: req.user.id }).exec(async (err, data) => {
                    if (err || !data) {
                        return resolve(res.status(400).json({ msg: 'User and Profile Not Deleted' }))
                    }
                    if (data) {

                        return resolve(res.status(200).json({ msg: 'User and Profile Deleted' }))
                    }
                })
            }
        })




    })



})

//  @route    PUT api/profile/experience
//  @desc     Add profile experience
//  @access   Private

router.put('/experience', [auth, [
    check('title', 'Title is required')
        .not()
        .notEmpty(),
    check('company', 'Company is required')
        .not()
        .notEmpty(),
    check('from', 'From date is required')
        .not()
        .notEmpty()
]
],
    async (req, res) => {
        console.log("WEFweew")
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            title,
            company,
            location,
            from, to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company, location,
            from,
            to,
            current,
            description
        }

        return new Promise((resolve) => {
            Profile.findOne({ user: req.user.id }).exec(async (err, data) => {
                console.log(data)
                if (err || !data) {
                    return resolve(res.status(400).json({ msg: "Error in profile updation" }, err))
                }
                if (data) {
                    data.experience.unshift(newExp)
                    console.log(data)
                    data.save()
                    return resolve(res.status(200).json({ msg: "Experience updated successfully", data }))
                }
            })
        })

    }
)

//  @route    Delete api/profile/experience/:exp_id
//  @desc     Delete experience from profile experience
//  @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) =>{
    return new Promise((resolve)=>{
        Profile.findOne({user: req.user.id}).exec((err, data)=>{
            if(err || !data){
                return resolve(res.status(400).json({msg:'Error in deleting experience'}))
            }
            if(data){
                const removeIndex = data.experience.map(item =>item.id).indexOf(req.params.exp_id);
                data.experience.splice(removeIndex, 1);

                data.save();
                return resolve(res.status(200).json( {data, msg:'Experience deleted Successfully'}))
            }
        })
    })
})


//  @route    PUT api/profile/education
//  @desc     Add profile education
//  @access   Private

router.put('/education', [auth, [
    check('school', 'School is required')
        .not()
        .notEmpty(),
    check('degree', 'Degree is required')
        .not()
        .notEmpty(),
    check('fieldofstudy', 'Field of study date is required')
        .not()
        .notEmpty()
]
],
    async (req, res) => {
        console.log("WEFweew") 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            school,
            degree,
            fieldofstudy,
            from, to,
            current,
            description
        } = req.body

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        return new Promise((resolve) => {
            Profile.findOne({ user: req.user.id }).exec(async (err, data) => {
                console.log(data)
                if (err || !data) {
                    return resolve(res.status(400).json({ msg: "Error in education updation" }, err))
                }
                if (data) {
                    data.education.unshift(newEdu)
                    console.log(data)
                    data.save()
                    return resolve(res.status(200).json({ msg: "Education updated successfully", data }))
                }
            })
        })

    }
)

//  @route    Delete api/profile/education/:edu_id
//  @desc     Delete education from profile experience
//  @access   Private
router.delete('/education/:edu_id', auth, async (req, res) =>{
    return new Promise((resolve)=>{
        Profile.findOne({user: req.user.id}).exec((err, data)=>{
            if(err || !data){
                return resolve(res.status(400).json({msg:'Error in deleting education'}))
            }
            if(data){
                const removeIndex = data.education.map(item =>item.id).indexOf(req.params.edu_id);
                data.education.splice(removeIndex, 1);

                data.save();
                return resolve(res.status(200).json( {data, msg:'Experience deleted Successfully'}))
            }
        })
    })
})

//  @route    Get api/profile/github/:username
//  @desc     Get user repos from github
//  @access   Public

router.get('/github/:username',async (req, res)=>{
    return new Promise((resolve)=>{
            const options = {
                uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
                method:"GET",
                headers:{'user-agent': 'node.js'}
            }
           request(options, (error, response, body)=>{
               if(error) console.error(error)
               if(response.statusCode !== 200){
                   return resolve(res.status(200).json({msg:'No github profile found'}))
               }
               return resolve(res.status(200).json(JSON.parse(body)))
           }) 
    })
})


module.exports = router;