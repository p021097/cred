import { useContext } from 'react'
import './CardDisplay.css'
import { StoreContext } from '../../context/StoreContex'
import CardItem from '../CardItem/CardItem'

const CardDisplay = () => {
    const {card_list} = useContext(StoreContext)
  return (
    <div className='card-display' id='card-display'>
        <h2>Your Saved Cards Here</h2>
        <div className="card-display-list">
            {card_list.map((card, index)=>{
                return <CardItem key={index} id={card._id} cardNumber={card.cardNumber} expiryDate={card.expiryDate} nameOnTheCard={card.nameOnTheCard}/>
            })}
        </div>

    </div>
  )
}

export default CardDisplay