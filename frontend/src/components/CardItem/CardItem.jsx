// import React from "react";
import { useContext } from "react";
import "./CardItem.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContex";


const CardItem = ({ id, cardNumber, expiryDate, nameOnTheCard,}) => {

  const {setStatementCardNumber,} = useContext(StoreContext)
  cardNumber = cardNumber.toString()

  const navigate = useNavigate()

const handle = () => {
  setStatementCardNumber(
    {
      cardId : id,
      cardNumber : cardNumber,
      expiryDate :expiryDate,
      nameOnTheCard:nameOnTheCard,
    }
  )
  navigate('/statement')
}

const handlePayment = () => {
  setStatementCardNumber(
    {
      cardId : id,
      cardNumber : cardNumber,
      expiryDate :expiryDate,
      nameOnTheCard:nameOnTheCard}
  )
  navigate('/payment')

}


const formatCardNumber = (cardNum) => {
    return cardNum.replace(/(\d{4})(?=\d)/g, '$1-');
}

  return (
    <div className="card-item" key={id}>
      <div className="card-number"> <span>Card Number -</span> {formatCardNumber(cardNumber)}</div>
      <div className="card-content">
        <div className="expiry-date"><span>Expiry Date -</span> {expiryDate}</div>
        <div className="name-on-the-card"><span>Name on Card -</span> {nameOnTheCard}</div>
      </div>
      <button onClick={handlePayment}>Pay bill </button>
      <button onClick={handle}>View smart statement</button>
    </div>
  );
};

export default CardItem;
