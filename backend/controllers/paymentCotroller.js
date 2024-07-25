import cardModel from "../models/cardModel.js";
import paymentModel from "../models/paymentModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// making payment from frontend

const placePayment = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newPayment = new paymentModel({
      userId: req.userId,
      card: req.body.card,
      amount: req.body.amount,
    });

    await newPayment.save();

    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: req.body.card.cardNumber,
          },
          unit_amount: req.body.amount * 100, // Stripe requires amount in cents
        },
        quantity: req.body.quantity,
      },
    ];
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&paymentId=${newPayment._id}`,
      cancel_url: `${frontend_url}/verify?success=false&paymentId=${newPayment._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

const verifyPayment = async (req, res) => {
  const { paymentId, success } = req.body;
  try {
    if (success == "true") {
      await paymentModel.findByIdAndUpdate(paymentId, { payment: true });
      res.json({ success: true, message: "Payment is Successful" });
    } else {
      await paymentModel.findByIdAndDelete(paymentId);
      res.json({ success: false, message: "Payment is Unsuccessful" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error});

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

export { placePayment, verifyPayment, updateRemainingAmount };
