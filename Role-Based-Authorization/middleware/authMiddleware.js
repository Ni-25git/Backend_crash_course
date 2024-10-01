const jwt = require('jsonwebtoken');
const blacklistToken = require('../blacklist');
const UserModel = require('../models/User');

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({msg:'Please provide token first'})
        }

        if(blacklistToken.includes(token)){
            return res.status(401).json({ message: 'Token is blacklisted' });
        }
        const decoded = jwt.verify(token , process.env.SECRET_KEY);
        if(!decoded){
            return res.status(402).json({msg:'Token not verify'})
        }
        const user = await UserModel.findOne({_id:decoded.id});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const role = user.role;
        console.log('User role:', role);
        req.user = { id: user._id, role: user.role };
        next()
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
};


module.exports = authMiddleware