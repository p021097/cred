import { useContext} from 'react'
import './Statement.css'
import { StoreContext } from '../../context/StoreContex'
import { useNavigate } from 'react-router-dom'

const Statement = () => {

  const navigate = useNavigate()

const {card_transactions, statementTotal, amountToPay, setAmountToPay} = useContext(StoreContext)

if(amountToPay.amount > statementTotal){
  alert("please enter the amount less that statement Total")
  setAmountToPay({
    amount : 0
  })

}



const onChangeHandler = (event) => {
  const name = event.target.name
  const value = event.target.value
  setAmountToPay(data => ({...data, [name]:value}))
}



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
              <b>Total</b>
              <b>${statementTotal}</b>
            </div>
          </div>
          <div className='amount-to-pay'>
            <label > Amount to pay </label>
            <input onChange={onChangeHandler} placeholder='Enter the Amount to Pay' type="text" name="amount" value={amountToPay.amount} />
          </div>
          <div className='cart-total'>
            <p>Remaining Statement Amount ${statementTotal - amountToPay.amount}</p>
          </div>
          <button onClick={()=>navigate('/payment')}>Proceed to Checkout</button>
        </div>
      </div>

    </div>
  )
}

export default Statement