import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContex'
import { useContext } from 'react'

const Navbar = ({setShowLogin}) => {
  const{token, setToken} = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate('/')
  }
  return (
    <div className="navbar">
      <Link to='/'>
      <img src={assets.cred_logo} alt="logo" className='logo' />
      </Link>
      
      <div className='navbar-right'>
        {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button> : <div className='navbar-profile'>
          <img src={assets.profile_image} alt="" />
          <ul className="navbar-profile-dropdown">
            {/* <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /> <p>Orders</p></li> */}
            {/* <hr /> */}
            <li onClick={logout}><img src={assets.logout_icon} alt="" /> <p>Logout</p></li>
          </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar