import cardModel from "../models/cardModel.js";


const listTransactions = async (req, res) => {
    try {
        const { cardId } = req.query;
        const transactions = await cardModel.findOne({ _id: cardId }).select('statementData');
        res.json({ success: true, transactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
  };

  
  export {listTransactions}