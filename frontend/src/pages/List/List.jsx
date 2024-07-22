import './List.css'
import CardDisplay from '../../components/CardDisplay/CardDisplay'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContex'
import axios from 'axios'

const List = () => {
  const {url, token,setToken, setCardList} = useContext(StoreContext)
  const fetchCardList = async () => {
    const res= await axios.get(url+"/api/card/list",{
        headers: {
                'token': `${token}`,
                'Content-Type': 'application/json'
            }
    })
    setCardList(res.data.cards)
}


useEffect(()=>{
  async function loadData(){
        await fetchCardList()
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem('token'))
        }
        }
        loadData()
},[])

  return (
    <div className='list'>
      {/* <Sidebar/> */}
      <CardDisplay/>
    </div>
  )
}

export default List