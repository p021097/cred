import cardModel from '../models/cardModel.js'
import fs from 'fs'

// add card

const addCard = async (req, res) => {
    const card = new cardModel({
        cardNumber:req.body.cardNumber,
        expiryDate : req.body.expiryDate,
        nameOnTheCard: req.body.nameOnTheCard
    })

    try {
        await card.save()
        res.json({success:true, message:"Card added successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})

    }
}

// List cards

const listCard = async (req, res) => {
    try {
        const cards = await cardModel.find({})
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