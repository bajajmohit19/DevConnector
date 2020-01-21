const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    skills:{
        type:[String],
        required: true
    },
    bio:{
        type: String
    },
    githubusername:{
        type: String 
    },
    experience:[
        {
            title:{
                type: String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location:{
                type: String
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type: Date,
                required: true
            },
            current:{
                type: Boolean,
                default: false
            },
            description:{
                type: String
            }
        }
    ],
    education:[
        {
            school:{
                type: String,
                required: true
            },
            degree:{
                type: String,
                required: true
            },
            fieldofstudy:{
                type: String,
                required: true
            },
            from:{
                type: String,
                required: true
            },
            to:{
                type: String
            },
            current:{
                type: Boolean,
                default: false
            },
            description:{
                type: String
            }
        }
    ]
}) 