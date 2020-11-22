import React, { useEffect, useState } from 'react';
import WalletsTable from './WalletsTable';
import Modal from 'react-bootstrap/Modal'
import http from '../services/httpService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/user.css"
import "../styles/global.css"
import { Link } from 'react-router-dom';

toast.configure();

const User = (props) => {

    const [wallets, setWallets] = useState([])
    const [user, setUser] = useState({});
    const [walletAdded, setWalletAdded] = useState(false);
    const [walletDeleted, setWalletDeleted] = useState(false);
    const [inputWalletName, setInputWalletName] = useState("")
    const [inputWalletBalance, setInputWalletBalance] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [walletToDelete, setWalletToDelete] = useState({});


    useEffect(async () => {
        const id = props.match.params.id

        let userProps = props.location.state;
        console.log("userprops", userProps)
        if(userProps && userProps.user)
            setUser(userProps.user)
        else{
            const {data: userDB} = await http.get(`/user/${id}`) 
            setUser(userDB)
        }

        const {data} = await http.get(`/wallet/user/${id}`)
        if(data)
            setWallets(data)
        else
            setWallets([])
    },[walletAdded, walletDeleted]);


    const handleCreateWallet = async () => {
        let wallet = {
            alias: inputWalletName,
            balance: inputWalletBalance,
            owner: user.id
        }
        const {data} = await http.post(`/wallet`, wallet)
        console.log(data)

        toast.success("Wallet created succesfully!")

        setInputWalletBalance(0);
        setInputWalletName("");
        setWalletAdded(!walletAdded)
    }

    const handleWalletNameChange = (e) => {
        setInputWalletName(e.target.value)
    }
    const handleBalanceChange = (e) => {
        setInputWalletBalance(e.target.value)
    }

    const calcTotalBalance = (wallets) => {
       let totalBalance = 0
       wallets.map(wallet => totalBalance+=wallet.balance)
       return totalBalance
    }

    const handleWalletDelete = (wallet) => {
        openModal()
        setWalletToDelete(wallet)
    }

    const deleteWallet = async () => {
        
        await http.delete("/wallet/"+walletToDelete.id)
       setWalletDeleted(!walletDeleted)
       setWalletToDelete({})
       closeModal()
       toast.success("Wallet deleted succesfully!")
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }


    return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <button className="btn btn-md btn-light"><Link className="backButton" to={"/users/"}>← Back</Link></button>
                        <div className="card-body">
                                <h1>User: {user.name}</h1>
                                <div className="totalwallets">Total Wallets: <span>{wallets.length}</span></div>
                                <div className="totalBalance">Total Balance: <span>{calcTotalBalance(wallets)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
          
            {
                wallets.length > 0 &&  <WalletsTable data={wallets} handleDelete={handleWalletDelete} user={user}/>
     
            }
            <div className="card">
                <div className="card-body">
                        {
                        wallets.length === 0 && 
                            <div>
                                <p><b>This user has no wallets</b></p>
                            </div>
                        }

            <div className="row">
                <div className="col-sm-7">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Add new wallet</h5>
                        <input className="form-control inputWalletName" type="text" placeholder="Wallet name...." value={inputWalletName} onChange={handleWalletNameChange}/>
                        <input className="form-control inputWalletBalance" type="text" placeholder="Balance..." value={inputWalletBalance} onChange={handleBalanceChange}/>
                        <button className="btn btn-sm btn-dark" value="Crear Wallet" onClick={() => handleCreateWallet()}> Create wallet </button>
                    </div>
                    </div>
                </div>
            </div>



                </div>
            </div>
            

           

            <Modal show={isModalOpen} animation={false}>
            <Modal.Header>Atención!</Modal.Header>
            <Modal.Body>
                <p>Estás seguro de que quieres eliminar este wallet?</p>
                <b>ID: </b><span>{walletToDelete.id}</span><br/>
                <b>Name: </b><span>{walletToDelete.alias}</span><br/>
                <b>Balance: </b><span>{walletToDelete.balance}</span><br/>
                <b>Owner: </b><span>{user.name}</span><br/>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary" onClick={deleteWallet}>Yes, delete</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
            </Modal.Footer>
            </Modal>

        </div>
    );
};

export default User;