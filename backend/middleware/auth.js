import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) =>{
    const token = req.headers.token

    if (!token) {
        return res.json({success:false, message:"Not Authorised login again"})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})

    }
}

export default authMiddleware