const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 8;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: function (email){
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      },
      message: 'email invalid!' 
    }
  },
  password: {
    type: String,
    required: [true, 'password consists of minimum 6 characters with combination of letter and number']
  }
}, {timestamps: true})

UserSchema.pre('save', function (next){
  let user = this;
  
  if(!user.isModified('password')){
    return next();
  }

  bcrypt.genSalt(saltRounds, function(err, salt){
    if(err) {
      throw err;
    }

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) {
        throw err;
      }
      
      user.password = hash;
      return next()
    })
  })
})

UserSchema.methods.checkPwd = function (pwd, cb){
  let user = this;
  bcrypt.compare(pwd, user.password, function(err, isMatched){
    if(err) {
      throw err;
    }  
    cb(isMatched)
  })
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
