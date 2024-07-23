import { createContext, useEffect, useState } from "react";
import { card_transactions } from "../assets/assets";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [ statementTotal, setStatementTotal] = useState(0)
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [card_list, setCardList] = useState([])
    const [amountToPay, setAmountToPay] = useState({
        amount : statementTotal
    })
    const [statementCardNumber,setStatementCardNumber] = useState([])



    const getStatementTotal = () => {
        for(let i = 0; i < card_transactions.length; i++){
            let trnAmount = Number(card_transactions[i].amount)
            setStatementTotal(prev => prev + trnAmount)
            console.log(statementTotal);
        }
    }

    // const fetchCardList = async () => {
    //     const res= await axios.get(url+"/api/card/list",{
    //         headers: {
    //                 'token': `${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //     })
    //     console.log(res.data);
    //     setCardList(res.data.data)
    // }
    // fetchCardList()
    
    useEffect(()=>{
        getStatementTotal()
       
        
        // async function loadData(){
        // await fetchCardList()
        // if(localStorage.getItem("token")){
        //     setToken(localStorage.getItem('token'))
        // }
        // }
        // loadData()
    },[])

    useEffect(()=>{
        console.log(statementCardNumber);
    },[statementCardNumber])

    useEffect(()=>{
        console.log(amountToPay.amount);
    },[amountToPay])





    const contextValue = {
        card_list,
        card_transactions,
        getStatementTotal,
        statementTotal,
        amountToPay,
        setAmountToPay,
        url,
        token,
        setToken,
        setCardList,
        statementCardNumber,
        setStatementCardNumber
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider