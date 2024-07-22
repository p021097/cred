import cardModel from '../models/cardModel.js'
import fs from 'fs'
import userModel from '../models/userModel.js'

// add card

const addCard = async (req, res) => {
    try {
        const {cardNumber, expiryDate, nameOnTheCard} = req.body
        const userId = req.userId
        const user  = await userModel.findById(userId)
        if(!userId){
            return res.status(404).json({success:false, message: 'User not found' });
        }else{
            console.log(user.name);
        }
        const newCard = new cardModel({cardNumber, expiryDate, nameOnTheCard, user:user._id})
        await newCard.save()
        user.cardData.push(newCard._id)
        await user.save()
        return res.status(201).json(newCard);
    } catch (error) {
        return res.status(404).json({ success:false, message: error });
    }
    // const card = new userModel({
    //     cardNumber:req.body.cardNumber,
    //     expiryDate : req.body.expiryDate,
    //     nameOnTheCard: req.body.nameOnTheCard
    // })

    // try {
    //     await card.save()
    //     res.json({success:true, message:"Card added successfully"})
    // } catch (error) {
    //     console.log(error);
    //     res.json({success:false, message:"Error"})

    // }
}

// List cards

const listCard = async (req, res) => {
    try {
        const userId = req.userId
        const cards = await cardModel.find({user:userId})
        res.json({success:true, data:cards})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})

    }
}

// remove cards

const removeCard = async (req, res) => {
    try {
        await cardModel.findByIdAndDelete(req.body._id)
        res.json({success:true, message:"Card is removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})

    }

}


export {
    addCard,
    listCard,
    removeCard
}