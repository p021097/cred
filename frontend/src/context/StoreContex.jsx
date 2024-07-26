import { createContext, useEffect, useState } from "react";
// import { card_transactions } from "../assets/assets";
import axios from 'axios'



export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [ statementTotal, setStatementTotal] = useState(0)
    const url = "https://cred-lxg5.onrender.com"
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [card_list, setCardList] = useState([])
    const [amountToPay, setAmountToPay] = useState({
        amount : 0
    })
    const [statementCardNumber,setStatementCardNumber] = useState([])
    const [card_transactions, setCardTransactions] = useState([]);
    const [ remainingAmount, setRemainingAmount] = useState(0)
    const [ transactionId, setTransactionId] = useState("")
    const [ card_id, setCard_id] = useState("")


// ******************fetch Cards list *******************************************************************************
// ******************************************************************************************************************

    const fetchCardList = async () => {
      const res= await axios.get(url+"/api/card/list",{
          headers: {
                  'token': `${token}`,
                  'Content-Type': 'application/json'
              }
      })
      setCardList(res.data.cards)
  }


// ***************get statement total ************************************************************************
// ***********************************************************************************************************
    const getStatementTotal = () => {
        let trnAmount = 0
        for(let i = 0; i < card_transactions.length; i++){
            trnAmount += Number(card_transactions[i].amount)
        }
       setStatementTotal(trnAmount)
       setRemainingAmount(trnAmount)
    }

// *************** fetch statement transactions ************************************************************
// *********************************************************************************************************
    const fetchTransactions = async () => {
        try {
          const response = await fetch(
            `${url}/api/statement/transactions?cardId=${statementCardNumber.cardId}`,
            {
              headers: {
                token: `${token}`,
              },
            }
          );
          const data = await response.json();
          if (data.success) {
            const flattenedTransactions = data.transactions.statementData.flat();
            setCardTransactions(flattenedTransactions);
          }
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };

// ************************ fetch remaining amount *****************************************************************
// *****************************************************************************************************************
      const fetchRemainingAmount = async () => {
        const body = {
          cardId : statementCardNumber.cardId
        }
        try {
          const response = await axios.get(`${url}/api/card/card`,body, {
            headers: {
              'token': `${token}`,
              'Content-Type': 'application/json'
          }
          });
          if (response.data.success) {
            console.log("StoreCOntext",response.data.card);
            setRemainingAmount(response.data.card.remainingAmount);
          }
        } catch (error) {
          console.error("Error fetching remaining amount:", error);
        }
      };

// ************************ All useEffects *****************************************************************************
// *********************************************************************************************************************

    // ------------------------For fetchCardList----------------------------------------------------------------------
      useEffect(()=>{
        async function loadData(){
              await fetchCardList()
              if(localStorage.getItem("token")){
                  setToken(localStorage.getItem('token'))
              }
              }
              loadData()
      },[url, token])


    // ----------------------- store token in localStorage ----------------------------------------------------------
      useEffect(() => {
        localStorage.setItem('token', token);
      }, [token]);

    // -------------------------- fetch remaining amount -------------------------------------------------------------
      useEffect(() => {
        if (statementCardNumber.cardId) {
          fetchTransactions();
          fetchRemainingAmount()
        }
      }, [statementCardNumber.cardId, url, token]);

    // --------------------------------- get statement total --------------------------------------------------------
    useEffect(()=>{
        getStatementTotal()
    },[card_transactions])

  
    const handlePayment = (amount) => {
        setRemainingAmount(remainingAmount - amount)
    }

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
        setStatementCardNumber,
        setCardTransactions,
        remainingAmount,
        handlePayment,
        setRemainingAmount,
        transactionId,
        setTransactionId,
        card_id,
        setCard_id,
        fetchCardList,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
