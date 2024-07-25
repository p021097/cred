import cardModel from "../models/cardModel.js";
import userModel from "../models/userModel.js";


// add card

const addCard = async (req, res) => {
  try {
    const { cardNumber, expiryDate, nameOnTheCard } = req.body;
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const newCard = new cardModel({
      cardNumber,
      expiryDate,
      nameOnTheCard,
      user: user._id,
    });
    await newCard.save();
    user.cardData.push(newCard._id);
    await user.save();
    return res.status(201).json({success:true, newCard});
  } catch (error) {
    return res.status(404).json({ success: false, message: error });
  }
};

// List cards

const listCard = async (req, res) => {
  try {
    const userId = req.userId;
    const cards = await cardModel.find({ user: userId });
    res.json({ success: true, cards });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

// remove cards

const removeCard = async (req, res) => {
  try {
    await cardModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Card is removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};


const updateRemainingAmount = async (req, res) => {
  const { cardId, remainingAmount } = req.body;

  try {
    // Update the remaining amount in your database
    await cardModel.updateOne({ _id: cardId }, { remainingAmount });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


const getCardDetails = async (req, res) => {
  const { cardId } = req.body;
  try {
    const card = await cardModel.findById(cardId).select('remainingAmount');
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }
    res.json({ success: true, card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export { addCard, listCard, removeCard, updateRemainingAmount, getCardDetails };
