import { useContext } from 'react'
import './Payment.css'
import { StoreContext } from '../../context/StoreContex'

const Payment = () => {
const {amountToPay, statementTotal, token, url,card_transactions} = useContext(StoreContext)

const makePayment = async (event) => {
  event.preventDefault()
  let orderData = {
    amount : amountToPay,
  }
  let res = await axios.post(url)
}

  return (
    <form onSubmit={makePayment}>
         <div className="place-order-right">
          <div className="cart-total">
            <h2>Particulars</h2>
            <div>
              <div className="cart-total-details">
                <p>Statement Total</p>
                <p>${statementTotal}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Amount to Pay</p>
                <p>${amountToPay.amount}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Remaining Statement Amount</b>
                <b>
                  ${statementTotal - amountToPay.amount}
                </b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
    </form>
  )
}

export default Payment