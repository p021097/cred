import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContex'
import axios from 'axios'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const paymentId = searchParams.get("paymentId")
    const {url, token, setRemainingAmount, statementCardNumber, setTransactionId, card_id} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async () => {
        const res = await axios.post(url+"/api/payment/verify", {paymentId, success},{
          headers: {
            'token': `${token}`,
            'Content-Type': 'application/json'
        }
        })
        if (res.data.success) {
          setTransactionId(paymentId)
          console.log(statementCardNumber.cardId);
          console.log(card_id);
            const response = await axios.get(`${url}/api/card/card`, {card_id},{
              headers: {
                'token': `${token}`,
                'Content-Type': 'application/json'
            }
              });
              console.log(response.data);
              if (response.data.success) {
                console.log(res.data.card);
                setRemainingAmount(response.data.card.remainingAmount);
              }
            navigate("/mypayments")
 
        }else{
            navigate("/")
        }
    }


    useEffect(() => {
      if (token) {
        verifyPayment();
      } else {
        navigate("/");
      }
    }, [token]);

  return (
    <div className='verify'>
        <div className="spinner">
        </div>
       
       
    </div>
  )
}

export default Verify