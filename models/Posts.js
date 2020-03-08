const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
   user:{
       type: Schema.Types.ObjectId,
       ref:'users'
   }  ,
   text:{
       type: String,
       required: true
   },
   name:{
       type: String,
   },
   avatar:{
       type: String
   },
   likes:[
       {
           user: {
               type: Schema.Types.ObjectId,
               ref:'users'
           }
       }
   ],
   comments:[
       {
        avatar:{
            type: String
        },
           name:{
                type: String
           },
        user: {
            type: Schema.Types.ObjectId,
            ref:'users'
        },
        text:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
       }
   ]
})

module.exports = Post = mongoose.model('post', PostSchema)