import React from 'react';
import Table from "./common/Table"
import { Link } from 'react-router-dom';

const WalletsTable = ({data, handleDelete, user}) => {
    
    var columns = [
        {label: 'Wallet id', path: 'id'},
        {label: 'Wallet name', path: 'alias'},
        {label: 'Balance', path: 'balance'},
        {label: '', path: '', content: (wallet) => 
                <div className="btn btn-sm btn-dark">
                    <Link className="text-link" to={{pathname: `/wallet/${wallet.id}`, state: {user, wallet}}}>View Wallet</Link>
                </div>
            , className: 'transactionColumn'},
        {label: '', path: '', content: (wallet) => 
                <div className="btn btn-sm btn-danger" onClick={() => handleDelete(wallet)}>Delete</div>, className: 'deleteColumn' } ,
    ]

    return (
        <div>
            <Table columns={columns}  data={data} />
        </div>
    );
};

export default WalletsTable;