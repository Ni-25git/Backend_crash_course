const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({msg:'Please provide a Token'})
        };

        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
        
        if(!decoded){
            return res.status(401).json({msg:'Token not verify'})
        };

        const user = await UserModel.findOne({_id:decoded.id});

        if(!user){
            return res.status(401).json({msg:'User not found'})
        };

        const role = user.role;
        console.log(role);
        req.user = {id: user._id , role:user.role}
        next()

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

module.exports = authMiddleware;