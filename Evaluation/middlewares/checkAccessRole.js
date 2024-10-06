const checkAccessRole= (requiredRole) =>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({msg:'No User Data Found'})
        }

        if(req.user.role !== requiredRole){
            return res.status(401).json({msg:'Access Denied'})
        }
        next()
    }
}

module.exports = checkAccessRole