import React, {  useContext, useState } from 'react'
import './Add.css'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import { StoreContext } from '../../context/StoreContex'

const Add = () => {

    const {url} = useContext(StoreContext)

    // const url = 'http://localhost:4000'

    const [data, setData] = useState({
        cardNumber : "",
        expiryDate : "",
        nameOnCard: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data, [name]:value}))
    }


    const onSubmitHandler = async(event)=>{
        event.preventDefault()
        const formData = new FormData()
        formData.append("cardNumber", Number(data.cardNumber))
        formData.append("expiryDate", Date(data.expiryDate))
        formData.append("nameOnCard", data.nameOnCard)
        const response = await axios.post(`${url}/api/card/add`, formData)
        if(response.data.success){
            setData({
                cardNumber : "",
                expiryDate : "",
                nameOnCard: ""
            })
        }else{
            
        }
    }

 

  return (
    <div className="add-container">
        {/* <Sidebar/> */}
    <div className='add'>
        <h2>Enter Card Details</h2>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-product-name flex-col">
                <p>Card Number</p>
                <input  onChange={onChangeHandler}  value={data.cardNumber} type="number" name='cardNumber' placeholder='Type Card Number' required/>
            </div>
            <div className="add-product-expiry-date flex-col">
                <p>Expiry Date</p>
                <input onChange={onChangeHandler}  value={data.expiryDate} type="month" name='expiryDate' placeholder='Expiry date' required/>
            </div>
            <div className="add-product-card-name flex-col">
                <p>Name on the Card</p>
                <input  onChange={onChangeHandler} value={data.nameOnCard} type="text" name='nameOnCard' placeholder='Enter name on the card'required/>
            </div>
            <button type='submit' className='add-btn'> Add Card</button>
        </form>
    </div>
    </div>
  )
}

export default Add