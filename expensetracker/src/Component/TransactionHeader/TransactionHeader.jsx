import React from 'react';
//styles
import "./TransactionHeader.css";
//components
import TransactionsBody from '../TransactionsBody/TransactionsBody';

const TransactionHeader = ({onTransactionModalShow, transactions ,onDeleteTransaction}) => {
    return (
        <div className='header'>
            <h2>Recent Transactions</h2>
            <TransactionsBody onTransactionModalShow={onTransactionModalShow} transactions={transactions} onDeleteTransaction={onDeleteTransaction}/>
        </div>
    );
};

export default TransactionHeader;