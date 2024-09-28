const express = require('express');
const message= express.Router();
const UserModel = require('../models/userModel');
const encrypt = require('../message/encrypt');
const decrypt = require('../message/decrypt');
const CryptoJs = require('crypto-js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()

message.post("/encrypt1" , async (req,res)=>{
    try {
        const {userId , message} = req.body;
        const user = await UserModel.findById(userId);
        

        if (!userId || !message) {
            return res.status(400).json({ msg: 'userId and message are required' });
        }

        const { encryptedMessage, iv } = encrypt(message);

        user.encryptedMessage = encryptedMessage;
        user.iv = iv;
        await user.save()

        console.log(user)
        res.status(201).json({msg:'message should be encrypt' , encryptedMessage})
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

message.post("/decrypt", async (req,res)=>{
   try {
    const {userId ,message } = req.body;

    const user = await UserModel.findById(userId);
     if(!user){
        return res.status(401).json({msg:'User not found'})
     };
     const decryptedMessage = decrypt(message)
     console.log(decryptedMessage);
     res.status(201).json({msg:'Message should be decrypted'})
   } catch (error) {
    res.status(501).json({msg:error.message})
   } 
});

message.post("/encrypt/cryptojs", async (req,res)=>{
    try {
       const {userId , message} = req.body;
       
    const user = await UserModel.findById(userId);

    if(!user){
        return res.status(401).json({msg:'User not found'});
    }

    const encryptedMessage = CryptoJs.AES.encrypt(message , process.env.CRYPTOJS_SECRET_KEY).toString();
     user.encryptedMessage = encryptedMessage;
     await user.save();
     res.status(201).json({msg:'Message should encrypt successfully',encryptedMessage})
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

message.post("/decrypt/cryptojs" , async (req,res)=>{
    try {
        const {encryptedMessage} = req.body;
        
        if(!encryptedMessage){
            return res.status(401).json({msg:'encrypted message not found'});
        }

        const bytes = CryptoJs.AES.decrypt(encryptedMessage , process.env.CRYPTOJS_SECRET_KEY );
        const decryptedMessage = bytes.toString(CryptoJs.enc.Utf8);

        if (!decryptedMessage) {
            return res.status(400).json({ msg: 'Decryption failed. Invalid encrypted message.' });
        }

        res.status(201).json({msg:'Message should decrypt successfully',decryptedMessage})
    } catch (error) {
         res.status(501).json({msg:error.message})
    }
});

message.post("/hash" , async (req,res)=>{
    try {
        const {userId , message} = req.body;

        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(401).json({msg:'User not found'});
        }

        const hashedMessage= crypto.createHash('sha256').update(message).digest('hex');

        user.hashedMessage = hashedMessage;
        await user.save();
        res.status(201).json({msg:'Message hashed successfully',hashedMessage})

    } catch (error) {
         res.status(501).json({msg:error.message})
    }
})

message.post("/verify" , async (req,res)=>{
    try {
        const {userId , message} = req.body;

        const user = await UserModel.findById(userId);

        if (!user || !user.hashedMessage) {
            return res.status(404).json({ msg: 'User or hashed message not found' });
        }

        const hashedMessage= crypto.createHash('sha256').update(message).digest('hex');

        const isValid = crypto.timingSafeEqual(
            Buffer.from(user.hashedMessage, 'hex'), 
            Buffer.from(hashedMessage, 'hex')
        );

        if (isValid) {
            res.status(200).json({ msg: 'Message verified successfully' });
        } else {
            res.status(400).json({ msg: 'Message verification failed' });
        }
   

    } catch (error) {
         res.status(501).json({msg:error.message})
    }
});

message.post("/hash/bcrypt" , async (req,res)=>{
    try {
        const {userId , message} = req.body;

        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(401).json({msg:'User not found'});
        }

        const hashedMessage= await bcrypt.hash(message, saltRounds);;

        user.hashedMessage = hashedMessage;
        await user.save();
        res.status(201).json({msg:'Message hashed successfully',hashedMessage})

    } catch (error) {
         res.status(501).json({msg:error.message})
    }
});

message.post("/verify/bcrypt" , async (req,res)=>{
    try {
        const {userId , message} = req.body;

        const user = await UserModel.findById(userId);

        if(!user || !user.hashedMessage){
            return res.status(401).json({msg:'User and hashed message not found'});
        }

        const isValid= await bcrypt.compare(message, user.hashedMessage);

        if (isValid) {
            res.status(200).json({ msg: 'Message verified successfully using bcrypt' });
        } else {
            res.status(400).json({ msg: 'Message verification failed using bcrypt' });
        }


    } catch (error) {
         res.status(501).json({msg:error.message})
    }
})

  



  module.exports= message