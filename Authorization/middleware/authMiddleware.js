const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    try {
        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({msg:'Please provide token first'})
        };

        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);

        if(decoded){
            req.user = decoded
            next()
        }else{
            return res.status(401).json({msg:'Please enter Valid Token here'})
        }
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

module.exports = authMiddleware