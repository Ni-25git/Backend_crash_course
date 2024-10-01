const checkAccess = (requiredRole)=>{
    return (req,res,next)=>{

        if (!req.user) {
            return res.status(403).json({ msg: 'No user data found. Authorization required.' });
        }
        
        if(req.user.role!= requiredRole){
            return res.status(401).json({msg:'Access denied'})
        }
        next()
    }
}

module.exports = checkAccess