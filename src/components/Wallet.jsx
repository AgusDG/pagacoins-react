import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../services/httpService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/global.css"
import "../styles/wallet.css"
import TransactionsTable from './TransactionsTable';

const Wallet = (props) => {

    const [user, setUser] = useState({})
    const [wallet, setWallet] = useState({})
    const [transactions, setTransactions] = useState([])
    const [destinationWallet, setDestinationWallet] = useState("")
    const [amountToTransfer, setAmountToTransfer] = useState(0)
    const [transactionDone, setTransactionDone] = useState(false)

    useEffect(()=> {
        const locationState = props.location.state;
        if(locationState){
            if(locationState.user){
                setUser(locationState.user)
            }
        }
        
        async function callGetWalletInfo(){
            await getWalletInfo();
        }
        callGetWalletInfo()

         async function callGetHistory(){
            await getHistory();
         }
         callGetHistory()

    }, [transactionDone])

    const getWalletInfo = async () => {
        try{
            const {data} = await http.get(`wallet/${props.match.params.id}`)
            if(data)
                setWallet(data)
        }catch(err){}
    }
    const getHistory = async () => {
        try{
            const {data} = await http.get(`/transaction/history/${props.location.state.wallet.id}`)
            console.log(data)
            if(data)
                setTransactions(data)
            else
                setTransactions([])
            
            
        }catch(err){ }
    }

    const handleTransfer = async () => {
        const transaction = {
            walletOrigin: wallet.id,
            walletDestiny: destinationWallet,
            amount: parseFloat(amountToTransfer)
        }

        try{
            const {data} = await http.post(`/transaction`, transaction)
           
            if(data){
                setTransactionDone(!transactionDone)
                console.log("Successs")
                toast.success("Transfer finished!")
            }
        }catch(error){
           toast.error("Error: "+error.response.data)
        }
    }

    const handleDestinationWalletChange = (e) => {
        setDestinationWallet(e.target.value)
    }

    const handleAmountToTransfer = (e) => {
        setAmountToTransfer(e.target.value)
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                        <button className="btn btn-md btn-light"><Link className="backButton" to={"/user/"+user.id}>← Back</Link></button>
                        <div className="card-body">
                            <h2>{wallet.alias} </h2>
                            <p><b>User name: </b>{user.name}</p>
                            <p><b>Wallet balance: </b>{wallet.balance}</p>
                            <p><b>Wallet id: </b>{wallet.id}</p>
                        </div>
                </div>
            </div>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        {transactions.length === 0 && <b>This wallet has no transactions.</b>}
                        { transactions.length > 0 &&  <TransactionsTable data={transactions}/> }
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Transfer coins</h5>
                        <input type="text" className="form-control inputWalletId" 
                                    placeholder="Destination wallet id..." value={destinationWallet} onChange={handleDestinationWalletChange}
                                        />
                        <input type="text" className="form-control inputTransferAmount" 
                                    placeholder="Amount to transfer..." value={amountToTransfer} onChange={handleAmountToTransfer}
                                        />
                        <button className="btn btn-md btn-dark transferButton" onClick={handleTransfer}>Transfer</button>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Wallet;