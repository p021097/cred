import React from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContex'
import axios from 'axios'

const Login = ({setShowLogin}) => {
    const {url, setToken} = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data, [name]:value}))
    }


    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;

        if (currentState==="Login") {
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }   

        const res = await axios.post(newUrl, data)

        if (res.data.success) {
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
            setShowLogin(false)
        }else{
            alert(res.data.message)
        }

    }



  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            <button type='submit'>{currentState==='Sign Up'?"Create account":"Login"}</button>
            
            {currentState==="Login"
            ?<p>Create a new account ? <span onClick={()=> setCurrentState("Sign Up")}>Click here</span></p>
            :<p>Already have an account ? <span onClick={()=> setCurrentState("Login")}>Login here</span></p>}
            
            
        </form>
    </div>
  )
}

export default Login