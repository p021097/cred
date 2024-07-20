import React from "react";
import "./CardItem.css";
import { useNavigate } from "react-router-dom";


const CardItem = ({ id, cardNumber, expiryDate, nameOnTheCard }) => {

  cardNumber = cardNumber.toString()

  const navigate = useNavigate()


const formatCardNumber = (cardNum) => {
    return cardNum.replace(/(\d{4})(?=\d)/g, '$1-');
}

  return (
    <div className="card-item" key={id}>
      <div className="card-number"> Card Number - {formatCardNumber(cardNumber)}</div>
      <div className="card-content">
        <div className="expiry-date">Expiry Date - {expiryDate}</div>
        <div className="name-on-the-card">Name on Card - {nameOnTheCard}</div>
      </div>
      <button>Pay bill</button>
      <button onClick={() => navigate('/statement')}>View smart statement</button>
    </div>
  );
};

export default CardItem;
