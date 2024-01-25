const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorization = (req, res,next)=>{
    const token = req.headers?.authorization?.split(' ')[1] || req.headers?.authorization;
    try{
        if(!token) return res.status(404).send({Error: 'Token Missing'});
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    }catch(err){
        res.status(404).send({Error: err.message});
    }
}

module.exports = authorization;