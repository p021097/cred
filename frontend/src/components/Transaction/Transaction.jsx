import React, { useContext } from "react";
import "./Transaction.css";
import { StoreContext } from "../../context/StoreContex";

const Transaction = () => {
  const { card_transactions } = useContext(StoreContext);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Date</p>
          <p>Particulars</p>
          <p>Type</p>
          <p>Category</p>
          <p>Amount</p>
        </div>
        <br />
        <hr />
        {card_transactions.map((trn, idx) => {
          return (
            <div>
              <div key={idx} className="cart-items-title cart-items-item">
                <p>{trn.date}</p>
                <p>{trn.vendor}</p>
                <p>{trn.type}</p>
                <p>{trn.category}</p>
                <p>${trn.amount}</p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transaction;
