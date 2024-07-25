import { useContext } from 'react'
import './MyPayments.css'
import { StoreContext } from '../../context/StoreContex'
import { useNavigate } from "react-router-dom";


const MyPayments = () => {
  const {transactionId, amountToPay, remainingAmount} = useContext(StoreContext)
  const navigate = useNavigate()
  return (
    <div className='my-payments'>
      <h2>Your Payment is successful</h2>
      <>
      <button>Transaction Id = <button>{transactionId}</button></button>
      <button>AMount Paid = <button>{amountToPay.amount}</button></button>
      <button>Remaining Amount = <button>{remainingAmount}</button></button>
      </>
      <div className='home-button'>
        <button onClick={()=>navigate("/")}>Go back to home</button>
      </div>
    </div>
  )
}

export default MyPayments