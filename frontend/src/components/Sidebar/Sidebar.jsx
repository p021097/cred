import{ useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContex'

const Sidebar = () => {
    const {card_list = []} = useContext(StoreContext)

  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p >Add Card</p>
            </NavLink>
            {card_list.length >= 1 ? <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>View Cards</p>
            </NavLink> : <></> }
            
           {/* <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>View Cards</p>
            </NavLink> */}
            {/* <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink> */}
        </div>
    </div>
  )
}

export default Sidebar