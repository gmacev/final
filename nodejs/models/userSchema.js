const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:true,
        default: 'https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif',
    },
    password:{
        type:String,
        required:true
    },
    forgotPasswordId:{
        type: String,
        required:false
    },
    recoverCode:{
        type: String,
        required:false
    },
    recoverInProgress:{
        type:Boolean,
        required:true
    },
    regTimestamp:{
        type:Number,
        required:true
    },
    emailConfirmed:{
        type:Boolean,
        required:true
    },
    deleteUserTimestamp:{
        type:Number,
        required:false
    },
    deleteUser:{
        type:Boolean,
        required:false
    },
    notifyOnNewOffer:{
        type:Boolean,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    phoneNumberChanging: {
        type: Boolean,
        required: true
    },
    phoneVerificationCode: {
        type:Number,
        required:true
    },
    cloudinaryPictureId: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model('userModel', userSchema)