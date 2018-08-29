const User = require('../models/user');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const nodemailer = require('nodemailer');
let aws = require('aws-sdk');

const signup = (req, res) => {
  const { name, email, password} = req.body;
  User.findOne({email})
  .then(user => {
    if(!user){
      return User.create({
        name,
        email,
        password 
      })
      .then(newUser => {
        let token = jwt.sign({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email
        }, process.env.secretKey)

        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: 'fuasrb4x2gr7dxk7@ethereal.email',
              pass: 'A2Eue17JWx4uVFhGyn'
          },
          tls: {
            rejectUnauthorized: false
          }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Hacktiv Overflow 👻" <helper@h.overflow.com>', // sender address
          to: `${email}`, // list of receivers
          subject: 'Your Registration Complete', // Subject line
          text: 'Hello world?', // plain text body
          html: `
            <h2>Registration info:</h2>
            <p>Name:${name}</p>
            <p>Email:${email}</p>
            <p>Login to your account:</p>
            <p><a href="http://localhost:3000/">Continue</a></p>
          `
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          res.status(201).json({token, name: newUser.name, url: nodemailer.getTestMessageUrl(info)})
        });

      })
    } else {
      res.status(400).json({message: 'email already used'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

const signin = (req, res) => {
  const {email, password} = req.body;

  User.findOne({email})
  .then( user => {
    if(!user){
      res.status(404).json({message: 'user not registered'})
    } else {
      user.checkPwd(password, (isMatched) => {
        if (isMatched){
          let token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email
          }, process.env.secretKey)

          res.status(200).json({
            token,
            name: user.name,
          })
        } else {
          res.status(403).json({message: 'incorrect email / password'})
        }
      })
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

const loginFB = (req, res) =>{
  axios({
    method:'get',
    url:`https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.accessToken}`,
  })  
  .then(({data}) => {
    let userFB = data;

    User.findOne({email: userFB.email})
    .then(userOnDb => {

      if(!userOnDb){
        return User.create({
          name: userFB.name,
          email: userFB.email,
          password: process.env.secretKey
        })
        .then(newUser=> {
          let token = jwt.sign({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
          }, process.env.secretKey)
  
          res.status(201).json({token, name:newUser.name})
        })
      } else {
        let token = jwt.sign({
          _id: userOnDb._id,
          name: userOnDb.name,
          email: userOnDb.email
        }, process.env.secretKey)

        res.status(200).json({token, name:userOnDb.name})
      }
    })
  })
  .catch(err => {
    res.status(500).json(err);
  })
}

module.exports = {
  signup,
  signin,
  loginFB
};
