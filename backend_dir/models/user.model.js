const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
   // userName: {type:String, required:true},
    password: {type:String, required:true},
    email : {type:String, required:true},
    is_host : {type:Boolean, requied:true},
}, {
    timestamps : true,
});


//static register method
userSchema.statics.register = async function(email,password) {
    //validation
    if(!email || !password){
        throw Error('Fields cant be blank')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please use a strong password. Try alphanumeric values with legth greater than 8')
    }


    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, is_host: 0})

    return user
}


//login
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('Fields cant be blank')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Invalid credentials, if you are not registered. Please Register')

    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user


}

module.exports = mongoose.model('User', userSchema)


