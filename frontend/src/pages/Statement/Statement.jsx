import { useContext} from 'react'
import './Statement.css'
import { StoreContext } from '../../context/StoreContex'
import { useNavigate } from 'react-router-dom'


const Statement = () => {

  const navigate = useNavigate()

const {card_transactions, statementTotal,remainingAmount ,statementCardNumber} = useContext(StoreContext)



  return (
    <div className="cart">
            <h2>Credit Card Statement</h2>
            <h5>Card Number - {statementCardNumber.cardNumber}</h5>
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
            <div key={idx} >
              <div className="cart-items-title cart-items-item">
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
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Statement Totals</h2>
          <div>
            <div className="cart-total-details">
              <b>Total amount due = ${statementTotal}</b>
              {/* <span> ${statementTotal}</span> */}
            </div>
          </div>
          <div className='cart-total'>
           <p>Remaining Statement Amount =  ${remainingAmount}</p>
            
          </div>
          <button onClick={()=>navigate("/payment")}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Statement