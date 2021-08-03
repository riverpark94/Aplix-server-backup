const jwt = require('jsonwebtoken');
let secretObj = require("../config/jwt");

const tokenCheck = (req ,res, next) => {
    const {authorization} = req.headers;
    const token = authorization.split(" ");
    const secret = secretObj.secret;
    // console.log("middleware:" , req.headers)
    if(!token[1]){
        res.status(403).json({
            success: false,
            message: 'unvaild token'
        })
    }

    const check = new Promise((resolve, reject) => {
        jwt.verify(token[1], secret, (err, decoded) => {
            if(err) reject(err);
            resolve(decoded)
        })
    })
    

    check.then(user => {
        // console.log(user)
        req.user = user;
       
        next();
    }).catch(err => {
        console.log(err)
    })
}

module.exports= tokenCheck;