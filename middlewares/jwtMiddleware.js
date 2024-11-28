const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{

    console.log("inside jwtMiddleware");
    // get token from req header "Authorization key"
    const token =req.headers["authorization"].split(" ")[1]
    console.log(token);
    // step to verify token
   if(token){
    try{
        const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
        console.log(jwtResponse);
        // userid in user controller
        req.userId = jwtResponse.userId
        next()
    }catch{
        res.status(401).json("Please login to proceed the Step!!!! Authentication failed....")
    }
    
   }else{
    res.status(405).json("Authentication failed... Token Missing!!!")
   }
}

module.exports = jwtMiddleware