import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// login user

const loginUser = async (req, res) => {
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createtoken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})
    }

}


const createtoken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


// register user

const registerUser = async (req, res) => {
    const {name, password, email} = req.body

    try {
        // checking user is already exist
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false, message:"User already exist"})
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter strong password"})
        }

        // hashing user passowrd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newuser = new userModel({
            name : name,
            email:email,
            password : hashedPassword
        })

        const user = await newuser.save()
        const token = createtoken(user._id)
       res.json({success:true, token})


    } catch (error) {
       console.log(error); 
       res.json({success:false, message:error})
    }

}

export {
    loginUser,
    registerUser
}