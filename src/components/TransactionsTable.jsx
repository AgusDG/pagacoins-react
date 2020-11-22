import React from 'react';
import Table from "./common/Table"
import moment from 'moment';

const TransactionsTable = ({data}) => {
    
    var columns = [
        {label: 'Id', path: 'id'},
        {label: 'Origin', path: 'walletOrigin'},
        {label: 'Destiny', path: 'walletDestiny'},
        {label: 'Coins', path: 'amount'},
        {label: 'Date', path: 'date', content: (transaction) => (moment(transaction.date).format('DD/MM/YYYY hh:mm:ss'))},
    ]

    return (
        <div>
            <Table columns={columns}  data={data} />
        </div>
    );
};

export default TransactionsTable;