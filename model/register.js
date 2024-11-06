const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        minLength:3
    },lastName:{
        type:String,
        required:true,
        lowercase:true,
        minLength:3
    },email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+@.+\..+/, 'Please enter a valid email address']
    },phoneNumber:{
        type:String,
        required:true,
        unique:true,
        match:[/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
    },password:{
        type:String,
        required:true,
        minLength:8,
        validate: {
            validator: function (v) {
                // Regular expression to ensure at least one special character
                return /(?=.*[!@#$%^&*(),.?":{}|<>])/.test(v);
            },
            message: props => `${props.value} must contain at least one special character!`
        }
    }
})

const Register = mongoose.model('Register',userSchema)

module.exports={Register}