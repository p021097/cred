import userModel from "../models/userModel.js";

// add card to user

const cardAddedByUser = async (req, res) => {
  try {
    let userData = userModel.findOne({ _id: req.body.userId });
    console.log(userData);
    let cardsData = await userData.cardsData;
    if (!cardsData[req.body.cardId]) {
      cardsData[req.body.cardId] = 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cardsData });
    res.json({ success: true, message: "Card Added Successfully" });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error });
  }
};

const cardRemovedByUser = async (req, res) => {};

const getCards = async (req, res) => {};

export { cardAddedByUser, cardRemovedByUser, getCards };
