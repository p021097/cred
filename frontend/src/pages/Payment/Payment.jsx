import { useContext } from 'react'
import './Payment.css'
import { StoreContext } from '../../context/StoreContex'
import axios from 'axios'

const Payment = () => {
const { setCard_id,statementTotal, amountToPay, setAmountToPay, token, url, statementCardNumber, remainingAmount, handlePayment, setRemainingAmount } = useContext(StoreContext)





const makePayment = async (event) => {
  event.preventDefault()
  if(amountToPay.amount > statementTotal){
    alert("please enter the amount less that statement Total")
    setAmountToPay({
      amount : 0
    })
    return
  }

  let orderData = {
    card : statementCardNumber,
    amount : Number(amountToPay.amount),
    quantity : 1
  }
  let res = await axios.post(url+"/api/payment/payment", orderData,{headers : {token}})


  if (res.data.success) {
    const {session_url} = res.data
    window.location.replace(session_url)
    handlePayment(amountToPay.amount)
        console.log("Payment.jsx", remainingAmount);
        await axios.post(
          `${url}/api/card/update-remaining-amount`,
          { cardId: statementCardNumber.cardId, remainingAmount: remainingAmount - amountToPay.amount },
          { headers: {
            'token': `${token}`,
            'Content-Type': 'application/json'
        }},
        setCard_id(statementCardNumber.cardId)
        );

  }else{
    alert("Error")
  }
}



const onChangeHandler = (event) => {
  const name = event.target.name
  const value = event.target.value
  setAmountToPay(data => ({...data, [name]:value}))
}


  return (
    <div className='payment'>
    <form onSubmit={makePayment}>
         <div className="cart-bottom">
        <div className="cart-total">
          <h2>Statement Totals</h2>
          <div className='cart-total-details'>
              <p>Total</p>
              <p>${statementTotal}</p>
          </div>
          <div className='amount-to-pay'>
            <label > Amount to pay </label>
            <input required onChange={onChangeHandler} placeholder='Enter the Amount to Pay' type="number" name="amount" value={amountToPay.amount} />
          </div>
          <div className='cart-total-remaining'>
            <p> Remaining Statement Amount <input type="text" placeholder={`$ ${statementTotal}`} disabled/></p>
          </div>
          <button type='submit' >Proceed to Checkout</button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default Payment