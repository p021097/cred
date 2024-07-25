import {  useContext, useState } from 'react'
import './Add.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContex'


const Add = () => {

    const {url, fetchCardList} = useContext(StoreContext)

    const formatExpiryDate = (value) => {
        value = value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length >= 3) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        return value;
      };

      const validateExpiryDate = (value) => {
        const parts = value.split('/');
        if (parts.length === 2) {
          const month = parseInt(parts[0], 10);
          if (month < 1 || month > 12) {
            return false;
          }
        }
        return true;
      };

    const [data, setData] = useState({
        cardNumber : "",
        expiryDate : "",
        nameOnTheCard: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        let value = event.target.value

        if(name == "cardNumber"){
            if(value.length > 16){
                alert("Card Value Should be 16 digits only")
                return
            }
        }

        if (name === 'expiryDate') {
            value = formatExpiryDate(value);
          }
    
        setData(data => ({...data, [name]:value}))
    }

    const onSubmitHandler = async(event)=>{
        event.preventDefault()
        if (!validateExpiryDate(data.expiryDate)) {
            alert('Please enter a valid Month Value Should be between = 1 - 12 only');
            return;
          }
        const formData = {
            cardNumber: data.cardNumber,
            expiryDate : data.expiryDate,
            nameOnTheCard : data.nameOnTheCard
        }
       
        const token = localStorage.getItem('token')

        try {
            const res = await axios.post(`${url}/api/card/add`, formData, {
                headers: {
                    'token': `${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(res.data.success){
                setData({
                    cardNumber : "",
                    expiryDate : "",
                    nameOnTheCard: ""
                })
                alert("Your card is saved Successfully")
                fetchCardList()
            }
        } catch (error) {
            console.log(error);
            alert('Please enter correct card details')
        }
    }

 

  return (
    <div className='main'>
    <form className="container" >
      <h1>Enter Your Card Details</h1>
      {/* <!-- Card --> */}
      <div className="card">
        {/* <!-- Card Number --> */}
        <label>Card Number</label>
        <input onChange={onChangeHandler}  value={data.cardNumber} className="card-number" placeholder="1234 1234 1234 1234" type="number" name='cardNumber' required maxLength="16" />
        
        <div className="container2">
          {/* <!-- Card Holder --> */}
          <div className="name">
            <label>Card Holder</label>
            <input onChange={onChangeHandler} value={data.nameOnTheCard} type="text" name='nameOnTheCard' className="card-name" placeholder="ISRAEL ISRAELI" required />
          </div>
          
          {/* <!-- Date --> */}
          <div className="expiration-date">
            <label>Exp. Date</label>
            <input onChange={onChangeHandler}  value={data.expiryDate} type="text" name='expiryDate' className="card-name" placeholder="10/25" maxLength="5" required />
          </div>
        <button onClick={onSubmitHandler} >Add Card</button>
        </div>
      </div>
    </form>
    </div>
    // <div className="add-container">
    //     {/* <Sidebar/> */}
    // <div className='add'>
    //     <h2>Enter Card Details</h2>
    //     <form className='flex-col' onSubmit={onSubmitHandler}>
    //         <div className="add-product-name flex-col">
    //             <p>Card Number</p>
    //             <input  onChange={onChangeHandler}  value={data.cardNumber} type="number" name='cardNumber' placeholder='Type Card Number' required/>
    //         </div>
    //         <div className="add-product-expiry-date flex-col">
    //             <p>Expiry Date</p>
    //             <input onChange={onChangeHandler}  value={data.expiryDate} type="text" name='expiryDate' placeholder='Expiry date' required/>
    //         </div>
    //         <div className="add-product-card-name flex-col">
    //             <p>Name on the Card</p>
    //             <input  onChange={onChangeHandler} value={data.nameOnTheCard} type="text" name='nameOnTheCard' placeholder='Enter name on the card'required/>
    //         </div>
    //         <button type='submit' className='add-btn' > Add Card</button>
    //     </form>
    // </div>
    // </div>
  )
}

export default Add